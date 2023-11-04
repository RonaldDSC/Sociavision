interface Pessoa {
  id:string
  nome:string
  email:string
  senha:string
  data: string
} 

export interface pessoaFisica extends Pessoa {
  cpf:number
  dataNasc: string  
}

export interface pessoaJuridica extends Pessoa {
  cnpj:number
  responsavelOrg: string 
}

export interface pessoaParceira extends Pessoa {
  cpf:number
  dataNasc: string 
}

export type TPessoa = pessoaFisica | pessoaJuridica | pessoaParceira