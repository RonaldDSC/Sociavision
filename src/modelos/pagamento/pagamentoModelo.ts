import pagamentoBoleto from "./pagamentoBoletoModelo"
import PagamentoCartaoCredito from "./pagamentoCartaoCreditoModelo"
import pagamentoPix from "./pagamentoPixModelo"

export default interface Pagamento<a extends keyof typeof ETipoPagamento> {
  metodo:a
}

export type TPagamentos = PagamentoCartaoCredito | pagamentoBoleto | pagamentoPix

export enum ETipoPagamento { boleto = "Boleto", PIX = "Pix", cartaoCredito = "Cartão de credito" }