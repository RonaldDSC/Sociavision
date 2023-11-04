interface Pessoa {
  id:string
  nome:string
  email:string
  timestamp: string
} 

export interface PessoaFisica extends Pessoa {
  cpf:number
  dataNasc: string 
  readonly tipoConta: "F"
}

export interface PessoaJuridica extends Pessoa {
  cnpj:number
  responsavelOrg: string 
  readonly tipoConta: "J"
}

export interface PessoaParceira extends Pessoa {
  cpf:number
  dataNasc: string 
  readonly tipoConta: "P"
}

export type TPessoa = PessoaFisica | PessoaJuridica | PessoaParceira