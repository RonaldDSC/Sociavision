import '@/globalStyle.css'
import './styles.css'
import { atualizaHrefs } from './atualizandoHrefs'
import { ProcessaCadastro } from './ProcessaCadastro'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'
import LoadingComponente from '@/componentes/loading/loadingComponente'
import PessoaFisica from '@/modelos/pessoa/pessoaFisicaModelo'
import { RotasServico } from '@/servicos/navegacao/rotas'

const observador = RotasServico.rotaProtegida()
atualizaHrefs()

const btn = document.getElementsByClassName("enviar-btn")[0] as HTMLButtonElement

const cadastrar = async () => {
  observador()
  btn.disabled = true
  const carregando = LoadingComponente(document.body)

  const {dados,senha} = ProcessaCadastro.lerInputs()

  dados.timestamp = new Date().toISOString()

  const possuiErros = ProcessaCadastro.validarCampos(dados,senha)

  if (!possuiErros) {    
    const {cadastrar} = new AutenticacaoRepositorio()
    
    await cadastrar({email:dados.email,senha:senha},new PessoaFisica(dados))
    .catch(error => {
      AvisoComponente(document.body,"Ocorreu um erro",error.message)
    }) 
  }

  carregando.esconder()
  btn.disabled = false
}

btn.addEventListener("click",async () => {
  await cadastrar()
  .then(() => {
    const observador = RotasServico.rotaProtegida()

    setTimeout(() => {
      observador()      
    }, 5000);
  })
  .catch(() => {    
    AvisoComponente(document.body,"Ocorreu um erro","Algo inesperado aconteceu ao realizar o cadastro")
  })
});
