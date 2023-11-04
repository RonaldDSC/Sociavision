import { navegar, rotas } from "@/servicos/navegacao/navegacao"
import figuraFisica from '@assets/svgs/undraw_business_analytics_re_tfh3 1.svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement

  linkHome.href = rotas["/"]
  btnLogin.addEventListener("click",() => navegar("/login"))

  const figura = document.getElementById("painel-direito")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = figuraFisica    
  }
}