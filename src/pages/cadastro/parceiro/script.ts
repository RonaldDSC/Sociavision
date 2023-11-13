import '@/globalStyle.css'
import './styles.css'
import '@/servicos/navegacao/navegacao'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import { atualizaHrefs } from './atualizandoHrefs'
import { ProcessaCadastro } from './ProcessaCadastro'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'

atualizaHrefs()

const btn = document.getElementsByClassName("enviar-btn")[0] as HTMLButtonElement

const cadastrar = async () => {
  btn.disabled = true

  const {dados,senha} = ProcessaCadastro.lerInputs()
  const possuiErros = ProcessaCadastro.validarCampos(dados,senha)

  if (!possuiErros) {
    dados.timestamp = new Date().toISOString()

    await new AutenticacaoRepositorio().cadastrar({email:dados.email,senha:senha},dados).catch(error => {
      AvisoComponente(document.body,"Ocorreu um erro",error.message)
    })    
  }

  btn.disabled = false
}

btn.addEventListener("click",cadastrar);