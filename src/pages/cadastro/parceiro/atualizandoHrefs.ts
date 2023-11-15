import { NavegacaoServico } from '@/servicos/navegacao/nav'
import { UrlServico } from '@/servicos/navegacao/url'
import { RotasServico } from '@/servicos/navegacao/rotas'
import figuraParceira from '@assets/svgs/undraw_online_media_re_r9qv 1(1).svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement

  linkHome.href = RotasServico.rotas["/"]
  btnLogin.addEventListener("click",
    () => NavegacaoServico.navegar("/login",UrlServico.pegarParametroAtual())
  )

  const figura = document.getElementById("painel-direito")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = figuraParceira    
  }
}