
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
    let json:Omit <PessoaFisica, "toJson"> = {
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


export interface IPessoaFisica extends IPessoa {
  cpf:number
  dataNasc: string
}
