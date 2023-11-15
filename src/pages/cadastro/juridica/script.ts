import '@/globalStyle.css'
import './styles.css'
import { atualizaHrefs } from './atualizandoHrefs'
import { ProcessaCadastro } from './ProcessaCadastro'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'
import LoadingComponente from '@/componentes/loading/loadingComponente'
import PessoaJuridica from '@/modelos/pessoa/pessoaJuridicaModelo'
import { RotasServico } from '@/servicos/navegacao/rotas'

RotasServico.rotaProtegida()
atualizaHrefs()

const btn = document.getElementsByClassName("enviar-btn")[0] as HTMLButtonElement

const cadastrar = async () => {
  btn.disabled = true
  const carregando = LoadingComponente(document.body)

  const {dados,senha} = ProcessaCadastro.lerInputs()
  
  dados.timestamp = new Date().toISOString()

  const possuiErros = ProcessaCadastro.validarCampos(dados,senha)

  if (!possuiErros) {    
    const {cadastrar} = new AutenticacaoRepositorio()
    
    await cadastrar({email:dados.email,senha:senha},new PessoaJuridica(dados))
    .catch(error => {
      AvisoComponente(document.body,"Ocorreu um erro",error.message)
    })    
  }

  carregando.esconder()
  btn.disabled = false
}

btn.addEventListener("click",cadastrar);