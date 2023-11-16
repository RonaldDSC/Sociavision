import Plano, { ENomesPlanos, IFacebook, IInstagram, IPlano, IWhatsApp } from "./planoModelo";

export default class PlanoIntermediario extends Plano implements IPlanoIntermediario {
  readonly nome = ENomesPlanos.intermediario
  preco: number = 119.90;

  readonly instagram: IInstagram = {
    stories:5,
    posts:2,
  }

  readonly whatsApp:IWhatsApp = {
    mensagens:2
  }

  readonly facebook: IFacebook = {
    posts: 1
  };

  toJson(): Omit<PlanoIntermediario, "toJson"> {
    return {
      dataExp:this.dataExp,
      facebook:this.facebook,
      instagram:this.instagram,
      nome:this.nome,
      preco:this.preco,
      whatsApp:this.whatsApp
    }
  }
}

interface IPlanoIntermediario extends IPlano {
  readonly nome: ENomesPlanos.intermediario
  readonly instagram:IInstagram
  readonly whatsApp:IWhatsApp
  readonly facebook:IFacebook
}

