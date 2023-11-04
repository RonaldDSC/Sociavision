import '@/globalStyle.css'
import './styles.css'
import '@/servicos/navegacao/navegacao'
import { pessoaParceira } from '@/modelos/pessoaModelo'
import AutenRepositorio from '@/repositorios/autenticacao/autenRepositorio'
import { atualizaHrefs } from './atualizandoHrefs'

atualizaHrefs()

const form = document.getElementById("formCadastro") as HTMLFormElement
const inputs = form.getElementsByTagName("input")


const verificarCampos = () => {
  let pessoa:Partial<pessoaParceira> = {}


  for (const input of inputs) {
    switch (input.name) {
      case "nome":
        input.value = "ronaldo"
        pessoa.nome = input.value        
        break;
        
      case "CPF":
        input.value = "142055714"
        pessoa.cpf = Number(input.value)
        break;
      
      case "email":
        input.value = "ronaldo@hotmail.com"
        pessoa.email = input.value        
        break;
      
      case "dataNasc":
        input.value = "21/01/2002"
        pessoa.dataNasc = input.value
        break;
      
      case "senha":
        input.value = "diogovf90"
        pessoa.senha = input.value        
        break;
    }  
    
  }
  
  return pessoa as pessoaParceira
}




const cadastro = async () => {
  const pessoaVerificada = verificarCampos()

  await new AutenRepositorio().cadastrar({email:pessoaVerificada.email,senha:pessoaVerificada.senha},pessoaVerificada)
}

form.getElementsByClassName("enviar-btn")[0].addEventListener("click",cadastro);