import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo";
import { TPlanos } from "@/modelos/plano/planoModelo";

export default abstract class IComprasRepositorio {
  abstract comprarPlano (dadosPagamento:TPagamentos ,plano:TPlanos): Promise<boolean>
}