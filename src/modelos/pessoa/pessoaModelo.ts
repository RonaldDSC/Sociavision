import  PessoaFisica  from "./pessoaFisicaModelo"
import  PessoaParceira  from "./pessoaParceiraModelo"
import  PessoaJuridica  from "./pessoaJuridicaModelo"

export default interface Pessoa {
  id:string
  nome:string
  email:string
  timestamp: string
}

export type TPessoas = PessoaFisica | PessoaJuridica | PessoaParceira

export enum ETipoPessoa { fisica = "Física" , juridica = "Jurídica" , parceira = "Parceira" }
