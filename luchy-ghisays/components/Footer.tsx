import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="logo">{site.brand}</div>
      <div className="links">
        <Link href="/privacidad">Política de privacidad</Link>
        <span style={{ color: "#33485d" }}>|</span>
        <Link href="/terminos">Términos</Link>
      </div>
      <div className="disclaimer">
        Este sitio no es parte de Facebook ni de Meta Platforms, Inc., ni está
        patrocinado, avalado o administrado por ellos. Facebook™ e Instagram™ son
        marcas registradas de Meta Platforms, Inc.
      </div>
      <div className="copy">
        © {new Date().getFullYear()} Luchy Ghisays. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
