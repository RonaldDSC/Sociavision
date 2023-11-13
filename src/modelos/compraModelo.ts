import { ETipoPagamento } from "./pagamento/pagamentoModelo"

export default interface CompraModelo<Produto> {
  produto:Produto
  metodoPagamento:keyof typeof ETipoPagamento
  preco:number
  readonly moeda: "BRL"
  timestamp:string
}



