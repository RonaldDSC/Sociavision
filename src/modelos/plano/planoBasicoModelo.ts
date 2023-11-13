import Plano, { ENomesPlanos, IInstagram, IPlano, IWhatsApp } from "./planoModelo";

class PlanoBasico extends Plano implements IPlanoBasico {
  readonly nome = ENomesPlanos.basico;
  
  readonly instagram: IInstagram = {
    posts:1,
    stories:3
  }
  
  readonly whatsApp:IWhatsApp = {
    mensagens:1
  }
  
  toJson():IPlanoBasico {
    return {
      nome:this.nome,
      instagram:this.instagram,
      whatsApp:this.whatsApp,
      dataExp:this.dataExp
    }
  };

}

export interface IPlanoBasico extends IPlano{
  readonly nome: ENomesPlanos.basico
  readonly instagram: IInstagram 
  readonly whatsApp:IWhatsApp
}

export default PlanoBasico
