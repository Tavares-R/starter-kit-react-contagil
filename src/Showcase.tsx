import { useState } from "react";
import { BrButton, BrCard } from "@govbr-ds/webcomponents-react";

export function Showcase() {
  const [contador, setContador] = useState(0);

  return (
    <main className="container-lg py-5">
      <h1>Showcase GovBR-DS</h1>

      <p>
        Exemplos validados da integração entre React, TypeScript e os Web
        Components do GovBR-DS.
      </p>

      <BrCard customId="showcase-button-card" className="mt-5">
        <h2>Button</h2>

        <p>
          Variações básicas do componente BrButton fornecido pelo wrapper
          oficial para React.
        </p>

        <div className="d-flex flex-wrap align-items-center mt-4">
          <BrButton
            type="button"
            emphasis="primary"
            className="mr-3 mb-3"
            onClick={() => setContador((valorAtual) => valorAtual + 1)}
          >
            Incrementar
          </BrButton>

          <BrButton
            type="button"
            emphasis="secondary"
            className="mr-3 mb-3"
            onClick={() => setContador(0)}
          >
            Zerar contador
          </BrButton>

          <BrButton
            type="button"
            emphasis="tertiary"
            className="mr-3 mb-3"
            onClick={() => setContador((valorAtual) => valorAtual - 1)}
          >
            Decrementar
          </BrButton>

          <BrButton type="button" emphasis="primary" className="mb-3" disabled>
            Botão desabilitado
          </BrButton>
        </div>

        <p aria-live="polite">
          Valor atual do contador: <strong>{contador}</strong>
        </p>
      </BrCard>

      <BrCard customId="showcase-card-slots" className="mt-5">
        <div slot="header">
          <h2>Card com slots</h2>
        </div>

        <div slot="content">
          <p>
            Conteúdo principal projetado no slot content do componente BrCard.
          </p>
        </div>

        <div slot="footer">
          <BrButton
            type="button"
            emphasis="secondary"
            onClick={() => setContador((valorAtual) => valorAtual + 1)}
          >
            Ação do rodapé
          </BrButton>
        </div>
      </BrCard>
    </main>
  );
}
