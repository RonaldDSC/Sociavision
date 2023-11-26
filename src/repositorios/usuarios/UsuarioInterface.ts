import { TPessoas } from "@/modelos/pessoa/pessoaModelo";

export abstract class IUsuarioRepositorio {
  abstract pegarUsuario(id:string): Promise<TPessoas | null>
  abstract atualizarUsuario(id:string, dados:object): Promise<boolean>
} 