import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo";

export default abstract class IComprasRepositorio {
  abstract realizarCompra<Produto> (dadosPagamento:TPagamentos ,produto:Produto): Promise<boolean>
}