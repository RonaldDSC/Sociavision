import {IPessoaJuridica} from "@/modelos/pessoa/pessoaJuridicaModelo"
import { validacao } from "./validacao"
import ErrorInputComponente from "@/componentes/errorInput/ErroInput"

const form = document.getElementById("formCadastro") as HTMLFormElement
const inputs = form.getElementsByTagName("input")


const lerInputs = () => {
  let pessoa = <IPessoaJuridica> {}
  let senha = ''

  for (const input of inputs) {
    switch (input.name) {
      case "nome":        
        pessoa.nome = input.value        
        break;
        
      case "CNPJ":
        pessoa.cnpj = Number(input.value)
        break;
      
      case "email":
        pessoa.email = input.value        
        break;
      
      case "nomeOrg":
        pessoa.nomeOrg = input.value
        break;
      
      case "senha":
        senha = input.value        
        break;
    }  
    
  }
  
  return {dados: pessoa, senha}
}

const validarCampos = (pessoa:IPessoaJuridica,senha:string) => {
  const erros = validacao.validarDados(pessoa,senha)

  if (erros) {
    Object.keys(erros).forEach((campoError) => {
            
      switch (campoError) {      
        case "email":
          inserirError("campo-email",erros[campoError])
          break         
          
        case "senha":
          inserirError("campo-senha",erros[campoError])        
          break
        
        case "nome":
          inserirError("campo-nome",erros[campoError])        
          break
          
        case "nomeOrg":
          inserirError("campo-nomeOrg",erros[campoError])        
          break
          
        case "cnpj":       
          inserirError("campo-CNPJ",erros[campoError])                 
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

export const ProcessaCadastro = {
  lerInputs,
  validarCampos
}