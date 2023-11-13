import Pessoa, { ETipoPessoa } from "./pessoaModelo"

export default interface PessoaJuridica extends Pessoa {
  cnpj:number
  nomeOrg: string
  readonly tipoConta: ETipoPessoa.juridica
}