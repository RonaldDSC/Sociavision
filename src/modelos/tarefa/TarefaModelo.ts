import { ENomesPlanos } from "../plano/planoModelo"

export default interface TarefaModelo {
  idTarefa:string
  idParceiro?:string
  plano: ENomesPlanos
  preco: string
  dataExp: string
  resumo: string
}

export type TTarefaStatus = "pendente" | "andamento" | "finalizando"