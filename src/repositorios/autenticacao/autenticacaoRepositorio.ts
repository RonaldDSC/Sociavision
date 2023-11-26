import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import { where } from "firebase/firestore";
import { IAutenticacaoRepositorio } from "./autenticacaoInterface";
import AutenticadorFirebase, { IEmailESenha } from "@/servicos/api/autenticador/autenticadorFirebase";
import { ETipoPessoa, TPessoas } from "@/modelos/pessoa/pessoaModelo";
import PessoaFisica, { IPessoaFisica } from "@/modelos/pessoa/pessoaFisicaModelo";
import PessoaJuridica, { IPessoaJuridica } from "@/modelos/pessoa/pessoaJuridicaModelo";
import PessoaParceira, { IPessoaParceira } from "@/modelos/pessoa/pessoaParceiraModelo";

class AutenticacaoRepositorio implements IAutenticacaoRepositorio<IEmailESenha,TPessoas> {
  async usuarioLogado(): Promise<TPessoas  | null> {
    const {autentificador} = new AutenticadorFirebase()
    const {get} = new FirestoreDatabase()

    await autentificador.authStateReady()

    if(autentificador.currentUser){
      const resConsulta = await get({
        tabela:"usuarios",
        where:where("id","==",autentificador.currentUser.uid)
      })
      const data = resConsulta[0]
      
      switch (data.tipoConta) {
        case ETipoPessoa.fisica:
          return new PessoaFisica(data as IPessoaFisica)

        case ETipoPessoa.juridica:
          return new PessoaJuridica(data as IPessoaJuridica)

        case ETipoPessoa.parceira:
          return new PessoaParceira(data as IPessoaParceira)
      }
    }
    
    return null
  }

  async login(credenciais: IEmailESenha): Promise<TPessoas> {
    const {loginComEmail} = new AutenticadorFirebase()
    const {get} = new FirestoreDatabase()

    const {user} = await loginComEmail(credenciais)    
    
    const resConsulta = await get({
      tabela:"usuarios",
      where:where("id","==",user.uid)
    })

    return resConsulta[0] as TPessoas
  }

  async cadastrar(credenciais: IEmailESenha, usuario:TPessoas): Promise<TPessoas> {
    
    const {cadastroComEmail} = new AutenticadorFirebase()    
    const {user} = await cadastroComEmail(credenciais)
    usuario.id = user.uid
    
    const novoUsuario = usuario.toJson()
    
    const {create} = new FirestoreDatabase()

    await create({
      tabela:"usuarios",
      valor:{
        ...novoUsuario,
        data: new Date().toISOString()
      },
      subTabela:novoUsuario.id
    })

    return usuario
  }

  sair(): Promise<void> {
    const {sair} = new AutenticadorFirebase()
    return sair()    
  }
  
}

export default AutenticacaoRepositorio
