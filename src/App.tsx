import { Layout } from "./components/Layout";
import { Showcase } from "./Showcase";

function App() {
  return (
    <Layout
      titulo="Starter Kit React ContÁgil"
      subtitulo="Showcase de componentes DSGov"
      usuario="Usuário de demonstração"
      versao="0.1.0"
      ambiente="DESENVOLVIMENTO"
    >
      <Showcase />
    </Layout>
  );
}

export default App;
