export abstract class IAutenRepositorio<Credencial,TipoUsuario> {
  abstract login (credenciais:Credencial):Promise<TipoUsuario>
  abstract cadastrar(credenciais:Credencial , usuario:TipoUsuario): Promise<TipoUsuario>
  abstract sair() :Promise<void>
}
