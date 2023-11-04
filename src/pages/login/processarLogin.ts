import ErrorInputComponente from "@/componentes/errorInput/ErroInput";
import { IEmailESenha } from "@/servicos/api/autenticador/autenFirebase";
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
  if (erros) {
    Object.keys(erros).forEach((campoError) => {
      
        switch (campoError) {      
          case "email":
            const ErroInputEmail = document.getElementsByClassName("errorInputTexto")[0]
            if (ErroInputEmail) {
              ErroInputEmail.textContent = erros["email"]                            
            } else {
              document.getElementById("campo-email")?.append(ErrorInputComponente(erros["email"]))
            }
            break;
            
          case "senha":            
            const ErroInputSenha = document.getElementsByClassName("errorInputTexto")[1]
            if (ErroInputSenha) {
              ErroInputSenha.textContent = erros["senha"]                            
            } else {
              document.getElementById("campo-senha")?.append(ErrorInputComponente(erros["senha"]))              
            }
            break;
        }
    })
  }

  return erros
}

export const ProcessarLogin = {
  lerInputs,
  validarCampos
}
