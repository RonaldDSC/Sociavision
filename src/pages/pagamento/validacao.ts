import { IPagamentoCartaoCredito } from "@/modelos/pagamento/pagamentoCartaoCreditoModelo"
import { IPagamentoPix } from "@/modelos/pagamento/pagamentoPixModelo"
import { ValidationYup } from "@/servicos/validation/yupValidation"
import * as yup from 'yup'

interface TValidacaoCartao extends IPagamentoCartaoCredito {}

const validarCartao = (dados:IPagamentoCartaoCredito) => {
  console.log(dados);
  
  const validacao:yup.ObjectSchema<TValidacaoCartao> = yup.object().shape({
    numero:yup.number().required()
      .test(
        'len',"Deve ser entre 13 e 16 números", 
        val => String(val).length <= 13 || String(val).length >= 16
      ),
    titular:yup.string().required()
      .test('len',"Este campo é obrigatório", val => val.trim().length  !== 0
    ),
    dataExp:yup.string().required().min(4).max(5),
    cvv:yup.number().required().test('len',"Deve ter 3 números", val => String(val).length == 3)   
  })  

  return ValidationYup(validacao,dados)
}

interface TValidacaoPix extends IPagamentoPix {}

const validarPix = (dados:IPagamentoPix) => {
  const validacao:yup.ObjectSchema<TValidacaoPix> = yup.object().shape({
    chave:yup.string().required().min(5)   
  })  

  return ValidationYup(validacao,dados)
}

export const Validacao = {
  validarCartao,
  validarPix
}