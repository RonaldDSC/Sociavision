import Pagamento, { ETipoPagamento } from "./pagamentoModelo";

export default class PagamentoPix extends Pagamento implements IPagamentoPix {
  metodo: keyof typeof ETipoPagamento = "PIX";
  chave: string;

  constructor(dados:IPagamentoPix) {
    super()
    this.chave = dados.chave
  }

  toJson(): Omit<PagamentoPix, "toJson"> {
    return {
      chave:this.chave,
      metodo:this.metodo
    }    
  }

}

export interface IPagamentoPix {
  chave:string
}