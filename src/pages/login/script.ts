import '@/servicos/navegacao/navegacao'
import '@/globalStyle.css'
import './styles.css'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'
import AutenRepositorio from '@/repositorios/autenticacao/autenRepositorio'
import { ProcessarLogin } from './processarLogin'
import { atualizaHrefs } from './atualizandoHrefs'

atualizaHrefs()

const btn = document.getElementsByClassName("enviar-btn")[0] as HTMLButtonElement


const onPressLogin = async () => {
  btn.disabled = true

  const credenciais = ProcessarLogin.lerInputs()
  const possuiErros = ProcessarLogin.validarCampos(credenciais)
  
  if (!possuiErros) {
    await new AutenRepositorio().login(credenciais).catch(error => {
      document.body.append(AvisoComponente("Ocorreu um erro",error.message))
    })
  }
  btn.disabled = false
}

btn.addEventListener("click",onPressLogin);
