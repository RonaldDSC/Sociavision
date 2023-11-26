import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'
import { ICampo } from "./ModalNumero"


interface TValidacao extends ICampo {}

const validarDados = (dados:ICampo) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    numero:yup.string().required().min(8).max(14),
    numeroPais:yup.string().required()
    .min(1,"Deve ter pelo menos 1 número no código do país")
    .max(3,"Deve ter no máximo 3 números no código do país"),
  })  

  return ValidationYup(validacao,dados)
}

export const validacao = {
  validarDados
}