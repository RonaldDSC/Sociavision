import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import TarefaChatComponente from '@/componentes/tarefaChat/TarefaChatComponente'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'
import { NavegacaoServico } from '@/servicos/navegacao/nav'
import TarefaRepositorio from '@/repositorios/tarefas/TarefasRepositorio'
import { UrlServico } from '@/servicos/navegacao/url'
import UsuarioRepositorio from '@/repositorios/usuarios/UsuarioRepositorio'
import { Dados } from './Dados'
import LoadingComponente from '@/componentes/loading/loadingComponente'


RotasServico.rotaProtegida()

atualizaHrefs()
const loading = LoadingComponente(document.body)
load().finally(() => {
  loading.esconder()
})


async function load() {
  await init() 
  await Dados.recuperarDados() 
  await UsuarioNavBarComponente()
}


async function init() {
  const content = document.getElementsByClassName("content")[0]  
  const {id} = UrlServico.pegarParametroAtual()
  
  if (id && content) {
    const {pegarUsuario} = new UsuarioRepositorio() 
    const usuario = await pegarUsuario(id)      
    
    if (usuario) {     

      TarefaChatComponente({
        container:content,
        titulo:"Entre em contato com o cliente e revise os detalhes",
        pendente:false,
        aoClicarCancelar:async () => {
          const {cancelarTarefa} = new TarefaRepositorio()
          await cancelarTarefa(usuario.id)
          NavegacaoServico.replace("/parceiro")        
        },
        aoClicarChat:() => {
          window.open(`https://wa.me/${usuario.numeroPais}${usuario.numero}`)
        },
        aoClicarFinalizar:async () => {
          const {finalizarTarefa} = new TarefaRepositorio()
          await finalizarTarefa(usuario.id)
          NavegacaoServico.replace("/parceiro")
        },
      })
    }    
  }  
}





  
