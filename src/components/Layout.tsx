import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer, type AmbienteAplicacao } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  titulo?: string;
  subtitulo?: string;
  usuario?: string;
  versao?: string;
  ambiente?: AmbienteAplicacao;
  orgao?: string;
  nomePlataforma?: string;
  logoSrc?: string;
}

export function Layout({
  children,
  titulo = "Sistema ContÁgil",
  subtitulo = "Receita Federal do Brasil",
  usuario,
  versao,
  ambiente = "DESENVOLVIMENTO",
  orgao = "Receita Federal do Brasil",
  nomePlataforma = "CONTÁGIL",
  logoSrc,
}: LayoutProps) {
  return (
    <div
      className="template-base"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header
        titulo={titulo}
        subtitulo={subtitulo}
        usuario={usuario}
        nomePlataforma={nomePlataforma}
        logoSrc={logoSrc}
      />

      <main id="main" className="d-flex flex-fill" style={{ flex: 1 }}>
        <div className="container-lg pt-3 pb-5 w-100">{children}</div>
      </main>

      <Footer
        nomeSistema={titulo}
        versao={versao}
        ambiente={ambiente}
        orgao={orgao}
        nomePlataforma={nomePlataforma}
        logoSrc={logoSrc}
      />
    </div>
  );
}
