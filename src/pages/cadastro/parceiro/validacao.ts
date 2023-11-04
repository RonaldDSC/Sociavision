import { PessoaParceira } from "@/modelos/pessoaModelo"
import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'



interface TValidacao extends Omit<PessoaParceira,"id" | "tipoConta" | "timestamp"> {
  senha:string
}

const validarDados = (dados:PessoaParceira, senha:string) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    nome:yup.string().required(),
    email:yup.string().required().email(),
    cpf:yup.number().required().min(8).max(8),
    dataNasc: yup.string().required(),
    senha:yup.string().required().min(8)
  })
  
  return ValidationYup(validacao,{...dados,senha})
}

export const validacao = {
  validarDados
}