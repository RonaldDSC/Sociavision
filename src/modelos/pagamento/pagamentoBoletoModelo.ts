import Pagamento, { ETipoPagamento } from "./pagamentoModelo";

export default class PagamentoBoleto extends Pagamento implements IPagamentoBoleto {
  nome: string;
  identificacao: number;
  metodo: keyof typeof ETipoPagamento = "boleto";

  constructor(dados:IPagamentoBoleto) {
    super()
    this.identificacao = dados.identificacao
    this.nome = dados.nome    
  }

  toJson(): Omit<PagamentoBoleto, "toJson"> {
    return {
      identificacao:this.identificacao,
      nome:this.nome,
      metodo:this.metodo
    }
  }
}

export interface IPagamentoBoleto {
  nome:string
  identificacao:number
}