import Plano, { ENomesPlanos, IInstagram, IPlano, IWhatsApp } from "./planoModelo";

class PlanoBasico extends Plano implements IPlanoBasico {
  preco: number = 79.90;
  readonly nome = ENomesPlanos.basico;
  
  readonly instagram: IInstagram = {
    posts:1,
    stories:3
  }
  
  readonly whatsApp:IWhatsApp = {
    mensagens:1
  }
  
  toJson():Omit<PlanoBasico, "toJson"> {
    return {
      nome:this.nome,
      instagram:this.instagram,
      whatsApp:this.whatsApp,
      dataExp:this.dataExp,
      preco:this.preco
    }
  };

}

export interface IPlanoBasico extends IPlano{
  readonly nome: ENomesPlanos.basico
  readonly instagram: IInstagram 
  readonly whatsApp:IWhatsApp
}

export default PlanoBasico
