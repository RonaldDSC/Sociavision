import Pessoa, { ETipoPessoa, IPessoa } from "./pessoaModelo"

export default class PessoaFisica extends Pessoa implements IPessoaFisica  {
  tipoConta: keyof typeof ETipoPessoa
  cpf: number
  dataNasc: string

  constructor(dados:IPessoaFisica) {
    super(dados)
    this.cpf = dados.cpf
    this.dataNasc = dados.dataNasc
    this.tipoConta = "fisica"
  } 
  
  toJson(): Omit <PessoaFisica, "toJson"> {    
    return {
      cpf:this.cpf,
      dataNasc:this.dataNasc,
      email:this.email,
      id:this.id,
      nome:this.nome,
      timestamp:this.timestamp,
      tipoConta:this.tipoConta
    }
  }
}


export interface IPessoaFisica extends IPessoa {
  cpf:number
  dataNasc: string
}
