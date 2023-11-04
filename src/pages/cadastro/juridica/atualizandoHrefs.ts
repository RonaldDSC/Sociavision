import { navegar, rotas } from "@/servicos/navegacao/navegacao"
import figuraJuridica from '@assets/svgs/undraw_business_decisions_re_84ag 1.svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement

  linkHome.href = rotas["/"]
  btnLogin.addEventListener("click",() => navegar("/login"))

  const figura = document.getElementById("painel-direito")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = figuraJuridica    
  }
}