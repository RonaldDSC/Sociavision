import Plano, { ENomesPlanos, IFacebook, IInstagram, IPlano, IWhatsApp } from "./planoModelo";

export default class PlanoPremium extends Plano implements IPlanoPremium {
  readonly identVisual = true;
  readonly nome = ENomesPlanos.premium

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
}

interface IPlanoPremium extends IPlano {
  readonly nome: ENomesPlanos.premium
  readonly identVisual: boolean
  readonly instagram:IInstagram
  readonly whatsApp:IWhatsApp
  readonly facebook:IFacebook
}

