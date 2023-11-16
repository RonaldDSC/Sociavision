import '@/globalStyle.css'
import './styles.css'
import { atualizaHrefs } from './atualizandoHrefs'
import { Pagamento } from './pagamento'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { ProcessarComprar } from './processaCompra'
import ComprasRepositorio from '@/repositorios/compras/comprasRepositorio'
import { TPagamentos } from '@/modelos/pagamento/pagamentoModelo'
import { TPlanos } from '@/modelos/plano/planoModelo'
import LoadingComponente from '@/componentes/loading/loadingComponente'
import PagamentoCartaoCredito from '@/modelos/pagamento/pagamentoCartaoCreditoModelo'
import PagamentoPix from '@/modelos/pagamento/pagamentoPixModelo'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import PagamentoBoleto, { IPagamentoBoleto } from '@/modelos/pagamento/pagamentoBoletoModelo'
import PessoaFisica from '@/modelos/pessoa/pessoaFisicaModelo'
import PessoaJuridica from '@/modelos/pessoa/pessoaJuridicaModelo'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'
import PagEfetuadoComponente from '@/componentes/pagEfetuado/pagEfetuadoComponente'
import { NavegacaoServico } from '@/servicos/navegacao/nav'

RotasServico.rotaProtegida()
atualizaHrefs()

const btnFinalizar = document.getElementById("finalizarCompra") as HTMLButtonElement | undefined
const opcoesPag = document.getElementById("opcoesPagamento")
const dados = document.getElementById("dados")
const radios = opcoesPag?.getElementsByTagName("input")
const item = ProcessarComprar.lerItens()

if (opcoesPag && dados) {
  verificarRadioInput()
  opcoesPag.addEventListener("change",verificarRadioInput)  
}

function verificarRadioInput ()  {  
  const inputSelecionado = Pagamento.verificarRadioSelecionado(radios)

  if (inputSelecionado) {
    Pagamento.exibirFormConformeInput(inputSelecionado)
  } 
}


const finalizarCompra = async () => {
  if (radios && item) {
    
    const inputSelecionado = Pagamento.verificarRadioSelecionado(radios)

    try {
      switch (inputSelecionado?.id) {
        case "cartao":
          return compraPorCartao(item)           
          
        case "pix":
          return compraPorPix(item)        
          
        case "boleto":
          return compraPorBoleto(item)
             
      }

    } catch (error) {
      console.log(error);
      
      AvisoComponente(
        document.body,
        "Ocorreu um erro",
        "Um erro inesperado aconteceu, tente novamente mais tarde"
      )      
    }

  }
}

const compraPorBoleto = async (item:TPlanos) => {
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const usuario = await usuarioLogado()        

  if (usuario && item) {
    const dados = <IPagamentoBoleto> {}

    if (usuario instanceof PessoaFisica) {
      dados.identificacao = usuario.cpf
      dados.nome = usuario.nome            
    }
    
    if (usuario instanceof PessoaJuridica) {
      dados.identificacao = usuario.cnpj
      dados.nome = usuario.nome            
    }

    return registrarCompra(new PagamentoBoleto(dados),item)
  }
}

const compraPorPix = async (item:TPlanos) => {
  const pix = ProcessarComprar.lerInputPix()
  const errosPix = ProcessarComprar.validarPix(pix)

  if (!errosPix)
    return registrarCompra(new PagamentoPix(pix),item)        
}

const compraPorCartao = async (item:TPlanos) => {
  const cartao = ProcessarComprar.lerInputCartao()
  const errosCartao = ProcessarComprar.validarCartao(cartao)

  if (!errosCartao)
    return registrarCompra(new PagamentoCartaoCredito(cartao),item)       
}

const registrarCompra = (dados:TPagamentos,plano:TPlanos) => {  
  const {comprarPlano} = new ComprasRepositorio()
  return comprarPlano(dados,plano)
}

btnFinalizar?.addEventListener("click",async () => {
  btnFinalizar.disabled = true
  const loading = LoadingComponente(document.body)
  const efetuado = await finalizarCompra()
  loading.esconder()
  btnFinalizar.disabled = false

  if (efetuado) {
    PagEfetuadoComponente(document.body, () => {
      NavegacaoServico.replace("/")
    }) 
  }
})


