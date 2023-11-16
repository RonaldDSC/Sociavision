import '@/globalStyle.css'
import './main.css'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import { NavegacaoServico } from '@/servicos/navegacao/nav'
import { UrlServico } from '@/servicos/navegacao/url'
import { RotasServico } from '@/servicos/navegacao/rotas'
import LoadingComponente from '@/componentes/loading/loadingComponente'

// Links

const login = document.getElementsByClassName("btn-login");
const cadastro = document.getElementsByClassName("btn-cadastro");
const sair = document.getElementById("temp-sair");

login[0].href = RotasServico.rotas["/login"]
cadastro[0].href = RotasServico.rotas["/cadastro"]

sair.addEventListener("click",async () => {
  const carregando = LoadingComponente(document.body)
  await new AutenticacaoRepositorio().sair()
  carregando.esconder()
})

// Cards

const cardPremium = document.getElementsByClassName("card-Premium");
const cardIntermediário = document.getElementsByClassName("card-Intermediário");
const cardBasico = document.getElementsByClassName("card-basico");

const btnCardBasico = cardBasico[0].getElementsByClassName("btn-card")
const btnCardIntermediario = cardIntermediário[0].getElementsByClassName("btn-card")
const btnCardPremium = cardPremium[0].getElementsByClassName("btn-card")

if(btnCardBasico[0]) {
  btnCardBasico[0].addEventListener("click",() => navegarPagamento("pb"))  
}

if(btnCardIntermediario[0]) {
  btnCardIntermediario[0].addEventListener("click",() => navegarPagamento("pi"))  
}

if(btnCardPremium[0]) {
  btnCardPremium[0].addEventListener("click",() => navegarPagamento("pp"))  
}


async function navegarPagamento(nomeItem) {
  const loading = LoadingComponente(document.body)

  try {
    const {usuarioLogado} = new AutenticacaoRepositorio()
    const usuario = await usuarioLogado()
    const param = {item:nomeItem}
    
    if (usuario !== null) {
      NavegacaoServico.navegar("/pagamento",param)
      
    } else {
      NavegacaoServico.navegar("/login",{
        next: UrlServico.inserirParametros(RotasServico.rotas["/pagamento"],param)
      })
    }    
  } catch (error) {}
  finally {
    loading.esconder()
  }

}