import { ETipoPessoa, TPessoas } from "@/modelos/pessoa/pessoaModelo";
import { IUsuarioRepositorio } from "./UsuarioInterface";
import PessoaFisica, { IPessoaFisica } from "@/modelos/pessoa/pessoaFisicaModelo";
import PessoaJuridica, { IPessoaJuridica } from "@/modelos/pessoa/pessoaJuridicaModelo";
import PessoaParceira, { IPessoaParceira } from "@/modelos/pessoa/pessoaParceiraModelo";
import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import { where } from "firebase/firestore";

export default class UsuarioRepositorio implements IUsuarioRepositorio {
  
  async pegarUsuario(id: string): Promise<TPessoas | null> {
    const {get} = new FirestoreDatabase()
    
    const resConsulta = await get({tabela:"usuarios",where: where("id","==",id)})
    
    const data = resConsulta[0]
    
    
    switch (data.tipoConta) {
      case ETipoPessoa.fisica:
        return new PessoaFisica(data as IPessoaFisica)

      case ETipoPessoa.juridica:
        return new PessoaJuridica(data as IPessoaJuridica)

      case ETipoPessoa.parceira:
        return new PessoaParceira(data as IPessoaParceira)
    }
    
    return null    
  }
  
  async atualizarUsuario(id: string,  dados:object): Promise<boolean> {
    const {update} = new FirestoreDatabase()

    if (Object.keys(dados).length !== 0) {
      await update({
        tabela:'usuarios',
        valor:dados,
        subTabela:id
      })

      return true     
    }

    return false
  }
}