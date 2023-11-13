import { IEmailESenha } from "@/servicos/api/autenticador/autenticadorFirebase";
import { ValidationYup } from "@/servicos/validation/yupValidation";
import * as yup from 'yup'

interface TValidacao extends IEmailESenha {}

const validarEmailESenha = (credenciais:IEmailESenha) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    email:yup.string().required().email(),
    senha: yup.string().required().min(8)
  })
  
  return ValidationYup(validacao,credenciais)
}

export const validacao = {
  validarEmailESenha
}
