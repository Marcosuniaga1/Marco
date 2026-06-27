import { site } from "@/lib/site";

export default function Header() {
  return (
    <header>
      <div className="logo">{site.brand}</div>
    </header>
  );
}
