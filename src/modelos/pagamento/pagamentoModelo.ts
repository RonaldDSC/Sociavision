import PagamentoBoleto from "./pagamentoBoletoModelo"
import PagamentoCartaoCredito from "./pagamentoCartaoCreditoModelo"
import PagamentoPix from "./pagamentoPixModelo"

export default abstract class Pagamento {
  abstract metodo: keyof typeof ETipoPagamento

  abstract toJson(): Omit<TPagamentos, "toJson">
}

export type TPagamentos = PagamentoCartaoCredito | PagamentoBoleto | PagamentoPix

export enum ETipoPagamento { boleto = "Boleto", PIX = "Pix", cartaoCredito = "Cartão de credito", sistema = "sistema"}