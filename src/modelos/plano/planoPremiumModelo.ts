import Plano, { ENomesPlanos, IFacebook, IInstagram, IPlano, IWhatsApp } from "./planoModelo";

export default class PlanoPremium extends Plano implements IPlanoPremium {
  readonly identVisual = true;
  readonly nome = ENomesPlanos.premium
  preco: number = 219.90;

  readonly instagram: IInstagram = {
    stories:8,
    posts:2,
  }
  readonly whatsApp:IWhatsApp = {
    mensagens:3
  }

  readonly facebook: IFacebook = {
    posts: 2
  };

  toJson(): Omit<PlanoPremium, "toJson"> {
    return {
      dataExp:this.dataExp,
      facebook:this.facebook,
      instagram:this.instagram,
      nome:this.nome,
      preco:this.preco,
      whatsApp:this.whatsApp,
      identVisual:this.identVisual
    }
  }
}

interface IPlanoPremium extends IPlano {
  readonly nome: ENomesPlanos.premium
  readonly identVisual: boolean
  readonly instagram:IInstagram
  readonly whatsApp:IWhatsApp
  readonly facebook:IFacebook
}

