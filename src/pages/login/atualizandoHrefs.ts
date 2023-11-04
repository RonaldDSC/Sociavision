import { rotas } from "@/servicos/navegacao/navegacao"
import mobileSvg from "@assets/svgs/Mobile login-pana 1.svg"

export const atualizaHrefs = () => {
  const linkHome = document.getElementById("linkHome") as HTMLLinkElement
  const linkResetPass = document.getElementById("linkResetPass") as HTMLLinkElement
  const linkSignUp = document.getElementById("linkSignUp") as HTMLLinkElement

  linkHome.href = rotas['/']
  linkResetPass.href = rotas['/login/resetarSenha']
  linkSignUp.href =  rotas['/cadastro']


  const figura = document.getElementById("painel-esquerdo")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = mobileSvg
    figura.alt = "Icone de uma mulher efetuando um login"    
  }

}