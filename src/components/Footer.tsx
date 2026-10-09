export type AmbienteAplicacao = "DESENVOLVIMENTO" | "HOMOLOGAÇÃO" | "PRODUÇÃO";

interface FooterProps {
  nomeSistema: string;
  versao?: string;
  ambiente?: AmbienteAplicacao;
  orgao?: string;
  nomePlataforma?: string;
  logoSrc?: string;
}

const estilosAmbiente: Record<
  AmbienteAplicacao,
  { backgroundColor: string; color: string }
> = {
  DESENVOLVIMENTO: {
    backgroundColor: "#dbeafe",
    color: "#071d41",
  },
  HOMOLOGAÇÃO: {
    backgroundColor: "#fff3cd",
    color: "#5c4300",
  },
  PRODUÇÃO: {
    backgroundColor: "#ffffff",
    color: "#071d41",
  },
};

export function Footer({
  nomeSistema,
  versao,
  ambiente = "DESENVOLVIMENTO",
  orgao = "Receita Federal do Brasil",
  nomePlataforma = "CONTÁGIL",
  logoSrc = "https://barra.sistema.gov.br/v1/assets/govbr.webp",
}: FooterProps) {
  const estiloAmbiente = estilosAmbiente[ambiente];

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "#071d41",
        color: "#ffffff",
        marginTop: "auto",
        padding: 0,
      }}
    >
      <div className="container-lg py-2">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center mr-4">
            <img
              src={logoSrc}
              alt="Gov.br"
              style={{
                height: 28,
                width: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />

            <span
              className="br-divider vertical mx-3"
              style={{
                borderColor: "rgba(255, 255, 255, 0.35)",
                minHeight: 32,
              }}
              aria-hidden="true"
            ></span>

            <div>
              <div className="text-bold text-white" style={{ lineHeight: 1.2 }}>
                {nomePlataforma}
              </div>
              <div
                className="text-white"
                style={{ fontSize: "0.75rem", opacity: 0.75, lineHeight: 1.2 }}
              >
                {nomeSistema}
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center mt-2 mt-md-0">
            <div
              className="text-white mr-4"
              style={{ fontSize: "0.8rem", opacity: 0.85 }}
            >
              {orgao}
            </div>

            {versao && (
              <div className="text-white mr-3" style={{ fontSize: "0.8rem" }}>
                Versão {versao}
              </div>
            )}

            <span
              className="d-inline-block rounded px-2 py-1 text-bold"
              style={{
                ...estiloAmbiente,
                fontSize: "0.65rem",
                lineHeight: 1,
              }}
            >
              {ambiente}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
