import TarefaModelo from "@/modelos/tarefa/TarefaModelo";
import { ITarefaRepositorio } from "./TarefaInterface";
import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import UsuarioRepositorio from "../usuarios/UsuarioRepositorio";
import { ETipoPessoa } from "@/modelos/pessoa/pessoaModelo";
import AutenticacaoRepositorio from "../autenticacao/autenticacaoRepositorio";

export default class TarefaRepositorio implements ITarefaRepositorio {
  
  async pegarTarefas(): Promise<TarefaModelo[]> {
    const {get} = new FirestoreDatabase()

    const consultaTarefas = await get({tabela:"tarefas"})
    
    return consultaTarefas as TarefaModelo[]
  }  

  async criarTarefa(tarefa: TarefaModelo): Promise<boolean> {
    const {create} = new FirestoreDatabase()

    await create({
      tabela:"tarefas",
      valor:tarefa,
      subTabela:tarefa.idTarefa
    })
    
    return true
  }

  async aceitarTarefa(idTarefa: string, idParceiro:string): Promise<boolean> {
    const {update} = new FirestoreDatabase()

    await update({
      tabela:"tarefas",
      subTabela:idTarefa,
      valor:{idParceiro}
    })

    return true    
  }

  async finalizarTarefa(idTarefa: string): Promise<boolean> {
    const {pegarUsuario} = new UsuarioRepositorio

    const usuario = await pegarUsuario(idTarefa)

    if (usuario) {

      switch (usuario.tipoConta) {
        case ETipoPessoa.fisica:
        case ETipoPessoa.juridica:
        case ETipoPessoa.parceira:
          const { remove } = new FirestoreDatabase()      
          await remove({ tabela:"tarefas", subTabela:usuario.id })          
          break;               
      }
      
    }
    

    return true
  }

  async cancelarTarefa(idTarefa:string): Promise<boolean> {
    const {usuarioLogado} = new AutenticacaoRepositorio()

    const usuario = await usuarioLogado()

    if (usuario) {

      switch (usuario.tipoConta) {
        case ETipoPessoa.fisica:
        case ETipoPessoa.juridica:
          const { remove } = new FirestoreDatabase()      
          await remove({ tabela:"tarefas", subTabela: idTarefa })          
          break;
          
        case ETipoPessoa.parceira:
          const { update } = new FirestoreDatabase()
          await update({
            tabela:"tarefas",
            subTabela:idTarefa,
            valor:{idParceiro:""}
          })
          
          break;      
      }
      return true
    }
    return false
  }
}