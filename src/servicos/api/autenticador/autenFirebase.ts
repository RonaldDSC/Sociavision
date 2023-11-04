import { Auth, Persistence, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import CustomFirebaseApp from "../firebase/customFirebaseApp";

class AutenFirebase extends CustomFirebaseApp {
  autentificador: Auth

  constructor() {
    super()  
    this.autentificador = getAuth(this.app)
  }

  private async atualizaPersistencia(persistencia:Persistence) {
    await setPersistence(this.autentificador, persistencia)
  }

  loginComEmail = (credenciais: IEmailESenha) => {
    return signInWithEmailAndPassword(
      this.autentificador,
      credenciais.email,
      credenciais.senha
    )    
  }

  cadastroComEmail = async (credenciais: IEmailESenha) => {
    await this.atualizaPersistencia(browserLocalPersistence)
    return createUserWithEmailAndPassword(
      this.autentificador,
      credenciais.email,
      credenciais.senha
    )
  }

  sair = () => {
    return this.autentificador.signOut()
  }
      
}

export default AutenFirebase


export interface IEmailESenha {
  email:string
  senha:string
  
}