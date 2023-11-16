import Pagamento, { ETipoPagamento } from "./pagamentoModelo";

export default class PagamentoCartaoCredito extends Pagamento implements IPagamentoCartaoCredito  {
  metodo: keyof typeof ETipoPagamento = "cartaoCredito";
  numero: number;
  titular: string;
  dataExp: string;
  cvv: number;

  constructor(dados:IPagamentoCartaoCredito) {
    super()
    this.numero = dados.numero
    this.dataExp = dados.dataExp
    this.titular = dados.titular
    this.cvv = dados.cvv
  }

  toJson(): Omit<PagamentoCartaoCredito, "toJson"> {
    return {
      cvv:this.cvv,
      dataExp:this.dataExp,
      metodo:this.metodo,
      numero:this.numero,
      titular:this.titular
    }
  }
}

export interface IPagamentoCartaoCredito {
  numero:number,
  titular:string,
  dataExp:string,
  cvv:number  
}