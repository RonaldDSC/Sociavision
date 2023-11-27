import {IPessoaParceira} from "@/modelos/pessoa/pessoaParceiraModelo"
import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'

interface TValidacao extends Omit<IPessoaParceira,"id" | "timestamp" |  "numero" | "numeroPais"> {
  senha:string
}

const validarDados = (dados:IPessoaParceira, senha:string) => {
  const validacao:yup.ObjectSchema<TValidacao> = yup.object().shape({
    nome:yup.string().required(),
    email:yup.string().required().email(),
    cpf:yup.number().required().test('len',"Deve ser no máximo 11", val=> String(val).length > 6),
    dataNasc: yup.string().required(),
    senha:yup.string().required().min(8)
  })
  
  return ValidationYup(validacao,{...dados,senha})
}

export const validacao = {
  validarDados
}