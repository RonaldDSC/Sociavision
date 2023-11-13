import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import { Timestamp, where } from "firebase/firestore";
import { IAutenticacaoRepositorio } from "./autenticacaoInterface";
import AutenticadorFirebase, { IEmailESenha } from "@/servicos/api/autenticador/autenticadorFirebase";
import { TPessoas } from "@/modelos/pessoa/pessoaModelo";

class AutenticacaoRepositorio implements IAutenticacaoRepositorio<IEmailESenha,TPessoas> {
  async usuarioLogado(): Promise<TPessoas  | null> {
    const {autentificador} = new AutenticadorFirebase()
    const {get} = new FirestoreDatabase()

    if(autentificador.currentUser){
      const resConsulta = await get({
        tabela:"usuarios",
        where:where("id","==",autentificador.currentUser.uid)
      })
      const data = resConsulta[0].data() 
      return data as TPessoas
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

    return resConsulta[0].data() as TPessoas
  }

  async cadastrar(credenciais: IEmailESenha, usuario:TPessoas): Promise<TPessoas> {
    
    const {cadastroComEmail} = new AutenticadorFirebase()    
    const {user} = await cadastroComEmail(credenciais)

    usuario.id = user.uid
    
    const {create} = new FirestoreDatabase()

    await create({
      tabela:"usuarios",
      valor:{
        ...usuario,
        data: Timestamp.fromDate(new Date())
      },
      idValor:usuario.id
    })

    return usuario
  }

  sair(): Promise<void> {
    const {sair} = new AutenticadorFirebase()
    return sair()    
  }
  
}

export default AutenticacaoRepositorio
