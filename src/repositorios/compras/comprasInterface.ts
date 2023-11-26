import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo";
import { TPlanos } from "@/modelos/plano/planoModelo";
import { ICompra } from "./comprasRepositorio";

export default abstract class IComprasRepositorio {
  abstract comprarPlano (dadosPagamento:TPagamentos ,plano:TPlanos): Promise<boolean>
  abstract pegarDadosCompra(idUsuario?:string): Promise<ICompra | null>
}