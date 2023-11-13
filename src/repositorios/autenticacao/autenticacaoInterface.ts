export abstract class IAutenticacaoRepositorio<Credencial,TipoUsuario> {
  abstract usuarioLogado ():Promise<TipoUsuario | null>
  abstract login (credenciais:Credencial):Promise<TipoUsuario>
  abstract cadastrar(credenciais:Credencial , usuario:TipoUsuario): Promise<TipoUsuario>
  abstract sair() :Promise<void>
}
