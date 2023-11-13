import Pagamento from "./pagamentoModelo";

export default interface PagamentoCartaoCredito extends Pagamento<"cartaoCredito"> {
  numero:number,
  titular:string,
  dataExp:string,
  cvv:string  
}