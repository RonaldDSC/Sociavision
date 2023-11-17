import CopyInputComponente from "@/componentes/copyInput/CopyInputComponente"
import PagamentoBoleto, { IPagamentoBoleto } from "@/modelos/pagamento/pagamentoBoletoModelo"
import PagamentoCartaoCredito from "@/modelos/pagamento/pagamentoCartaoCreditoModelo"
import PagamentoPix from "@/modelos/pagamento/pagamentoPixModelo"
import PessoaFisica from "@/modelos/pessoa/pessoaFisicaModelo"
import PessoaJuridica from "@/modelos/pessoa/pessoaJuridicaModelo"
import { TPlanos } from "@/modelos/plano/planoModelo"
import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import { ProcessarComprar } from "./processaCompra"

const exibirFormConformeInput = (input:HTMLInputElement) => {
  const formCartao = document.getElementById("formCartao")
  const formPix = document.getElementById("formPix")
  const inputCopyContainer = document.getElementById("inputCopyContainer")
  const btnFinalizarCompra = document.getElementById("finalizarCompra")
  
  if ((formCartao || (formPix && inputCopyContainer)) && btnFinalizarCompra ) {
    
    formCartao!.style.opacity = "0"
    formPix!.style.opacity = "0"    
    formCartao!.style.transform = "translateX(50px)"
    formPix!.style.transform = "translateX(50px)"
    
    setTimeout(() => {
      formCartao!.style.display = "none"  
      formPix!.style.display = "none"  
  
      switch (input.id) {
        case "cartao":
          btnFinalizarCompra.textContent = "FINALIZAR COMPRAR"
          exibirForm(formCartao!)      
          break;
          
        case "pix":
          btnFinalizarCompra.textContent = "VERIFICAR PAGAMENTO"
          CopyInputComponente({
            root: inputCopyContainer!,
            placeholder: "Gere uma chave Pix",
            id:"chavePix",
            name:"chavePix"
          })  
          exibirForm(formPix!)                  
          break;
          
        default:
          btnFinalizarCompra.textContent = "FINALIZAR COMPRAR"
          break;
      }
    }, 200);
  }
}

const exibirForm = (elemento:HTMLElement) => {
  elemento.style.display = "flex"
  setTimeout(() => {
    elemento.style.opacity = "1"
    elemento.style.transform = "translateX(0px)"            
  }, 200);
}

const verificarRadioSelecionado = (container?:HTMLCollectionOf<HTMLInputElement>) => {
  if (container) {
    for (const radio of container) {
      if (radio.checked) {
        return radio  
      }    
    }    
  }
}

const compraPorBoleto = async (item:TPlanos) => {
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const usuario = await usuarioLogado()        

  if (usuario && item) {
    const dados = <IPagamentoBoleto> {}

    if (usuario instanceof PessoaFisica) {
      dados.identificacao = usuario.cpf
      dados.nome = usuario.nome            
    }
    
    if (usuario instanceof PessoaJuridica) {
      dados.identificacao = usuario.cnpj
      dados.nome = usuario.nome            
    }

    return ProcessarComprar.registrarCompra(new PagamentoBoleto(dados),item)
  }
}

const compraPorPix = async (item:TPlanos) => {
  const pix = ProcessarComprar.lerInputPix()
  const errosPix = ProcessarComprar.validarPix(pix)

  if (!errosPix)
    return ProcessarComprar.registrarCompra(new PagamentoPix(pix),item)        
}

const compraPorCartao = async (item:TPlanos) => {
  const cartao = ProcessarComprar.lerInputCartao()
  const errosCartao = ProcessarComprar.validarCartao(cartao)

  if (!errosCartao)
    return ProcessarComprar.registrarCompra(new PagamentoCartaoCredito(cartao),item)       
}

export const Pagamento = {
  verificarRadioSelecionado,
  exibirFormConformeInput,

  compraPorCartao,
  compraPorPix,
  compraPorBoleto
}