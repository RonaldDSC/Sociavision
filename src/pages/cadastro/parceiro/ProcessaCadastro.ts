import { PessoaParceira } from "@/modelos/pessoaModelo"
import { validacao } from "./validacao"
import ErrorInputComponente from "@/componentes/errorInput/ErroInput"

const form = document.getElementById("formCadastro") as HTMLFormElement
const inputs = form.getElementsByTagName("input")


const lerInputs = () => {
  let pessoa:Partial<PessoaParceira> = {}
  let senha = ''

  for (const input of inputs) {
    switch (input.name) {
      case "nome":        
        pessoa.nome = input.value        
        break;
        
      case "CPF":
        pessoa.cpf = Number(input.value)
        break;
      
      case "email":
        pessoa.email = input.value        
        break;
      
      case "dataNasc":
        pessoa.dataNasc = input.value
        break;
      
      case "senha":
        senha = input.value        
        break;
    }  
    
  }
  
  return {dados: pessoa as PessoaParceira, senha}
}

const validarCampos = (pessoa:PessoaParceira,senha:string) => {
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
          
        case "dataNasc":
          inserirError("campo-dataNasc",erros[campoError])        
          break
          
        case "cpf":
          console.log(erros[campoError]);
          
          inserirError("campo-CPF",erros[campoError])                 
          break
      }
    })
  }

  return erros
}

const inserirError = (idCampo:string, mensagem:string) => {
  const campoEmail = document.getElementById(idCampo)
  const erroInput = campoEmail?.getElementsByClassName("errorInput")[0]
  
  if (erroInput) {
    erroInput.getElementsByClassName("errorInputTexto")[0].textContent = mensagem                           
  } else {
    campoEmail?.append(ErrorInputComponente(mensagem))
  }
}

export const ProcessaCadastro = {
  lerInputs,
  validarCampos
}