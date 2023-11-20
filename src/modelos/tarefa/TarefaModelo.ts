import { ENomesPlanos } from "../plano/planoModelo"

export default interface TarefaModelo {
  id:string
  plano: keyof typeof ENomesPlanos
  preco:string
  dataExp:string
  detalhe:string
}