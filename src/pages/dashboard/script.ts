import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import TarefaChatComponente from '@/componentes/tarefaChat/TarefaChatComponente'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'

RotasServico.rotaProtegida(() => {
  UsuarioNavBarComponente()
  adicionaListener()
})

atualizaHrefs()

function adicionaListener () {
  
  document.getElementsByClassName("btn-enviar")[0].addEventListener("click",() => {
    const content = document.getElementsByClassName("content")[0]
    const form = document.querySelector(".form")  
    
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
}
