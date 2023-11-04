import { navegar, rotas } from "@/servicos/navegacao/navegacao"
import figuraParceira from '@assets/svgs/undraw_online_media_re_r9qv 1(1).svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement

  linkHome.href = rotas["/"]
  btnLogin.addEventListener("click",() => navegar("/login"))

  const figura = document.getElementById("painel-direito")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = figuraParceira    
  }
}