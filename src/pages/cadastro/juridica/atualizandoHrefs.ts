import { NavegacaoServico } from '@/servicos/navegacao/nav'
import { UrlServico } from '@/servicos/navegacao/url'
import { RotasServico } from '@/servicos/navegacao/rotas'
import figuraJuridica from '@assets/svgs/undraw_business_decisions_re_84ag 1.svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement

  linkHome.href = RotasServico.rotas["/"]
  btnLogin.addEventListener("click",
    () => NavegacaoServico.navegar("/login",UrlServico.pegarParametroAtual())
  )

  const figura = document.getElementById("painel-direito")?.getElementsByTagName("img")[0]
  if (figura) {
    figura!.src = figuraJuridica    
  }
}