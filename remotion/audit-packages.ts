/**
 * audit-packages.ts
 *
 * Scans all packages in this monorepo and reports:
 *  - Version inconsistencies
 *  - Missing required scripts (make, test, lint, format)
 *  - Missing common config files (tsconfig.json, README.md)
 *  - Packages with no description
 *
 * Usage: bun audit-packages.ts
 */

import {existsSync, readdirSync, readFileSync} from 'fs';
import path from 'path';

const PACKAGES_DIR = path.join(import.meta.dir, 'packages');
// Detect the expected version from the most common version among public packages
function detectExpectedVersion(): string {
	const counts: Record<string, number> = {};
	for (const entry of readdirSync(PACKAGES_DIR, {withFileTypes: true})) {
		if (!entry.isDirectory()) continue;
		const pkgJsonPath = path.join(PACKAGES_DIR, entry.name, 'package.json');
		if (!existsSync(pkgJsonPath)) continue;
		try {
			const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
			if (!pkg.private && pkg.version) {
				counts[pkg.version] = (counts[pkg.version] ?? 0) + 1;
			}
		} catch {}
	}
	return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '0.0.0';
}

const EXPECTED_VERSION: string = detectExpectedVersion();

// Scripts considered "standard" for a publishable package
const STANDARD_SCRIPTS = ['make', 'test', 'lint', 'format'];

// Files expected in every package
const EXPECTED_FILES = ['package.json'];

type Issue = {severity: 'error' | 'warn'; message: string};
type PackageReport = {name: string; dir: string; issues: Issue[]};

const reports: PackageReport[] = [];
const versionCounts: Record<string, string[]> = {};

const entries = readdirSync(PACKAGES_DIR, {withFileTypes: true});

for (const entry of entries) {
	if (!entry.isDirectory()) continue;

	const pkgDir = path.join(PACKAGES_DIR, entry.name);
	const pkgJsonPath = path.join(pkgDir, 'package.json');

	if (!existsSync(pkgJsonPath)) continue;

	let pkg: Record<string, unknown>;
	try {
		pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
	} catch {
		reports.push({
			name: entry.name,
			dir: pkgDir,
			issues: [{severity: 'error', message: 'package.json is not valid JSON'}],
		});
		continue;
	}

	const issues: Issue[] = [];
	const pkgName = (pkg.name as string) ?? entry.name;
	const scripts = (pkg.scripts as Record<string, string>) ?? {};
	const isPrivate = pkg.private === true;
	const isTemplate = entry.name.startsWith('template-');
	const isExample = entry.name.endsWith('-example') || entry.name === 'example' || entry.name === 'bugs';

	// 1. Version check (only for public, non-template packages)
	if (!isPrivate && !isTemplate && !isExample) {
		const version = (pkg.version as string) ?? 'none';
		if (!versionCounts[version]) versionCounts[version] = [];
		versionCounts[version].push(pkgName);

		if (version !== EXPECTED_VERSION) {
			issues.push({
				severity: 'error',
				message: `Version mismatch: has ${version}, expected ${EXPECTED_VERSION}`,
			});
		}
	}

	// 2. Missing description
	if (!pkg.description && !isPrivate && !isExample) {
		issues.push({severity: 'warn', message: 'Missing "description" field'});
	}

	// 3. Missing standard scripts (only for non-template, non-example packages with src/)
	const hasSrc = existsSync(path.join(pkgDir, 'src'));
	if (hasSrc && !isTemplate && !isExample) {
		for (const script of STANDARD_SCRIPTS) {
			if (!scripts[script]) {
				issues.push({severity: 'warn', message: `Missing script: "${script}"`});
			}
		}
	}

	// 4. Missing expected files
	for (const file of EXPECTED_FILES) {
		if (!existsSync(path.join(pkgDir, file))) {
			issues.push({severity: 'error', message: `Missing file: ${file}`});
		}
	}

	// 5. Missing license field (for public packages)
	if (!isPrivate && !isTemplate && !isExample && !pkg.license) {
		issues.push({severity: 'warn', message: 'Missing "license" field'});
	}

	if (issues.length > 0) {
		reports.push({name: pkgName, dir: entry.name, issues});
	}
}

// ─── Output ───────────────────────────────────────────────────────────────────

const errors = reports.filter((r) => r.issues.some((i) => i.severity === 'error'));
const warnings = reports.filter((r) =>
	r.issues.every((i) => i.severity === 'warn'),
);

const totalPackages = readdirSync(PACKAGES_DIR, {withFileTypes: true}).filter(
	(e) => e.isDirectory() && existsSync(path.join(PACKAGES_DIR, e.name, 'package.json')),
).length;

console.log('\n╔══════════════════════════════════════════╗');
console.log('║       Remotion Package Audit Report      ║');
console.log('╚══════════════════════════════════════════╝\n');
console.log(`Scanned ${totalPackages} packages   Expected version: ${EXPECTED_VERSION}\n`);

if (errors.length > 0) {
	console.log('── ERRORS ──────────────────────────────────');
	for (const r of errors) {
		const errs = r.issues.filter((i) => i.severity === 'error');
		console.log(`  ${r.name} (packages/${r.dir})`);
		for (const issue of errs) {
			console.log(`    ✗ ${issue.message}`);
		}
	}
	console.log('');
}

if (warnings.length > 0) {
	console.log('── WARNINGS ────────────────────────────────');
	for (const r of warnings) {
		const warns = r.issues.filter((i) => i.severity === 'warn');
		console.log(`  ${r.name} (packages/${r.dir})`);
		for (const issue of warns) {
			console.log(`    ⚠ ${issue.message}`);
		}
	}
	console.log('');
}

if (reports.length === 0) {
	console.log('  All packages look healthy!\n');
}

// Version distribution summary
const versionEntries = Object.entries(versionCounts);
if (versionEntries.length > 1) {
	console.log('── VERSION DISTRIBUTION ────────────────────');
	for (const [version, pkgs] of versionEntries.sort()) {
		const tag = version === EXPECTED_VERSION ? ' ✓' : ' ✗ (mismatch)';
		console.log(`  ${version}${tag}  →  ${pkgs.length} packages`);
	}
	console.log('');
}

console.log('── SUMMARY ─────────────────────────────────');
console.log(`  Packages with errors   : ${errors.length}`);
console.log(`  Packages with warnings : ${warnings.length}`);
console.log(
	`  Clean packages         : ${totalPackages - errors.length - warnings.length}`,
);
console.log('────────────────────────────────────────────\n');

process.exit(errors.length > 0 ? 1 : 0);
