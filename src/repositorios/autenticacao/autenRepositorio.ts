import { TPessoa } from "@/modelos/pessoaModelo";
import FirestoreDatabase from "@/servicos/api/database/firestoreDatabase";
import { Timestamp, where } from "firebase/firestore";
import { IAutenRepositorio } from "./autenInterface";
import AutenFirebase, { IEmailESenha } from "@/servicos/api/autenticador/autenFirebase";

class AutenRepositorio implements IAutenRepositorio<IEmailESenha,TPessoa> {

  async login(credenciais: IEmailESenha): Promise<TPessoa> {
    const {loginComEmail} = new AutenFirebase()
    const {get} = new FirestoreDatabase()

    const {user} = await loginComEmail(credenciais)    
    
    const resConsulta = await get("usuarios",where("id","==",user.uid))

    return resConsulta[0].data() as TPessoa
  }

  async cadastrar(credenciais: IEmailESenha, usuario:TPessoa): Promise<TPessoa> {
    
    const {cadastroComEmail} = new AutenFirebase()    
    const {user} = await cadastroComEmail(credenciais)
    usuario.id = user.uid    
    
    const {create} = new FirestoreDatabase()

    await create(usuario.id, {
      ...usuario,
      data: Timestamp.fromDate(new Date())
    } , "usuarios")

    return usuario
  }

  sair(): Promise<void> {
    const {sair} = new AutenFirebase()
    return sair()    
  }
  
}

export default AutenRepositorio
