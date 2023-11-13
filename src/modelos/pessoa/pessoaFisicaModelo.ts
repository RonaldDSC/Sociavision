import Pessoa, { ETipoPessoa } from "./pessoaModelo"

export default interface PessoaFisica extends Pessoa {
  cpf:number
  dataNasc: string
  readonly tipoConta: ETipoPessoa.fisica
}
