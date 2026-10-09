import { useMemo, useState } from "react";
import {
  BrButton,
  BrCard,
  BrCheckbox,
  BrInput,
  BrLoading,
  BrMessage,
  BrPagination,
  BrRadio,
  BrSelect,
  BrSelectOption,
  BrSwitch,
  BrTextarea,
} from "@govbr-ds/webcomponents-react";

type Aba = "componentes" | "formularios" | "dados" | "estados";
type TipoTag = "success" | "warning" | "danger" | "info" | "neutral";
type Pessoa = {
  id: number;
  nome: string;
  unidade: string;
  status: "Ativo" | "Pendente";
};

const pessoas: Pessoa[] = [
  { id: 1, nome: "Ana Souza", unidade: "Atendimento", status: "Ativo" },
  { id: 2, nome: "Bruno Lima", unidade: "Arrecadação", status: "Pendente" },
  { id: 3, nome: "Carla Nunes", unidade: "Fiscalização", status: "Ativo" },
  { id: 4, nome: "Diego Alves", unidade: "Tecnologia", status: "Ativo" },
  { id: 5, nome: "Elisa Ramos", unidade: "Gestão", status: "Pendente" },
  { id: 6, nome: "Fábio Rocha", unidade: "Cadastro", status: "Ativo" },
];

const coresTag: Record<
  TipoTag,
  { fundo: string; borda: string; texto: string; ponto: string }
> = {
  success: {
    fundo: "#e8f5e9",
    borda: "#70b17a",
    texto: "#0c5f22",
    ponto: "#168821",
  },
  warning: {
    fundo: "#fff4cc",
    borda: "#e5b300",
    texto: "#5c4300",
    ponto: "#c78b00",
  },
  danger: {
    fundo: "#fff1f0",
    borda: "#e52207",
    texto: "#8e1a0a",
    ponto: "#e52207",
  },
  info: {
    fundo: "#e7f0ff",
    borda: "#5992d9",
    texto: "#074b8a",
    ponto: "#1351b4",
  },
  neutral: {
    fundo: "#f1f1f1",
    borda: "#a3a3a3",
    texto: "#333333",
    ponto: "#666666",
  },
};

function StatusTag({
  texto,
  tipo = "neutral",
}: {
  texto: string;
  tipo?: TipoTag;
}) {
  const cor = coresTag[tipo];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 10px",
        border: `1px solid ${cor.borda}`,
        borderRadius: 999,
        backgroundColor: cor.fundo,
        color: cor.texto,
        fontSize: "0.78rem",
        fontWeight: 600,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: cor.ponto,
        }}
      ></span>
      {texto}
    </span>
  );
}

function Secao({
  id,
  titulo,
  descricao,
  children,
}: {
  id: string;
  titulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{ marginBottom: 48 }}
      aria-labelledby={`${id}-titulo`}
    >
      <div style={{ marginBottom: 18 }}>
        <h2 id={`${id}-titulo`} className="text-primary-default mb-1">
          {titulo}
        </h2>
        <p className="text-muted mb-0">{descricao}</p>
      </div>
      {children}
    </section>
  );
}

function Bloco({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <BrCard className="h-100">
      <div style={{ padding: 28 }}>
        <h3 className="text-up-01" style={{ marginBottom: 20 }}>
          {titulo}
        </h3>
        {children}
      </div>
    </BrCard>
  );
}

function ModalBase({
  titulo,
  onFechar,
  children,
  rodape,
}: {
  titulo: string;
  onFechar: () => void;
  children: React.ReactNode;
  rodape: React.ReactNode;
}) {
  const tituloId = `modal-${titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={tituloId}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(7, 29, 65, 0.66)",
        isolation: "isolate",
      }}
      onClick={onFechar}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(600px, 100%)",
          maxHeight: "calc(100vh - 40px)",
          overflowY: "auto",
          background: "#ffffff",
          color: "#1b1b1b",
          border: "1px solid #d9d9d9",
          borderRadius: 8,
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.4)",
          opacity: 1,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "18px 22px",
            background: "#ffffff",
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <h2
            id={tituloId}
            className="text-up-02"
            style={{ margin: 0, color: "#1b1b1b" }}
          >
            {titulo}
          </h2>
          <button
            type="button"
            aria-label="Fechar modal"
            onClick={onFechar}
            style={{
              width: 36,
              height: 36,
              border: 0,
              borderRadius: "50%",
              background: "transparent",
              color: "#1351b4",
              fontSize: "1.5rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: 24, background: "#ffffff" }}>{children}</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: 12,
            padding: "16px 22px",
            background: "#f8f8f8",
            borderTop: "1px solid #d9d9d9",
          }}
        >
          {rodape}
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const [aba, setAba] = useState<Aba>("componentes");
  const [contador, setContador] = useState(0);
  const [mensagemVisivel, setMensagemVisivel] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(
    null,
  );
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");
  const [unidade, setUnidade] = useState("Atendimento");
  const [perfil, setPerfil] = useState("servidor");
  const [aceite, setAceite] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [ordenacaoAsc, setOrdenacaoAsc] = useState(true);
  const [arquivo, setArquivo] = useState("");
  const [progresso, setProgresso] = useState(35);

  const nomeInvalido = enviado && !nome.trim();
  const emailInvalido = enviado && !/^\S+@\S+\.\S+$/.test(email);
  const aceiteInvalido = enviado && !aceite;

  const pessoasFiltradas = useMemo(() => {
    const termo = busca.toLocaleLowerCase("pt-BR");
    return pessoas
      .filter((pessoa) =>
        `${pessoa.nome} ${pessoa.unidade} ${pessoa.status}`
          .toLocaleLowerCase("pt-BR")
          .includes(termo),
      )
      .sort((a, b) =>
        ordenacaoAsc
          ? a.nome.localeCompare(b.nome, "pt-BR")
          : b.nome.localeCompare(a.nome, "pt-BR"),
      );
  }, [busca, ordenacaoAsc]);

  const simularOperacao = () => {
    setCarregando(true);
    window.setTimeout(() => {
      setCarregando(false);
      setMensagemVisivel(true);
      setContador((valor) => valor + 1);
    }, 1400);
  };

  const enviarFormulario = () => {
    setEnviado(true);
    if (nome.trim() && /^\S+@\S+\.\S+$/.test(email) && aceite) {
      setMensagemVisivel(true);
      document
        .getElementById("topo-showcase")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const abas: { id: Aba; texto: string }[] = [
    { id: "componentes", texto: "Componentes" },
    { id: "formularios", texto: "Formulários" },
    { id: "dados", texto: "Dados" },
    { id: "estados", texto: "Estados" },
  ];

  return (
    <div id="topo-showcase">
      <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div className="mr-4">
          <h1 className="text-primary-default mb-2">Showcase Frontend DSGov</h1>
          <p className="text-muted mb-0">
            Catálogo interativo de componentes, padrões e estados para
            interfaces do ContÁgil.
          </p>
        </div>
        <div className="d-flex flex-wrap mt-3 mt-md-0" style={{ gap: 8 }}>
          <StatusTag texto="React" tipo="info" />
          <StatusTag texto="TypeScript" tipo="info" />
          <StatusTag texto="DSGov" tipo="info" />
        </div>
      </div>

      {mensagemVisivel && (
        <div className="mb-4">
          <BrMessage
            messageTitle="Showcase carregado"
            message={`Os componentes estão funcionando. Operações concluídas: ${contador}.`}
            state="success"
            showIcon
          />
          <div className="text-right mt-2">
            <BrButton
              type="button"
              emphasis="tertiary"
              density="small"
              onClick={() => setMensagemVisivel(false)}
            >
              Ocultar mensagem
            </BrButton>
          </div>
        </div>
      )}

      <nav className="border-bottom mb-5" aria-label="Seções do showcase">
        <div className="d-flex flex-wrap" style={{ gap: 8 }}>
          {abas.map((item) => (
            <BrButton
              key={item.id}
              type="button"
              emphasis={aba === item.id ? "primary" : "tertiary"}
              ariaPressed={String(aba === item.id)}
              onClick={() => setAba(item.id)}
              className="mb-2"
            >
              {item.texto}
            </BrButton>
          ))}
        </div>
      </nav>

      {aba === "componentes" && (
        <>
          <Secao
            id="botoes"
            titulo="Botões e ações"
            descricao="Ênfases, estados e operação simulada."
          >
            <div className="row">
              <div className="col-lg-7 mb-4">
                <Bloco titulo="Variações">
                  <div
                    className="d-flex flex-wrap align-items-center"
                    style={{ gap: 12 }}
                  >
                    <BrButton
                      type="button"
                      emphasis="primary"
                      onClick={() => setContador((valor) => valor + 1)}
                    >
                      Ação principal
                    </BrButton>
                    <BrButton
                      type="button"
                      emphasis="secondary"
                      onClick={() => setContador(0)}
                    >
                      Ação secundária
                    </BrButton>
                    <BrButton
                      type="button"
                      emphasis="tertiary"
                      onClick={() => setContador((valor) => valor - 1)}
                    >
                      Ação terciária
                    </BrButton>
                    <BrButton type="button" emphasis="primary" disabled>
                      Desabilitado
                    </BrButton>
                    <BrButton
                      type="button"
                      emphasis="secondary"
                      shape="circle"
                      ariaLabel="Adicionar item"
                      title="Adicionar item"
                    >
                      <span aria-hidden="true" style={{ fontSize: "1.25rem" }}>
                        +
                      </span>
                    </BrButton>
                  </div>
                  <p className="mt-4 mb-0" aria-live="polite">
                    Contador de interação: <strong>{contador}</strong>
                  </p>
                </Bloco>
              </div>
              <div className="col-lg-5 mb-4">
                <Bloco titulo="Operação assíncrona">
                  {carregando ? (
                    <div
                      className="d-flex align-items-center py-3"
                      aria-live="polite"
                    >
                      <BrLoading label="Processando solicitação" />
                      <span className="ml-3">Processando solicitação...</span>
                    </div>
                  ) : (
                    <p>
                      Use este padrão para ações que aguardam processamento.
                    </p>
                  )}
                  <BrButton
                    type="button"
                    emphasis="primary"
                    onClick={simularOperacao}
                    disabled={carregando}
                  >
                    {carregando ? "Processando..." : "Simular operação"}
                  </BrButton>
                </Bloco>
              </div>
            </div>
          </Secao>

          <Secao
            id="cards"
            titulo="Cards e indicadores"
            descricao="Contêineres para conteúdo, métricas e ações relacionadas."
          >
            <div className="row">
              {[
                { rotulo: "Processos", valor: "24", cor: "#1351b4" },
                { rotulo: "Concluídos", valor: "18", cor: "#168821" },
                { rotulo: "Pendentes", valor: "6", cor: "#b35c00" },
              ].map((item) => (
                <div className="col-md-4 mb-4" key={item.rotulo}>
                  <BrCard interactive hover>
                    <div className="p-4">
                      <div className="text-muted">{item.rotulo}</div>
                      <div
                        className="text-up-03 text-bold"
                        style={{ color: item.cor }}
                      >
                        {item.valor}
                      </div>
                    </div>
                  </BrCard>
                </div>
              ))}
            </div>
            <BrCard>
              <div slot="header" className="p-3 border-bottom">
                <strong>Card com slots</strong>
              </div>
              <div slot="content" className="p-4">
                <p className="mb-0">
                  Conteúdo principal separado em cabeçalho, corpo e rodapé.
                </p>
              </div>
              <div slot="footer" className="p-3 border-top text-right">
                <BrButton
                  type="button"
                  emphasis="secondary"
                  onClick={() => setConfirmacaoAberta(true)}
                >
                  Abrir detalhes
                </BrButton>
              </div>
            </BrCard>
          </Secao>

          <Secao
            id="tags-progresso"
            titulo="Tags, progresso e feedback"
            descricao="Elementos compactos para status e acompanhamento."
          >
            <div className="row">
              <div className="col-lg-6 mb-4">
                <Bloco titulo="Tags de estado">
                  <div className="d-flex flex-wrap" style={{ gap: 10 }}>
                    <StatusTag texto="Ativo" tipo="success" />
                    <StatusTag texto="Em análise" tipo="info" />
                    <StatusTag texto="Pendente" tipo="warning" />
                    <StatusTag texto="Bloqueado" tipo="danger" />
                    <StatusTag texto="Arquivado" tipo="neutral" />
                  </div>
                </Bloco>
              </div>
              <div className="col-lg-6 mb-4">
                <Bloco titulo="Progresso">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Progresso da atividade</span>
                    <strong>{progresso}%</strong>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progresso}
                    aria-label={`Progresso da atividade: ${progresso}%`}
                    style={{
                      width: "100%",
                      height: 12,
                      overflow: "hidden",
                      backgroundColor: "#e5e5e5",
                      borderRadius: 6,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: `${progresso}%`,
                        height: "100%",
                        backgroundColor: "#1351b4",
                        borderRadius: 6,
                        transition: "width 200ms ease",
                      }}
                    ></div>
                  </div>
                  <div className="d-flex" style={{ gap: 8 }}>
                    <BrButton
                      type="button"
                      emphasis="secondary"
                      density="small"
                      onClick={() =>
                        setProgresso((valor) => Math.max(0, valor - 10))
                      }
                    >
                      -10%
                    </BrButton>
                    <BrButton
                      type="button"
                      emphasis="primary"
                      density="small"
                      onClick={() =>
                        setProgresso((valor) => Math.min(100, valor + 10))
                      }
                    >
                      +10%
                    </BrButton>
                  </div>
                </Bloco>
              </div>
            </div>
          </Secao>
        </>
      )}

      {aba === "formularios" && (
        <Secao
          id="formularios"
          titulo="Formulário completo"
          descricao="Campos, seleção, escolhas, validação, upload e envio."
        >
          <BrCard>
            <div className="p-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <BrInput
                    label="Nome completo"
                    name="nome"
                    placeholder="Digite o nome"
                    value={nome}
                    required
                    feedbackState={nomeInvalido ? "danger" : undefined}
                    helpText={
                      nomeInvalido
                        ? "Informe o nome completo."
                        : "Campo obrigatório."
                    }
                    onValueChange={(event) => setNome(event.detail)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <BrInput
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="nome@exemplo.gov.br"
                    value={email}
                    required
                    feedbackState={emailInvalido ? "danger" : undefined}
                    helpText={
                      emailInvalido
                        ? "Informe um e-mail válido."
                        : "Usado apenas nesta demonstração."
                    }
                    onValueChange={(event) => setEmail(event.detail)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <BrSelect
                    label="Unidade"
                    name="unidade"
                    value={unidade}
                    onValueChange={(event) => setUnidade(String(event.detail))}
                  >
                    <BrSelectOption value="Atendimento" label="Atendimento" />
                    <BrSelectOption value="Arrecadação" label="Arrecadação" />
                    <BrSelectOption value="Fiscalização" label="Fiscalização" />
                    <BrSelectOption value="Tecnologia" label="Tecnologia" />
                  </BrSelect>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="d-block text-bold mb-2">Perfil</label>
                  <div className="d-flex flex-wrap" style={{ gap: 20 }}>
                    <BrRadio
                      label="Servidor"
                      name="perfil"
                      value="servidor"
                      checked={perfil === "servidor"}
                      onCheckedChange={(event) =>
                        event.detail && setPerfil("servidor")
                      }
                    />
                    <BrRadio
                      label="Gestor"
                      name="perfil"
                      value="gestor"
                      checked={perfil === "gestor"}
                      onCheckedChange={(event) =>
                        event.detail && setPerfil("gestor")
                      }
                    />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <BrTextarea
                    label="Descrição"
                    name="descricao"
                    placeholder="Descreva a solicitação"
                    value={descricao}
                    rows={4}
                    maxlength={500}
                    showCounter
                    onValueChange={(event) => setDescricao(event.detail)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <BrCheckbox
                    label="Confirmo que revisei as informações"
                    name="aceite"
                    checked={aceite}
                    required
                    feedbackState={aceiteInvalido ? "invalid" : undefined}
                    onCheckedChange={(event) => setAceite(event.detail)}
                  />
                  {aceiteInvalido && (
                    <div className="small text-danger mt-1">
                      A confirmação é obrigatória.
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <BrSwitch
                    label="Receber notificações"
                    name="notificacoes"
                    checked={notificacoes}
                    labelOn="Ativado"
                    labelOff="Desativado"
                    onCheckedChange={(event) => setNotificacoes(event.detail)}
                  />
                </div>
                <div className="col-12 mb-4">
                  <label
                    className="text-bold d-block mb-2"
                    htmlFor="arquivo-showcase"
                  >
                    Anexo
                  </label>
                  <input
                    id="arquivo-showcase"
                    className="form-control"
                    type="file"
                    onChange={(event) =>
                      setArquivo(event.target.files?.[0]?.name || "")
                    }
                  />
                  {arquivo && (
                    <div className="small text-success mt-2">
                      Arquivo: {arquivo}
                    </div>
                  )}
                </div>
              </div>
              <div
                className="d-flex flex-wrap justify-content-end"
                style={{ gap: 12 }}
              >
                <BrButton
                  type="button"
                  emphasis="secondary"
                  onClick={() => {
                    setNome("");
                    setEmail("");
                    setDescricao("");
                    setAceite(false);
                    setEnviado(false);
                  }}
                >
                  Limpar
                </BrButton>
                <BrButton
                  type="button"
                  emphasis="primary"
                  onClick={enviarFormulario}
                >
                  Enviar formulário
                </BrButton>
              </div>
            </div>
          </BrCard>
        </Secao>
      )}

      {aba === "dados" && (
        <>
          <Secao
            id="tabela"
            titulo="Tabela, busca e paginação"
            descricao="Listagem filtrável, ordenação, visualização e navegação de páginas."
          >
            <BrCard>
              <div className="p-4">
                <div
                  className="d-flex flex-wrap justify-content-between align-items-end mb-3"
                  style={{ gap: 16 }}
                >
                  <div style={{ minWidth: 260, flex: "1 1 320px" }}>
                    <BrInput
                      label="Buscar"
                      name="busca"
                      placeholder="Nome, unidade ou status"
                      value={busca}
                      onValueChange={(event) => {
                        setBusca(event.detail);
                        setPagina(1);
                      }}
                    />
                  </div>
                  <BrButton
                    type="button"
                    emphasis="secondary"
                    onClick={() => setOrdenacaoAsc((valor) => !valor)}
                  >
                    {ordenacaoAsc ? "Ordem decrescente" : "Ordem crescente"}
                  </BrButton>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th>Nome</th>
                        <th>Unidade</th>
                        <th>Status</th>
                        <th className="text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pessoasFiltradas.map((pessoa) => (
                        <tr key={pessoa.id}>
                          <td className="font-weight-bold">{pessoa.nome}</td>
                          <td>{pessoa.unidade}</td>
                          <td>
                            <StatusTag
                              texto={pessoa.status}
                              tipo={
                                pessoa.status === "Ativo"
                                  ? "success"
                                  : "warning"
                              }
                            />
                          </td>
                          <td className="text-right">
                            <BrButton
                              type="button"
                              emphasis="tertiary"
                              density="small"
                              onClick={() => setPessoaSelecionada(pessoa)}
                            >
                              Visualizar
                            </BrButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!pessoasFiltradas.length && (
                  <div className="text-center border rounded bg-light p-5">
                    <h3>Nenhum resultado encontrado</h3>
                    <p className="text-muted">
                      Tente alterar ou limpar o termo de busca.
                    </p>
                    <BrButton
                      type="button"
                      emphasis="secondary"
                      onClick={() => setBusca("")}
                    >
                      Limpar busca
                    </BrButton>
                  </div>
                )}
                {!!pessoasFiltradas.length && (
                  <div className="mt-3">
                    <BrPagination
                      ariaLabel="Paginação da lista de pessoas"
                      currentPage={pagina}
                      totalPages={3}
                      totalItems={pessoasFiltradas.length * 3}
                      perPage={pessoasFiltradas.length}
                      onPageChange={(event) => setPagina(event.detail.page)}
                    />
                  </div>
                )}
              </div>
            </BrCard>
          </Secao>
          <Secao
            id="acordeao"
            titulo="Conteúdo expansível"
            descricao="Padrão simples para informações secundárias ou perguntas frequentes."
          >
            <div className="border rounded bg-white">
              {[
                "O que é o Starter Kit?",
                "Como reutilizar os componentes?",
                "Como validar acessibilidade?",
              ].map((pergunta, indice) => (
                <details key={pergunta} className={indice ? "border-top" : ""}>
                  <summary
                    className="p-3 text-bold"
                    style={{ cursor: "pointer" }}
                  >
                    {pergunta}
                  </summary>
                  <div className="px-3 pb-3 text-muted">
                    Conteúdo de demonstração da seção expansível.
                  </div>
                </details>
              ))}
            </div>
          </Secao>
        </>
      )}

      {aba === "estados" && (
        <Secao
          id="estados"
          titulo="Estados da aplicação"
          descricao="Mensagens oficiais, estado vazio e confirmação."
        >
          <div className="row">
            <div className="col-md-6 mb-4">
              <BrMessage
                messageTitle="Sucesso"
                message="A operação foi concluída."
                state="success"
                showIcon
              />
            </div>
            <div className="col-md-6 mb-4">
              <BrMessage
                messageTitle="Atenção"
                message="Revise as informações antes de continuar."
                state="warning"
                showIcon
              />
            </div>
            <div className="col-md-6 mb-4">
              <BrMessage
                messageTitle="Erro"
                message="Não foi possível concluir a operação."
                state="danger"
                showIcon
              />
            </div>
            <div className="col-md-6 mb-4">
              <BrMessage
                messageTitle="Informação"
                message="Há uma atualização disponível."
                state="info"
                showIcon
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <Bloco titulo="Estado vazio">
                <div className="text-center py-4">
                  <div
                    aria-hidden="true"
                    style={{
                      width: 48,
                      height: 48,
                      margin: "0 auto 18px",
                      border: "3px solid #1351b4",
                      borderRadius: 8,
                    }}
                  ></div>
                  <h3>Nenhum item disponível</h3>
                  <p className="text-muted">
                    Crie o primeiro item para começar.
                  </p>
                  <BrButton type="button" emphasis="primary">
                    Criar item
                  </BrButton>
                </div>
              </Bloco>
            </div>
            <div className="col-lg-6 mb-4">
              <Bloco titulo="Confirmação">
                <p>
                  Use uma confirmação antes de uma ação irreversível ou de
                  grande impacto.
                </p>
                <BrButton
                  type="button"
                  emphasis="primary"
                  onClick={() => setConfirmacaoAberta(true)}
                >
                  Abrir confirmação
                </BrButton>
              </Bloco>
            </div>
          </div>
        </Secao>
      )}

      {pessoaSelecionada && (
        <ModalBase
          titulo="Detalhes do registro"
          onFechar={() => setPessoaSelecionada(null)}
          rodape={
            <BrButton
              type="button"
              emphasis="primary"
              onClick={() => setPessoaSelecionada(null)}
            >
              Fechar
            </BrButton>
          }
        >
          <div style={{ display: "grid", gap: 18 }}>
            <div>
              <div className="small text-muted" style={{ marginBottom: 4 }}>
                Nome
              </div>
              <div className="text-bold">{pessoaSelecionada.nome}</div>
            </div>
            <div>
              <div className="small text-muted" style={{ marginBottom: 4 }}>
                Unidade
              </div>
              <div>{pessoaSelecionada.unidade}</div>
            </div>
            <div>
              <div className="small text-muted" style={{ marginBottom: 8 }}>
                Status
              </div>
              <StatusTag
                texto={pessoaSelecionada.status}
                tipo={
                  pessoaSelecionada.status === "Ativo" ? "success" : "warning"
                }
              />
            </div>
          </div>
        </ModalBase>
      )}

      {confirmacaoAberta && (
        <ModalBase
          titulo="Confirmar ação"
          onFechar={() => setConfirmacaoAberta(false)}
          rodape={
            <>
              <BrButton
                type="button"
                emphasis="secondary"
                onClick={() => setConfirmacaoAberta(false)}
              >
                Cancelar
              </BrButton>
              <BrButton
                type="button"
                emphasis="primary"
                onClick={() => {
                  setConfirmacaoAberta(false);
                  setMensagemVisivel(true);
                  setContador((valor) => valor + 1);
                }}
              >
                Confirmar
              </BrButton>
            </>
          }
        >
          <p className="mb-0">
            Confirme somente depois de revisar as informações. Esta janela é
            separada da visualização de registros.
          </p>
        </ModalBase>
      )}
    </div>
  );
}
