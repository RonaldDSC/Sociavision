import '@/servicos/navegacao/navegacao'
import '@/globalStyle.css'
import './styles.css'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import { ProcessarLogin } from './processarLogin'
import { atualizaHrefs } from './atualizandoHrefs'
import LoadingComponente from '@/componentes/loading/loadingComponente'

atualizaHrefs()

const btn = document.getElementsByClassName("enviar-btn")[0] as HTMLButtonElement


const onPressLogin = async () => {
  btn.disabled = true
  const carregando = LoadingComponente(document.body)

  const credenciais = ProcessarLogin.lerInputs()
  const possuiErros = ProcessarLogin.validarCampos(credenciais)
  
  if (!possuiErros) {
    await new AutenticacaoRepositorio().login(credenciais).catch(error => {
      AvisoComponente(document.body,"Ocorreu um erro",error.message)
    })    
  }
  
  carregando.esconder()
  btn.disabled = false
}

btn.addEventListener("click",onPressLogin);
