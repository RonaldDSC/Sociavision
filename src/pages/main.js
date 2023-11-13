import '@/globalStyle.css'
import './main.css'
import '@/servicos/navegacao/navegacao'
import ComprasRepositorio from '@/repositorios/compras/comprasRepositorio'
import PlanoBasico from '@/modelos/plano/planoBasicoModelo'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import LoadingComponente from '@/componentes/loading/loadingComponente'


// temporario
document.getElementById("COMPRAR")?.addEventListener("click",()=>{
  const repo = new ComprasRepositorio()

  repo.realizarCompra({
    cvv:"222",
    dataExp:"exp",
    numero:121212,
    titular:"diogo",
    metodo:"cartaoCredito"
  },new PlanoBasico("exp").toJson())
})

document.getElementById("sair")?.addEventListener("click",()=>{
  const carregando = LoadingComponente(document.body)
  new AutenticacaoRepositorio().sair()
  carregando.esconder()
})
