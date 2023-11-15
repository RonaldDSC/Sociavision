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
          console.log(input.value);
          
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
    console.log(mensagem);
    
    ErrorInputComponente(campo,mensagem)
  }
}

export const ProcessarComprar = {
  lerItens,
  lerInputCartao,
  validarCartao,
  
  lerInputPix,
  validarPix
}