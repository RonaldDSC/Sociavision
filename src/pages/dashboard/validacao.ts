import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'
import { IDadosTarefa } from "./ProcessarTarefa"


interface TValidacao extends IDadosTarefa {}

const validarDados = (dados:IDadosTarefa) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    numero:yup.string().required().min(8).max(14),
    numeroPais:yup.string().required()
    .min(1,"Deve ter pelo menos 1 número no código do país")
    .max(3,"Deve ter no máximo 3 números no código do país"),
    resumo:yup.string().required(),
  })  

  return ValidationYup(validacao,dados)
}

export const validacao = {
  validarDados
}