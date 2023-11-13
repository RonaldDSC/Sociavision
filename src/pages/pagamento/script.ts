import '@/servicos/navegacao/navegacao'
import '@/globalStyle.css'
import './styles.css'
import { atualizaHrefs } from './atualizandoHrefs'
import { Pagamento } from './pagamento'
import { Detalhe } from './detalhe'

atualizaHrefs()

const opcoesPag = document.getElementById("opcoesPagamento")
const dados = document.getElementById("dados")

if (opcoesPag && dados) {  
  const radios = opcoesPag.getElementsByTagName("input")

  Pagamento.verificarRadioSelecionado(
    radios,(inputSelecionado => Pagamento.exibirFormConformeInput(inputSelecionado))
  )

  opcoesPag.addEventListener("change",() => {
    Pagamento.verificarRadioSelecionado(
      radios,(inputSelecionado => Pagamento.exibirFormConformeInput(inputSelecionado))
    ) 
  })
  
}

const lista = document.getElementsByClassName("listaCompra")[0]

Detalhe.adicionarItem(lista,"plano","BRL",12.23)
Detalhe.adicionarItem(lista,"plano","BRL",12.23)
Detalhe.calcularTotal([12.23,12.23],"BRL")