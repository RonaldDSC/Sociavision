import { NavegacaoServico } from '@/servicos/navegacao/nav'
import { UrlServico } from '@/servicos/navegacao/url'
import { RotasServico } from '@/servicos/navegacao/rotas'
import figuraFisica from '@assets/svgs/undraw_business_analytics_re_tfh3 1.svg'
import figuraJuridica from '@assets/svgs/undraw_business_decisions_re_84ag 1.svg'
import figuraParceira from '@assets/svgs/undraw_online_media_re_r9qv 1(1).svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement
  
  const fisica = document.getElementById("pFisica")
  const juridica = document.getElementById("pJuridica")
  const parceiro = document.getElementById("parceiro")

  linkHome.href = RotasServico.rotas["/"]
  btnLogin.addEventListener("click",
    () => NavegacaoServico.navegar("/login",UrlServico.pegarParametroAtual())
  )

  if (parceiro) {
    parceiro.addEventListener("click",
      () => NavegacaoServico.navegar("/cadastro/parceiro",UrlServico.pegarParametroAtual())
    )
    parceiro.getElementsByTagName("img")[0].src = figuraParceira  
  }

  if (fisica) {
    fisica.addEventListener("click",
      () => NavegacaoServico.navegar("/cadastro/fisica",UrlServico.pegarParametroAtual())
    )
    fisica.getElementsByTagName("img")[0].src = figuraFisica
  }

  if (juridica) {
    juridica.addEventListener("click",
      () => NavegacaoServico.navegar("/cadastro/juridica",UrlServico.pegarParametroAtual())
    )
    juridica.getElementsByTagName("img")[0].src = figuraJuridica   
  }
}