import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import AutenticacaoRepositorio from "../autenticacao/autenticacaoRepositorio";
import IComprasRepositorio from "./comprasInterface";
import CompraModelo from "@/modelos/compraModelo";
import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo";
import { ENomesPlanos, TPlanos } from "@/modelos/plano/planoModelo";

export default class ComprasRepositorio extends IComprasRepositorio {

  async comprarPlano(dadosPagamento: TPagamentos, novoPlano: TPlanos): Promise<boolean> {
    const {usuarioLogado} = new AutenticacaoRepositorio()

    const usuario = await usuarioLogado()    

    if (usuario) {      
      const { create } = new FirestoreDatabase()

      let { historico,plano }:ICompra = {
        plano:novoPlano.nome,
        historico:[
          {
            timestamp: new Date().toISOString(),
            moeda: "BRL",
            preco:novoPlano.preco,
            dadosPagamento:dadosPagamento.toJson(),
            produto:novoPlano.toJson()  
          }          
        ]
      }
      await Promise.all([
        create({
          tabela:"planos",
          valor:{plano,dadosPagamento:dadosPagamento.toJson()},
          subTabela:`${usuario.id}`
        }),      

        create({
          tabela:"planos",
          valor: historico[0],
          subTabela:`${usuario.id}/historico`
        }),
      ])
      
      return true         
    }

    return false
  } 
  
  async pegarDadosCompra(): Promise<ICompra | null> {
    const {usuarioLogado} = new AutenticacaoRepositorio()

    const usuario = await usuarioLogado()    

    if (usuario) {      
      const { get } = new FirestoreDatabase()

      const result = await get({
        tabela:"planos",
        subTabela:`${usuario.id}`
      })
      
      if (result[0]) {
        return {
          plano:result[0].data().plano,
          historico:result[0].data().historico
        } as ICompra
      }
      
    }

    return null
  } 

}

interface ICompra {
  plano: ENomesPlanos
  historico: CompraModelo<Omit<TPlanos, "toJson">>[]
}