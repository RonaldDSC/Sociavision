import { addDays } from "date-fns"
import PlanoBasico from "./planoBasicoModelo"
import PlanoIntermediario from "./planoIntermediarioModelo"
import PlanoPremium from "./planoPremiumModelo"

export default class Plano implements IPlano {
  dataExp:string

  constructor (dataExp?:string) {
    this.dataExp = dataExp || addDays(new Date() ,30).toISOString()
  }
}

export interface IPlano {
  dataExp:string
}

export type TPlanos = PlanoBasico | PlanoIntermediario | PlanoPremium

export enum ENomesPlanos { basico = "Básico" , intermediario = "Intermediário" , premium = "Premium" }

export interface IInstagram {
  readonly stories: number
  readonly posts:number
}

export interface IWhatsApp {
  readonly mensagens:number
}

export interface IFacebook {
  readonly posts:number
}
