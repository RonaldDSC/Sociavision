import {IPessoaJuridica} from "@/modelos/pessoa/pessoaJuridicaModelo"
import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'

interface TValidacao extends Omit<IPessoaJuridica,"id" | "timestamp" | "numero" | "numeroPais"> {
  senha:string
}

const validarDados = (dados:IPessoaJuridica, senha:string) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    nome:yup.string().required(),
    email:yup.string().required().email(),
    cnpj:yup.number().required().test('len',"CNPJ deve conter 14 dígitos", val=> String(val).length < 6),
    nomeOrg: yup.string().required(),
    senha:yup.string().required().min(8)
  })
  
  return ValidationYup(validacao,{...dados,senha})
}

export const validacao = {
  validarDados
}