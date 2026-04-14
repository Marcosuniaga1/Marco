/**
 * new-package.ts
 *
 * Scaffolds a new @remotion/* package with all required files.
 *
 * Usage:
 *   bun new-package.ts <package-name> [--description "..."] [--react] [--dry-run]
 *
 * Examples:
 *   bun new-package.ts gradients --description "CSS gradient utilities for Remotion"
 *   bun new-package.ts my-effect --description "Custom visual effect" --react
 *   bun new-package.ts gradients --dry-run
 *
 * Flags:
 *   --description  Human-readable description (required for publishing)
 *   --react        Include React/react-dom devDependencies and JSX support
 *   --dry-run      Print what would be created without writing any files
 */

import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'fs';
import path from 'path';

// ─── Parse args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith('--')) {
	console.error('Usage: bun new-package.ts <package-name> [--description "..."] [--react] [--dry-run]');
	process.exit(1);
}

const pkgSlug = args[0].toLowerCase().replace(/[^a-z0-9-]/g, '-');
const descIdx = args.indexOf('--description');
const description = descIdx !== -1 ? args[descIdx + 1] : '';
const withReact = args.includes('--react');
const dryRun = args.includes('--dry-run');

if (!pkgSlug.match(/^[a-z][a-z0-9-]*$/)) {
	console.error(`Invalid package name: "${pkgSlug}". Use lowercase letters, numbers, and hyphens only.`);
	process.exit(1);
}

// ─── Detect current version ───────────────────────────────────────────────────

const PACKAGES_DIR = path.join(import.meta.dir, 'packages');

function detectVersion(): string {
	const counts: Record<string, number> = {};
	for (const entry of readdirSync(PACKAGES_DIR, {withFileTypes: true})) {
		if (!entry.isDirectory()) continue;
		const p = path.join(PACKAGES_DIR, entry.name, 'package.json');
		if (!existsSync(p)) continue;
		try {
			const pkg = JSON.parse(readFileSync(p, 'utf-8'));
			if (!pkg.private && pkg.version) counts[pkg.version] = (counts[pkg.version] ?? 0) + 1;
		} catch {}
	}
	return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '4.0.0';
}

const version = detectVersion();
const pkgDir = path.join(PACKAGES_DIR, pkgSlug);

// ─── Guard: already exists ─────────────────────────────────────────────────────

if (existsSync(pkgDir)) {
	console.error(`Package already exists: packages/${pkgSlug}`);
	process.exit(1);
}

// ─── File templates ───────────────────────────────────────────────────────────

const externalDeps = withReact
	? ['remotion', 'remotion/no-react', 'react', 'react-dom']
	: ['remotion', 'remotion/no-react'];

const files: Record<string, string> = {
	'package.json': JSON.stringify(
		{
			repository: {
				url: `https://github.com/remotion-dev/remotion/tree/main/packages/${pkgSlug}`,
			},
			name: `@remotion/${pkgSlug}`,
			version,
			description,
			main: 'dist/cjs/index.js',
			types: 'dist/cjs/index.d.ts',
			module: 'dist/esm/index.mjs',
			sideEffects: false,
			scripts: {
				formatting: 'oxfmt src --check',
				format: 'oxfmt src',
				lint: 'eslint src',
				make: 'tsgo -d && bun --env-file=../.env.bundle bundle.ts',
				test: 'bun test src',
			},
			exports: {
				'./package.json': './package.json',
				'.': {
					types: './dist/cjs/index.d.ts',
					module: './dist/esm/index.mjs',
					import: './dist/esm/index.mjs',
					require: './dist/cjs/index.js',
				},
			},
			author: 'Jonny Burger <jonny@remotion.dev>',
			license: 'MIT',
			bugs: {url: 'https://github.com/remotion-dev/remotion/issues'},
			dependencies: {
				remotion: 'workspace:*',
			},
			devDependencies: {
				...(withReact
					? {
							'@testing-library/react': '16.1.0',
							'@happy-dom/global-registrator': '14.5.1',
							react: 'catalog:',
							'react-dom': 'catalog:',
						}
					: {}),
				'@remotion/eslint-config-internal': 'workspace:*',
				eslint: 'catalog:',
				'@typescript/native-preview': 'catalog:',
			},
			keywords: ['remotion', pkgSlug],
			publishConfig: {access: 'public'},
			homepage: `https://www.remotion.dev/docs/${pkgSlug}`,
		},
		null,
		'\t',
	),

	'tsconfig.json': JSON.stringify(
		{
			extends: '../tsconfig.settings.json',
			compilerOptions: {
				rootDir: 'src',
				outDir: 'dist/cjs',
				skipLibCheck: true,
			},
			include: ['src'],
			references: [{path: '../core'}],
		},
		null,
		'\t',
	),

	'bundle.ts': [
		"import {build} from 'bun';",
		'',
		"if (process.env.NODE_ENV !== 'production') {",
		"\tthrow new Error('This script must be run using NODE_ENV=production');",
		'}',
		'',
		'const output = await build({',
		"\tentrypoints: ['src/index.ts'],",
		"\tnaming: '[name].mjs',",
		`\texternal: ${JSON.stringify(externalDeps)},`,
		'});',
		'',
		'const [file] = output.outputs;',
		'const text = await file.text();',
		'',
		"await Bun.write('dist/esm/index.mjs', text);",
		'',
		'export {};',
	].join('\n'),

	'eslint.config.mjs': [
		"import {remotionFlatConfig} from '@remotion/eslint-config-internal';",
		'',
		`const config = remotionFlatConfig({react: ${withReact}});`,
		'',
		'export default {',
		'\t...config,',
		'};',
	].join('\n'),

	...(withReact
		? {
				'bunfig.toml': ['[test]', 'preload = "./happydom.ts"'].join('\n'),
				'happydom.ts': [
					"import {GlobalRegistrator} from '@happy-dom/global-registrator';",
					'',
					'GlobalRegistrator.register();',
				].join('\n'),
			}
		: {}),

	'src/index.ts': [
		`// @remotion/${pkgSlug}`,
		'// Add your exports here',
		'',
		`export const hello = (): string => 'Hello from @remotion/${pkgSlug}';`,
	].join('\n'),
};

// ─── Output ───────────────────────────────────────────────────────────────────

const prefix = dryRun ? '[DRY RUN] ' : '';

console.log('');
console.log(`${prefix}Creating @remotion/${pkgSlug}  (v${version})`);
console.log('');

const allPaths = [
	`packages/${pkgSlug}/`,
	`packages/${pkgSlug}/src/`,
	...Object.keys(files).map((f) => `packages/${pkgSlug}/${f}`),
];

for (const p of allPaths) {
	console.log(`  ${p.endsWith('/') ? '📁' : '📄'} ${p}`);
}

if (dryRun) {
	console.log('\nDry run complete. No files were written.\n');
	process.exit(0);
}

// ─── Write files ──────────────────────────────────────────────────────────────

mkdirSync(path.join(pkgDir, 'src'), {recursive: true});

for (const [filename, content] of Object.entries(files)) {
	writeFileSync(path.join(pkgDir, filename), content + '\n', 'utf-8');
}

console.log('');
console.log('Done! Next steps:');
console.log(`  1. cd packages/${pkgSlug}`);
console.log('  2. Add your code to src/index.ts');
console.log('  3. bun run make   (build)');
console.log('  4. bun run test   (test)');
console.log(`  5. bun audit-packages.ts  (verify everything looks good)\n`);
