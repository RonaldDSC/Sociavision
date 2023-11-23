import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import TarefaChatComponente from '@/componentes/tarefaChat/TarefaChatComponente'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'
import { NavegacaoServico } from '@/servicos/navegacao/nav'

RotasServico.rotaProtegida()
UsuarioNavBarComponente()

atualizaHrefs()

const content = document.getElementsByClassName("content")[0]  

if(content) {
  TarefaChatComponente({
    container:content,
    titulo:"Entre em contato com o cliente e revise os detalhes",
    pendente:false,
    aoClicarCancelar:()=> {
      NavegacaoServico.replace("/parceiro")        
    },
    aoClicarChat:()=>{
      window.open("https://wa.me/558199397339")
    },
    aoClicarFinalizar:()=>{
      NavegacaoServico.replace("/parceiro")
    },
  })
}


  
