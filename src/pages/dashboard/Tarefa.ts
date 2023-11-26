import TarefaChatComponente from "@/componentes/tarefaChat/TarefaChatComponente"
import { ProcessarTarefa } from "./ProcessarTarefa"
import TarefaRepositorio from "@/repositorios/tarefas/TarefasRepositorio"
import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import UsuarioRepositorio from "@/repositorios/usuarios/UsuarioRepositorio"

const verificarTarefaPendente = async () => {
  const content = document.getElementsByClassName("content")[0]
  const form = document.querySelector(".form")

  const {pegarTarefas} = new TarefaRepositorio()
  const {usuarioLogado} = new AutenticacaoRepositorio()

  const usuario = await usuarioLogado()
  const tarefa = (await pegarTarefas()).find(item => item.idTarefa === usuario?.id)  

  if (content && form && tarefa) {
    
    if (!tarefa.idParceiro) {
      
      const componente = TarefaChatComponente({
        container:content,
        titulo:"Esperando pelo Social Media",
        pendente:true,
        aoClicarCancelar:async () => {
          await ProcessarTarefa.cancelar()          
          componente.esconder()          
          setTimeout(() => form.classList.toggle("none"),200)    
        },
      })
      form.classList.toggle("none")

    } else {
      const {pegarUsuario} = new UsuarioRepositorio()
      const {finalizarTarefa} = new TarefaRepositorio()
      
      const parceiro = await pegarUsuario(tarefa.idParceiro!)

      const componente = TarefaChatComponente({
        container:content,
        titulo:"Tudo pronto, agora entre em contato com seu Social Media",
        pendente:false,
        aoClicarCancelar: async () => {
          await ProcessarTarefa.cancelar()
          componente.esconder()
          setTimeout(() => form.classList.toggle("none"),200)
        },
        aoClicarChat:()=>{
          window.open(`https://wa.me/${parceiro?.numero}${parceiro?.numeroPais}`)
        },
        aoClicarFinalizar:async () => {
          await finalizarTarefa(tarefa.idTarefa)
          window.location.reload()
        },
      })
      form.classList.toggle("none")
    }
        
  }
}

export const Tarefa = {
  verificarTarefaPendente
}