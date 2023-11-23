import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import TarefaChatComponente from '@/componentes/tarefaChat/TarefaChatComponente'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'
import { UrlServico } from '@/servicos/navegacao/url'

RotasServico.rotaProtegida()
UsuarioNavBarComponente()

atualizaHrefs()


const content = document.getElementsByClassName("content")[0]
const form = document.querySelector(".form")  

const {aceito} = UrlServico.pegarParametroAtual()

if (aceito && content && form) {
  form.classList.toggle("none")

  const tarefa = TarefaChatComponente({
    container:content,
    titulo:"Tudo pronto, agora entre em contato com seu Social Media",
    pendente:false,
    aoClicarCancelar:()=> {
      tarefa.esconder()
      setTimeout(() => {
        form.classList.toggle("none")
      },200)
    },
    aoClicarChat:()=>{
      window.open("https://wa.me/558199397339")
    },
    aoClicarFinalizar:()=>{
      window.location.reload()
    },
  })
  
}
document.getElementsByClassName("btn-enviar")[0].addEventListener("click",() => {
  
  if (content && form) {
    form.classList.toggle("none")

    const tarefa = TarefaChatComponente({
      container:content,
      titulo:"Esperando pelo Social Media",
      pendente:true,
      aoClicarCancelar:()=> {
        tarefa.esconder()
        setTimeout(() => {
          form.classList.toggle("none")
        },200)
      },
      aoClicarChat:()=>{},
      aoClicarFinalizar:()=>{
        window.location.reload()
      },
    })      
  }

})  


  
