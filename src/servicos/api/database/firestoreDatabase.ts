import { CollectionReference, DocumentData, Firestore, Query, QueryFieldFilterConstraint, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import CustomFirebaseApp from "../firebase/customFirebaseApp";
import { Tabelas } from "@/constantes/TabelasNomes"


type TabelaReferencia = 
  CollectionReference<DocumentData, DocumentData> | 
  Query<DocumentData, DocumentData> 

class FirestoreDatabase extends CustomFirebaseApp {
  private db: Firestore

  constructor() {
    super()
    this.db = getFirestore(this.app)    
  }

  get = async (tabela: Tabelas, where?: QueryFieldFilterConstraint) => {

    let tabelaRef:TabelaReferencia = collection(this.db, tabela)

    if (where) {
      tabelaRef = query(tabelaRef,where)
    } 

    const querySnapshot = await getDocs(tabelaRef);
    const result = querySnapshot.docs


    return result
  }

  create = async (idValor:string,valor: DocumentData, tabela: Tabelas) => {
    console.log(idValor);
    
    await setDoc(doc(this.db, tabela, idValor), valor);
  }

  update = async (valor: DocumentData, tabela: Tabelas) => {
    await setDoc(doc(this.db, tabela), valor, {merge:true});    
  }

  delete = async (id: string, tabela: Tabelas) => {
    await deleteDoc(doc(this.db, tabela, id));
  }
      
}

export default FirestoreDatabase