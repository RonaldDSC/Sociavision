import {IPessoaJuridica} from "@/modelos/pessoa/pessoaJuridicaModelo"
import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'

interface TValidacao extends Omit<IPessoaJuridica,"id" | "timestamp"> {
  senha:string
}

const validarDados = (dados:IPessoaJuridica, senha:string) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    nome:yup.string().required(),
    email:yup.string().required().email(),
    cnpj:yup.number().required().min(14).max(14),
    nomeOrg: yup.string().required(),
    senha:yup.string().required().min(8)
  })
  
  return ValidationYup(validacao,{...dados,senha})
}

export const validacao = {
  validarDados
}