import Pessoa, { ETipoPessoa } from "./pessoaModelo"

export default interface PessoaParceira extends Pessoa {
  cpf:number
  dataNasc: string
  readonly tipoConta: ETipoPessoa.parceira
}