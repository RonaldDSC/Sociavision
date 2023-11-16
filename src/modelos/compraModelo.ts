import { TPagamentos } from "./pagamento/pagamentoModelo"

export default interface CompraModelo<Produto> {
  dadosPagamento: Omit<TPagamentos, "toJson">
  preco:number
  readonly moeda: "BRL"
  produto:Produto
  timestamp:string
}


