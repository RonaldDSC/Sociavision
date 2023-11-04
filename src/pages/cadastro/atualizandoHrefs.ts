import { navegar, rotas } from "@/servicos/navegacao/navegacao"
import figuraFisica from '@assets/svgs/undraw_business_analytics_re_tfh3 1.svg'
import figuraJuridica from '@assets/svgs/undraw_business_decisions_re_84ag 1.svg'
import figuraParceira from '@assets/svgs/undraw_online_media_re_r9qv 1(1).svg'

export const atualizaHrefs = () => {
  const linkHome = document.getElementsByClassName("logo")[0] as HTMLLinkElement
  const btnLogin = document.getElementsByClassName("btn-login")[0] as HTMLButtonElement
  
  const fisica = document.getElementById("pFisica")
  const juridica = document.getElementById("pJuridica")
  const parceiro = document.getElementById("parceiro")

  linkHome.href = rotas["/"]
  btnLogin.addEventListener("click",() => navegar("/login"))

  if (parceiro) {
    parceiro.addEventListener("click",() => navegar("/cadastro/parceiro"))
    parceiro.getElementsByTagName("img")[0].src = figuraParceira  
  }

  if (fisica) {
    fisica.addEventListener("click",() => navegar("/cadastro/fisica"))
    fisica.getElementsByTagName("img")[0].src = figuraFisica
  }

  if (juridica) {
    juridica.addEventListener("click",() => navegar("/cadastro/juridica"))
    juridica.getElementsByTagName("img")[0].src = figuraJuridica   
  }
}