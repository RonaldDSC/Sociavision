import  PessoaFisica  from "./pessoaFisicaModelo"
import  PessoaParceira  from "./pessoaParceiraModelo"
import  PessoaJuridica  from "./pessoaJuridicaModelo"

export default abstract class Pessoa implements IPessoa {
  id: string
  nome: string
  email: string
  numero?:number
  numeroPais?:number
  timestamp: string
  abstract tipoConta: keyof typeof ETipoPessoa

  constructor(dados:IPessoa) {
    this.email = dados.email
    this.nome = dados.nome
    this.id = dados.id
    this.timestamp = dados.timestamp
    this.numero = dados.numero
    this.numeroPais = dados.numeroPais
  }

  abstract toJson(): Omit<TPessoas, "toJson">
}

export interface IPessoa {
  id:string
  nome:string
  email:string
  numero?:number
  numeroPais?:number
  timestamp: string
}

export type TPessoas = PessoaFisica | PessoaJuridica | PessoaParceira

export enum ETipoPessoa { fisica = "fisica" , juridica = "juridica" , parceira = "parceira" }
