import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
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
        result = [querySnapshot]
        
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
    const {tabela, valor, subTabela} = props
    await setDoc(doc(this.db, tabela, subTabela || ""), valor, {merge:true});    
  }

  delete = async (props: IDeleteDatabaseProps): Promise<void> => {
    const {id,tabela} = props
    await deleteDoc(doc(this.db, tabela, id));
  } 
}

export default FirestoreDatabase