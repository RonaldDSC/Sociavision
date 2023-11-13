import Plano, { ENomesPlanos, IFacebook, IInstagram, IPlano, IWhatsApp } from "./planoModelo";

export default class PlanoIntermediario extends Plano implements IPlanoIntermediario {
  readonly nome = ENomesPlanos.intermediario

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
}

interface IPlanoIntermediario extends IPlano {
  readonly nome: ENomesPlanos.intermediario
  readonly instagram:IInstagram
  readonly whatsApp:IWhatsApp
  readonly facebook:IFacebook
}

