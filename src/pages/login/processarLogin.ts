import ErrorInputComponente from "@/componentes/errorInput/ErroInput";
import { IEmailESenha } from "@/servicos/api/autenticador/autenticadorFirebase";
import { validacao } from "./validacao";

const lerInputs = () => {
  const inputs = document.getElementsByTagName("input")
  const credenciais: Partial<IEmailESenha> = {}

  for (const input of inputs) {
    switch (input.name) {      
      case "email":        
        credenciais.email = input.value        
        break;    
      
      case "senha":        
        credenciais.senha = input.value        
        break;
    }     
  }

  return credenciais as IEmailESenha
}

const validarCampos = (credenciais: IEmailESenha) => {
  const erros = validacao.validarEmailESenha(credenciais)
  
  for (const error of document.getElementsByClassName("errorInput")) {
    error.remove()    
  }

  if (erros) {
    Object.keys(erros).forEach((campo) => {
      
        switch (campo) {      
          case "email":
            inserirError("campo-email",erros[campo])            
            break;
            
          case "senha":            
            inserirError("campo-senha",erros[campo])
            break;
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

export const ProcessarLogin = {
  lerInputs,
  validarCampos
}
