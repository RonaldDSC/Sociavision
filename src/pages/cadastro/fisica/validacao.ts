import { IPessoaFisica } from "@/modelos/pessoa/pessoaFisicaModelo"
import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'

interface TValidacao extends Omit<IPessoaFisica,"id" | "timestamp"> {
  senha:string
}

const validarDados = (dados:IPessoaFisica, senha:string) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    nome:yup.string().required(),
    email:yup.string().required().email(),
    cpf:yup.number().required().test('len',"Deve ser no máximo 11", val=> String(val).length === 11),
    dataNasc: yup.string().required(),
    senha:yup.string().required().min(8)
  })  

  return ValidationYup(validacao,{...dados,senha})
}

export const validacao = {
  validarDados
}