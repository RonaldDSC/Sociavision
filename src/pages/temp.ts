import '@/globalStyle.css'
import './main.css'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import LoadingComponente from '@/componentes/loading/loadingComponente'
import { NavegacaoServico } from '@/servicos/navegacao/nav'
import { UrlServico } from '@/servicos/navegacao/url'
import { RotasServico } from '@/servicos/navegacao/rotas'


// temporario
document.getElementById("PP")?.addEventListener("click",async ()=>{
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const param = {item:"pp"}

  if (await usuarioLogado()) {
    NavegacaoServico.navegar("/pagamento",param)
    
  } else {
    NavegacaoServico.navegar("/login",{
      next: UrlServico.inserirParametros(RotasServico.rotas["/pagamento"],param)
    })
  }
})

document.getElementById("PB")?.addEventListener("click",async ()=>{
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const param = {item:"pb"}

  if (await usuarioLogado()) {
    NavegacaoServico.navegar("/pagamento",param)
  } else {
    NavegacaoServico.navegar("/login",{
      next: UrlServico.inserirParametros(RotasServico.rotas["/pagamento"],param)
    })

  }

  
})

document.getElementById("PI")?.addEventListener("click",async ()=>{
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const param = {item:"pi"}

  if (await usuarioLogado()) {
    NavegacaoServico.navegar("/pagamento",param)    
  } else {
    NavegacaoServico.navegar("/login",{
      next: UrlServico.inserirParametros(RotasServico.rotas["/pagamento"],param)
    }) 

  }

})

document.getElementById("sair")?.addEventListener("click",()=>{
  const carregando = LoadingComponente(document.body)
  new AutenticacaoRepositorio().sair()
  carregando.esconder()
})
