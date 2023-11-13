import CompraModelo from "@/modelos/compraModelo";
import pagamentoBoleto from "@/modelos/pagamento/pagamentoBoletoModelo";
import PagamentoCartaoCredito from "@/modelos/pagamento/pagamentoCartaoCreditoModelo";
import pagamentoPix from "@/modelos/pagamento/pagamentoPixModelo";

export abstract class IPagamentosRepositorio<Produto> {
  abstract comprarComCartaoCredito(dados:PagamentoCartaoCredito, produto:CompraModelo<Produto>): Promise<boolean>
  abstract comprarComPix(dados:pagamentoBoleto, produto:CompraModelo<Produto>): Promise<boolean>
  abstract comprarComBoleto(dados:pagamentoPix, produto:CompraModelo<Produto>): Promise<boolean>
}