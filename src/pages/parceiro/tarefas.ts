import TarefaAndamentoComponente from "@/componentes/tarefas/tarefaAndamento/TarefaAndamentoComponente"
import TarefaDisponivelComponente from "@/componentes/tarefas/tarefaDisponivel/TarefaDisponivelComponente"
import TarefaModelo from "@/modelos/tarefa/TarefaModelo"
import { NavegacaoServico } from "@/servicos/navegacao/nav"

const adicionarTarefasAndamento = (tarefa:TarefaModelo) => {
  const lista = document.getElementById("tarefa-andamento")?.getElementsByClassName("lista-tarefa")[0]

  if (!lista) {
    return;    
  }

  const li = document.createElement("li")
  TarefaAndamentoComponente({
    container:li,
    ...tarefa,
    aoClicarProsseguir: () => {
      NavegacaoServico.navegar("/parceiro",{id:tarefa.id})
    }
  })
  
  lista.appendChild(li) 
}

const adicionarTarefasDisponiveis = (tarefa:TarefaModelo) => {
  const lista = document.getElementById("tarefa-disponivel")?.getElementsByClassName("lista-tarefa")[0]

  if (!lista) {
    return;    
  }

  const li = document.createElement("li")
  TarefaDisponivelComponente({
    container:li,
    ...tarefa,
    aoClicarProsseguir: () => {
      NavegacaoServico.navegar("/parceiro",{id:tarefa.id})
    }
  })
  
  lista.appendChild(li) 
}

export const Tarefas = {
  adicionarTarefasAndamento,
  adicionarTarefasDisponiveis
}