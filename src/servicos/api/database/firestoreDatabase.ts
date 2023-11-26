import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc } from "firebase/firestore";
import CustomFirebaseApp from "../firebase/customFirebaseApp";
import IFirestoreInterface, { ICreateDatabaseProps, IDeleteDatabaseProps, IGetDatabaseProps, IUpdateDatabaseProps } from "./firestoreInterface";

class FirestoreDatabase extends CustomFirebaseApp implements IFirestoreInterface {
  db: Firestore;

  constructor() {
    super()
    this.db = getFirestore(this.app)
  }
  
  get = async (props: IGetDatabaseProps): Promise<DocumentData[]> => {
    const {tabela,subTabela,where} = props
    let result:DocumentData[] = []

    if (subTabela) {
      const contadorBarras = (subTabela.match(/\//g) || []).length

      if(contadorBarras % 2 === 0) {
        const ref = doc(this.db, tabela, subTabela)
        const querySnapshot = await getDoc(ref);
        const data = querySnapshot.data()
        if (data) {          
          result = [data]         
        }
        
      } else {
        const ref = collection(this.db, tabela, subTabela)
        const querySnapshot = await getDocs(where ? query(ref,where) : ref);
        result = querySnapshot.docs.map(result => result.data())
      }
    } else {
      const ref = collection(this.db, tabela)    
      const querySnapshot = await getDocs(where ? query(ref,where) : ref);
      result = querySnapshot.docs.map(result => result.data())
    }   

    return result
  }

  create = async (props: ICreateDatabaseProps): Promise<void> => {
    const {tabela,valor,subTabela} = props 
    
    if (subTabela) {
      const contadorBarras = (subTabela.match(/\//g) || []).length

      if(contadorBarras % 2 === 0) {
        const ref = doc(this.db, tabela, subTabela)    
        await setDoc(ref, valor);

      } else {
        const ref = collection(this.db, tabela, subTabela)
        await addDoc(ref, valor);
        
      }
    } else {
      const ref = collection(this.db, tabela)    
      await addDoc(ref, valor);
    }
  }

  update = async (props: IUpdateDatabaseProps): Promise<void> => {
    const {tabela,subTabela,valor} = props 
    
    if (subTabela) {
      const contadorBarras = (subTabela.match(/\//g) || []).length

      if(contadorBarras % 2 === 0) {
        const ref = doc(this.db, tabela, subTabela)    
        await updateDoc(ref,valor);

      } else {
        throw new Error("Não é permitido excluir coleções")        
      }
    } else {
      const ref = doc(this.db, tabela)    
      await updateDoc(ref,valor);
    }    
  }

  remove = async (props: IDeleteDatabaseProps): Promise<void> => {
    const {tabela,subTabela} = props 
    
    if (subTabela) {
      const contadorBarras = (subTabela.match(/\//g) || []).length

      if(contadorBarras % 2 === 0) {
        const ref = doc(this.db, tabela, subTabela)    
        await deleteDoc(ref);

      } else {
        throw new Error("Não é permitido excluir coleções")        
      }
    } else {
      const ref = doc(this.db, tabela)    
      await deleteDoc(ref);
    }
  } 
}

export default FirestoreDatabase