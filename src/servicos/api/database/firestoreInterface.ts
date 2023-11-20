import { Tabelas } from "@/constantes/TabelasNomes";
import { DocumentData, Firestore, QueryFieldFilterConstraint } from "firebase/firestore";

export default abstract class IFirestoreInterface {
  abstract db: Firestore

  abstract get(props:IGetDatabaseProps): Promise<DocumentData[]>

  abstract create(props:ICreateDatabaseProps): Promise<void>

  abstract update(props:IUpdateDatabaseProps): Promise<void>

  abstract delete(props:IDeleteDatabaseProps): Promise<void>
}

export interface IPossuiTabelas {
  tabela: Tabelas, 
  subTabela?: string
}


export interface IGetDatabaseProps extends IPossuiTabelas {
  where?: QueryFieldFilterConstraint
}

export interface ICreateDatabaseProps extends IPossuiTabelas {
  idValor?:string,
  valor: DocumentData,
}

export interface IUpdateDatabaseProps extends IPossuiTabelas {
  valor: DocumentData
}

export interface IDeleteDatabaseProps extends IPossuiTabelas {
  id: string
}