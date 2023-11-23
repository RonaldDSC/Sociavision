import '@/globalStyle.css'
import './main.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'; // importando Bootstrap-grid
import 'bootstrap/dist/css/bootstrap.min.css'; // importando Bootstrap-css
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import { NavegacaoServico } from '@/servicos/navegacao/nav'
import { UrlServico } from '@/servicos/navegacao/url'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs';
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente';

atualizaHrefs()

RotasServico.rotaProtegida(async () => {
  await UsuarioNavBarComponente()

  const cardPremium = document.getElementsByClassName("btn-card-premium")[0]
  const cardIntermediário = document.getElementsByClassName("btn-card-intermediário")[0]
  const cardBasico = document.getElementsByClassName("btn-card-basico")[0]


  if(cardBasico) {
    cardBasico.addEventListener("click",() => navegarPagamento("pb"))  
  }

  if(cardIntermediário) {
    cardIntermediário.addEventListener("click",() => navegarPagamento("pi"))  
  }

  if(cardPremium) {
    cardPremium.addEventListener("click",() => navegarPagamento("pp"))  
  }
})

const navegarPagamento = async (nomeItem) => {
  
  try {
    const {usuarioLogado} = new AutenticacaoRepositorio()
    const usuario = await usuarioLogado()
    const param = {item:nomeItem}
    console.log(usuario);

    if (usuario !== null) {
      NavegacaoServico.navegar("/pagamento",param)
      
    } else {
      NavegacaoServico.navegar("/login",{
        next: UrlServico.inserirParametros(RotasServico.rotas["/pagamento"],param)
      })
    }    
  } catch (error) {
    console.log(error);
    
  }
}




