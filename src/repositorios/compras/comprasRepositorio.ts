import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import AutenticacaoRepositorio from "../autenticacao/autenticacaoRepositorio";
import IComprasRepositorio from "./comprasInterface";
import CompraModelo from "@/modelos/compraModelo";
import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo";
import { ENomesPlanos, TPlanos } from "@/modelos/plano/planoModelo";
import UsuarioRepositorio from "../usuarios/UsuarioRepositorio";
import { TPessoas } from "@/modelos/pessoa/pessoaModelo";

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
          valor:{plano},
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
  
  async pegarDadosCompra(idUsuario?:string): Promise<ICompra | null> {
    let usuario:TPessoas | null = null

    if (idUsuario) {
      const {pegarUsuario} = new UsuarioRepositorio()
      usuario = await pegarUsuario(idUsuario)   

    } else {
      const {usuarioLogado} = new AutenticacaoRepositorio()  
      usuario = await usuarioLogado()

    }
    
    if (usuario) {      
      const { get } = new FirestoreDatabase()

      const result = await get({
        tabela:"planos",
        subTabela:`${usuario.id}`
      }) 
      
      const historico = await get({
        tabela:"planos",
        subTabela:`${usuario.id}/historico`
      }) 
      
      
      if (result[0] && historico) {
        return {
          plano:result[0].plano,
          historico
        } as ICompra
      }
      
    }

    return null
  } 

}

export interface ICompra {
  plano: ENomesPlanos
  historico: CompraModelo<Omit<TPlanos, "toJson">>[]
}