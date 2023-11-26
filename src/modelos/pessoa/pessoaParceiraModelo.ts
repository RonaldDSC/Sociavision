import Pessoa, { ETipoPessoa, IPessoa } from "./pessoaModelo"

export default class PessoaParceira extends Pessoa implements IPessoaParceira  {
  tipoConta: keyof typeof ETipoPessoa
  cpf: number
  dataNasc: string

  constructor(dados:IPessoaParceira) {
    super(dados)
    this.cpf = dados.cpf
    this.dataNasc = dados.dataNasc
    this.tipoConta = "parceira"
  }

  toJson(): Omit <PessoaParceira, "toJson"> {    
    return {
      cpf:this.cpf,
      dataNasc:this.dataNasc,
      email:this.email,
      id:this.id,
      nome:this.nome,
      timestamp:this.timestamp,
      tipoConta:this.tipoConta,
      numero:this.numero,
      numeroPais:this.numeroPais
    }
  }
  
}

export interface IPessoaParceira extends IPessoa {
  cpf:number
  dataNasc: string
}
