import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import AutenticacaoRepositorio from "../autenticacao/autenticacaoRepositorio";
import IComprasRepositorio from "./comprasInterface";
import CompraModelo from "@/modelos/compraModelo";
import { TPagamentos } from "@/modelos/pagamento/pagamentoModelo";

export default class ComprasRepositorio extends IComprasRepositorio {

  async realizarCompra<Produto>(dadosPagamento: TPagamentos, produto: Produto): Promise<boolean> {
    const {usuarioLogado} = new AutenticacaoRepositorio()

    const usuario = await usuarioLogado()  
    

    if (usuario) {
      const db = new FirestoreDatabase()

      let novaCompra:CompraModelo<Produto> = {
        timestamp: new Date().toISOString(),
        metodoPagamento:dadosPagamento.metodo,
        preco:2121212,
        moeda: "BRL",
        produto    
      }

      db.create({
        tabela:"compras",
        valor:novaCompra,
        subTabela:`${usuario.id}/compras`
      })

      novaCompra = {
        timestamp: new Date().toISOString(),
        metodoPagamento:dadosPagamento.metodo,
        preco:1111111111111111,
        moeda: "BRL",
        produto    
      }

      db.update({
        tabela:"usuarios",        
        valor:novaCompra,
        subTabela:"compras/" + usuario.id
      })            
    }

    return false
  }

  

}