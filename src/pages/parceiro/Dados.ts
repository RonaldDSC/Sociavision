import AvisoComponente from "@/componentes/aviso/AvisoComponente"
import LoadingComponente from "@/componentes/loading/loadingComponente"
import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import TarefaRepositorio from "@/repositorios/tarefas/TarefasRepositorio"
import { Tarefas } from "./Tarefas"

const carregarLista = async () => {
  const loading = LoadingComponente(document.body)

  try {
    const {pegarTarefas} = new TarefaRepositorio()
    const {usuarioLogado} = new AutenticacaoRepositorio()
    
    const lista = await pegarTarefas()
    const usuario = await usuarioLogado()
    
    if(lista.length !== 0 && usuario) {
    
      lista.forEach(tarefa => {
        if (!tarefa.idParceiro) {
          Tarefas.adicionarTarefasDisponiveis(tarefa)        
        } else if (tarefa.idParceiro === usuario.id) {
          Tarefas.adicionarTarefasAndamento(tarefa)
        }
      }) 
    }
    
  } catch (error) {
    AvisoComponente(
      document.body,
      "Ocorreu um erro",
      "Algo inesperado aconteceu ao recuperar a lista de tarefas"
    )    
  } finally {
    loading.esconder()
  }
}

const recarregarLista = async () => {
  const lista = document.getElementsByClassName("lista-tarefa")
  if (lista.length !== 0) {
    for (const ul of lista) {
      ul.innerHTML = ""      
    }
    
    await carregarLista()
  }
}

export const Dados = {
  recarregarLista,
  carregarLista
}