import { UrlServico } from "@/servicos/navegacao/url"
import PlanoPremium from "@/modelos/plano/planoPremiumModelo"
import PlanoBasico from "@/modelos/plano/planoBasicoModelo"
import PlanoIntermediario from "@/modelos/plano/planoIntermediarioModelo"
import { Detalhes } from "./detalhe"
import AvisoComponente from "@/componentes/aviso/AvisoComponente"
import { IPagamentoCartaoCredito } from "@/modelos/pagamento/pagamentoCartaoCreditoModelo"
import { IPagamentoPix } from "@/modelos/pagamento/pagamentoPixModelo"
import ErrorInputComponente from "@/componentes/errorInput/ErroInput"
import { Validacao } from "./validacao"
import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo"
import { TPlanos } from "@/modelos/plano/planoModelo"
import ComprasRepositorio from "@/repositorios/compras/comprasRepositorio"

const lerItens = () => {
  const {item} = UrlServico.pegarParametroAtual()

  switch (item) {
    case "pp":
      const pp = new PlanoPremium()
      Detalhes.adicionarItem(pp.nome,"BRL",pp.preco)
      Detalhes.calcularTotal([pp.preco],"BRL")
      return pp
      
    case "pb":
      const pb = new PlanoBasico()
      Detalhes.adicionarItem(pb.nome,"BRL",pb.preco)  
      Detalhes.calcularTotal([pb.preco],"BRL")
      return pb
      
    case "pi":
      const pi = new PlanoIntermediario()
      Detalhes.adicionarItem(pi.nome,"BRL",pi.preco)  
      Detalhes.calcularTotal([pi.preco],"BRL")
      return pi

    default:
      AvisoComponente(document.body,"Ocorreu um erro","Error ao recuperar o item, tente novamente")
      break;
  }
}

const lerInputCartao = () => { 
  const form = document.getElementById("formCartao")
  const inputs = form?.getElementsByTagName("input")

  let dados = <IPagamentoCartaoCredito> {}

  if (inputs && inputs.length > 0) {

    for (const input of inputs) {
      switch (input.name) {
        case "numero":        
          dados.numero = Number(input.value)     
          break;
          
        case "titular":
          dados.titular = input.value
          break;
        
        case "dataExp":
        
          dados.dataExp = input.value        
          break;
        
        case "cvv":
          dados.cvv = Number(input.value)
          break;    
        
      }  
    }
  }

  return dados 
}

const validarCartao = (dados:IPagamentoCartaoCredito) => {
  const erros = Validacao.validarCartao(dados)

  for (const error of document.getElementsByClassName("errorInput")) {
    error.remove()    
  }

  if (erros) {
    Object.keys(erros).forEach((campoError) => {
            
      switch (campoError) {      
        case "numero":
          inserirError("campo-numero",erros[campoError])
          break         
          
        case "titular":
          inserirError("campo-titular",erros[campoError])        
          break
        
        case "dataExp":
          inserirError("campo-dataExp",erros[campoError])        
          break
          
        case "cvv":
          inserirError("campo-cvv",erros[campoError])        
          break
      }
    })
  }

  return erros
}

const lerInputPix = () => {  
  const form = document.getElementById("formPix")
  const inputs = form?.getElementsByTagName("input")

  let dados = <IPagamentoPix> {}

  if (inputs && inputs.length > 0) {  
    for (const input of inputs) {
      switch (input.name) {
        case "chavePix":        
          dados.chave = input.value        
          break;
      }    
    }
  }

  return dados   
}

const validarPix = (dados:IPagamentoPix) => {
  const erros = Validacao.validarPix(dados)

  for (const error of document.getElementsByClassName("errorInput")) {
    error.remove()    
  }

  if (erros) {
    Object.keys(erros).forEach((campoError) => {
            
      switch (campoError) {      
        case "chave":
          inserirError("campo-chavePix",erros[campoError])
          break
      }
    })
  }
  
  return erros
}

const inserirError = (idCampo:string, mensagem:string) => {
  const campo = document.getElementById(idCampo)  
  const erroInput = campo?.getElementsByClassName("errorInput")[0]
  
  if (erroInput) {
    erroInput.getElementsByClassName("errorInputTexto")[0].textContent = mensagem                           
  } else if(campo) {    
    ErrorInputComponente(campo,mensagem)
  }
}

const registrarCompra = async (dados:TPagamentos,plano:TPlanos) => {  
  try {
    const {comprarPlano} = new ComprasRepositorio()
    return await comprarPlano(dados,plano)
  } catch (error) {
    AvisoComponente(
      document.body,
      "Ocorreu um erro",
      "Um erro inesperado aconteceu, tente novamente mais tarde"
    ) 
  }
}

const gerarChavePix = () => new Promise<string>((resolve) => {
  setTimeout(() => {
    const input = document.getElementById("inputCopyContainer")?.getElementsByTagName("input")[0]
    const img = document.getElementsByClassName("qr-code")[0] as HTMLImageElement
    if(input && img) {
      const chave = "00020126430014BR.GOV.BCB.PIX0121diogovf90@hotmail.com5204000053039865802BR5924Diogo Vitorino de Franca6008Paulista62070503***63048B4C"
      img.style.filter = "blur(0px)"

      input.value = chave
      resolve(chave)    
    }    
  }, 300)
})

export const ProcessarComprar = {
  lerItens,
  registrarCompra,

  lerInputCartao,
  validarCartao,
  
  lerInputPix,
  validarPix,
  gerarChavePix
}