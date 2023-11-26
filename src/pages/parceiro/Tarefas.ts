import AvisoComponente from "@/componentes/aviso/AvisoComponente"
import LoadingComponente from "@/componentes/loading/loadingComponente"
import ModalNumero from "@/componentes/modalNumero/ModalNumero"
import TarefaAndamentoComponente from "@/componentes/tarefas/tarefaAndamento/TarefaAndamentoComponente"
import TarefaDisponivelComponente from "@/componentes/tarefas/tarefaDisponivel/TarefaDisponivelComponente"
import TarefaModelo from "@/modelos/tarefa/TarefaModelo"
import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import TarefaRepositorio from "@/repositorios/tarefas/TarefasRepositorio"
import UsuarioRepositorio from "@/repositorios/usuarios/UsuarioRepositorio"
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
      NavegacaoServico.navegar("/parceiro/tarefa",{id:tarefa.idTarefa})
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
    aoClicarProsseguir:async () => {
      const possuiNumero = await verificarNumero()

      if (possuiNumero) {
        
        const loading = LoadingComponente(document.body)
        try {
          const {aceitarTarefa} = new TarefaRepositorio()
          const {usuarioLogado} = new AutenticacaoRepositorio()
          const usuario = await usuarioLogado()       
          
          if (usuario) {        
            await aceitarTarefa(tarefa.idTarefa,usuario.id)
            NavegacaoServico.navegar("/parceiro/tarefa",{id: tarefa.idTarefa})          
          } 

        } catch (error) {
          console.log(error);        
          AvisoComponente(
            document.body,
            "Ocorreu o error",
            "Algo inesperado aconteceu ao aceitar a tarefa"
          )        
        } finally {
          loading.esconder()
        }
        
      }            
    }
  })
  
  lista.appendChild(li) 
}

const verificarNumero = () => new Promise<boolean>(async (resolve) => {
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const {atualizarUsuario} = new UsuarioRepositorio()
  
  const usuario = await usuarioLogado()

  if (usuario && !usuario.numero) {
    ModalNumero(async (dados) => {
      await atualizarUsuario(usuario.id,{...dados})
      resolve(true)      
    })        
  }
})

export const Tarefas = {
  adicionarTarefasAndamento,
  adicionarTarefasDisponiveis,
  verificarNumero
}