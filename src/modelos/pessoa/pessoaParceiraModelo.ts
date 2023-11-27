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
    const json: Omit <PessoaParceira, "toJson"> = {
      cpf:this.cpf,
      dataNasc:this.dataNasc,
      email:this.email,
      id:this.id,
      nome:this.nome,
      timestamp:this.timestamp,
      tipoConta:this.tipoConta,
    }

    if (this.numero) {
      json.numero = this.numero      
    }
    
    if (this.numeroPais) {
      json.numeroPais = this.numeroPais      
    }

    return json
  }
  
}

export interface IPessoaParceira extends IPessoa {
  cpf:number
  dataNasc: string
}
