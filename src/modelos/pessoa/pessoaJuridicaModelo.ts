import Pessoa, { ETipoPessoa, IPessoa} from "./pessoaModelo"

export default class PessoaJuridica extends Pessoa implements IPessoaJuridica  {
  tipoConta: keyof typeof ETipoPessoa
  cnpj: number
  nomeOrg: string

  constructor(dados:IPessoaJuridica) {
    super(dados)
    this.cnpj = dados.cnpj
    this.nomeOrg = dados.nomeOrg
    this.tipoConta = "juridica"
  }  

  toJson(): Omit <PessoaJuridica, "toJson"> {    
    const json: Omit <PessoaJuridica, "toJson"> = {
      cnpj:this.cnpj,
      nomeOrg:this.nomeOrg,
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


export interface IPessoaJuridica extends IPessoa {
  cnpj:number
  nomeOrg: string
}