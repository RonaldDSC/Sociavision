import { Auth, Persistence, browserLocalPersistence,  createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword} from "firebase/auth";
import CustomFirebaseApp from "../firebase/customFirebaseApp"
import traducaoErros from "./traducaoErros";

class AutenticadorFirebase extends CustomFirebaseApp {
  autentificador: Auth

  constructor() {
    super()  
    this.autentificador = getAuth(this.app)
  }

  private async atualizaPersistencia(persistencia:Persistence) {
    await setPersistence(this.autentificador, persistencia)
  }

  loginComEmail = async (credenciais: IEmailESenha) => {
    try {      
      return await signInWithEmailAndPassword(
        this.autentificador,
        credenciais.email,
        credenciais.senha
      )
    } catch  (e:any) {
      const motivo = traducaoErros[e.code as string] || "Ocorreu um erro inesperado ao fazer login, tente novamente mais tarde"
      throw new Error(motivo)    
    }
  }

  cadastroComEmail = async (credenciais: IEmailESenha) => {
    try {
      await this.atualizaPersistencia(browserLocalPersistence)
      return await createUserWithEmailAndPassword(
        this.autentificador,
        credenciais.email,
        credenciais.senha
      )      
    } catch (e:any) {
      const motivo = traducaoErros[e.code as string] || "Ocorreu um erro inesperado ao criar a conta, tente novamente mais tarde"
      throw new Error(motivo)
    }
  }

  sair = () => {
    return this.autentificador.signOut()
  }      
}

export default AutenticadorFirebase


export interface IEmailESenha {
  email:string
  senha:string
  
}