import "@/globalStyle.css";
import "./styles.css";
import "./atualizandoHrefs";
import { Pagamento } from "./pagamento";
import { RotasServico } from "@/servicos/navegacao/rotas";
import { ProcessarComprar } from "./processaCompra";
import LoadingComponente from "@/componentes/loading/loadingComponente";
import PagEfetuadoComponente from "@/componentes/pagEfetuado/PagEfetuadoComponente";
import { NavegacaoServico } from "@/servicos/navegacao/nav";
import { atualizaHrefs } from "./atualizandoHrefs";
import UsuarioNavBarComponente from "@/componentes/usuarioNavbar/UsuarioNavBarComponente";

RotasServico.rotaProtegida(()=>{
  UsuarioNavBarComponente()
});
atualizaHrefs();

const btnFinalizar = document.getElementById("finalizarCompra") as
  | HTMLButtonElement
  | undefined;
const btnGerarChave = document.getElementById("gerarPix") as
  | HTMLButtonElement
  | undefined;

const opcoesPag = document.getElementById("opcoesPagamento");
const dados = document.getElementById("dados");
const radios = opcoesPag?.getElementsByTagName("input");
const item = ProcessarComprar.lerItens();

if (opcoesPag && dados) {
  verificarRadioInput();
  opcoesPag.addEventListener("change", verificarRadioInput);
}

function verificarRadioInput() {
  const inputSelecionado = Pagamento.verificarRadioSelecionado(radios);

  if (inputSelecionado) {
    Pagamento.exibirFormConformeInput(inputSelecionado);
  }
}

const selecionaCompra = async () => {
  if (radios && item) {
    const inputSelecionado = Pagamento.verificarRadioSelecionado(radios);

    switch (inputSelecionado?.id) {
      case "cartao":
        return Pagamento.compraPorCartao(item);

      case "pix":
        return Pagamento.compraPorPix(item);

      case "boleto":
        return Pagamento.compraPorBoleto(item);
    }
  }
};

const finalizarCompra = async () => {
  const efetuado = await selecionaCompra();

  if (efetuado) {
    PagEfetuadoComponente(document.body, () => {
      NavegacaoServico.replace("/");
    });
  }
};

btnGerarChave?.addEventListener("click", async () => {
  btnGerarChave.disabled = true;
  await ProcessarComprar.gerarChavePix();
});

btnFinalizar?.addEventListener("click", () => {
  btnFinalizar.disabled = true;
  const loading = LoadingComponente(document.body);

  finalizarCompra().finally(() => {
    loading.esconder();
    btnFinalizar.disabled = false;
  });
});
