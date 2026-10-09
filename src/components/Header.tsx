interface HeaderProps {
  titulo: string;
  subtitulo?: string;
  usuario?: string;
  nomePlataforma?: string;
  logoSrc?: string;
}

export function Header({
  titulo,
  subtitulo,
  usuario,
  nomePlataforma = "CONTÁGIL",
  logoSrc = "https://barra.sistema.gov.br/v1/assets/govbr.webp",
}: HeaderProps) {
  return (
    <header
      id="header"
      className="br-header"
      style={{
        padding: 0,
        margin: 0,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="container-lg py-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <img
              src={logoSrc}
              alt="Gov.br"
              style={{ width: 92, height: "auto", flexShrink: 0 }}
            />

            <span
              className="br-divider vertical mx-3"
              style={{ minHeight: 38 }}
              aria-hidden="true"
            ></span>

            <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
              <div className="mr-4 d-none d-md-block">
                <div
                  className="text-bold text-primary-default"
                  style={{ fontSize: "0.85rem", lineHeight: 1.1 }}
                >
                  {nomePlataforma}
                </div>
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  className="text-bold text-truncate"
                  style={{ fontSize: "1.05rem", lineHeight: 1.2 }}
                  title={titulo}
                >
                  {titulo}
                </div>

                {subtitulo && (
                  <div
                    className="text-muted text-truncate"
                    style={{ fontSize: "0.75rem", lineHeight: 1.2 }}
                    title={subtitulo}
                  >
                    {subtitulo}
                  </div>
                )}
              </div>
            </div>
          </div>

          {usuario && (
            <div
              className="d-flex align-items-center ml-3"
              aria-label={`Usuário autenticado: ${usuario}`}
              title={`Usuário autenticado: ${usuario}`}
              style={{ flexShrink: 0 }}
            >
              <i
                className="fas fa-user-circle text-primary-default mr-2"
                aria-hidden="true"
                style={{ fontSize: "1.25rem" }}
              ></i>

              <div
                className="d-none d-sm-flex flex-column"
                style={{ minWidth: 0 }}
              >
                <span
                  className="text-muted"
                  style={{ fontSize: "0.68rem", lineHeight: 1.1 }}
                >
                  Usuário autenticado
                </span>
                <span
                  className="text-bold text-primary-default text-truncate"
                  style={{ fontSize: "0.8rem", maxWidth: 220 }}
                >
                  {usuario}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
