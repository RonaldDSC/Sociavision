import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'
import { ProcessarTarefa } from './ProcessarTarefa'
import { Tarefa } from './Tarefa'
import { Dados } from './Dados'
import LoadingComponente from '@/componentes/loading/loadingComponente'

RotasServico.rotaProtegida()
atualizaHrefs()

const loading = LoadingComponente(document.body)
init().finally(() => {
  loading.esconder()
})

async function init() {
  await UsuarioNavBarComponente()
  
  await Tarefa.verificarTarefaPendente()
  
  await Dados.recuperarDados() 
  
  document.getElementsByClassName("btn-enviar")[0].addEventListener("click",async () => {
    const dados = ProcessarTarefa.lerInputs()
    const erros = ProcessarTarefa.validarCampos(dados)  
  
    if (!erros) {
      await ProcessarTarefa.enviar(dados)
      await Tarefa.verificarTarefaPendente() 
    }
  })  
}


