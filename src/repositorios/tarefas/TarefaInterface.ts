import TarefaModelo from "@/modelos/tarefa/TarefaModelo";

export abstract class ITarefaRepositorio {
  abstract pegarTarefas(id:string): Promise<TarefaModelo[]>

  abstract aceitarTarefa(idTarefa: string, idParceiro:string): Promise<boolean>
  abstract cancelarTarefa(id:string): Promise<boolean>
  abstract finalizarTarefa(id:string): Promise<boolean>

  abstract criarTarefa(tarefa:Omit<TarefaModelo, "id">): Promise<boolean>
}
