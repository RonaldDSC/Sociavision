import { UrlServico } from "@/servicos/navegacao/url"
import { RotasServico } from "@/servicos/navegacao/rotas"
import mobileSvg from "@assets/svgs/Mobile login-pana 1.svg"

export const atualizaHrefs = () => {
  const linkHome = document.getElementById("linkHome") as HTMLLinkElement
  const linkSignUp = document.getElementById("linkSignUp") as HTMLLinkElement

  linkHome.href = RotasServico.rotas['/']
  linkSignUp.href = UrlServico.copiarParametroAtual(RotasServico.rotas["/cadastro"])


  const figura = document.getElementById("painel-esquerdo")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = mobileSvg
    figura.alt = "Icone de uma mulher efetuando um login"    
  }

}