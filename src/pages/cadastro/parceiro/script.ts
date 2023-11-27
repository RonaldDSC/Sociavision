import '@/globalStyle.css'
import './styles.css'
import AutenticacaoRepositorio from '@/repositorios/autenticacao/autenticacaoRepositorio'
import { atualizaHrefs } from './atualizandoHrefs'
import { ProcessaCadastro } from './ProcessaCadastro'
import AvisoComponente from '@/componentes/aviso/AvisoComponente'
import PessoaParceira from '@/modelos/pessoa/pessoaParceiraModelo'
import { RotasServico } from '@/servicos/navegacao/rotas'
import LoadingComponente from '@/componentes/loading/loadingComponente'

const observador = RotasServico.rotaProtegida()
atualizaHrefs()

const btn = document.getElementsByClassName("enviar-btn")[0] as HTMLButtonElement

const cadastrar = async () => {
  observador()
  const carregando = LoadingComponente(document.body)
  btn.disabled = true

  const {dados,senha} = ProcessaCadastro.lerInputs()
  const possuiErros = ProcessaCadastro.validarCampos(dados,senha)

  if (!possuiErros) {
    dados.timestamp = new Date().toISOString()

    const {cadastrar} = new AutenticacaoRepositorio()
    
    await cadastrar({email:dados.email,senha:senha},new PessoaParceira(dados))    
    .catch(error => {
      AvisoComponente(document.body,"Ocorreu um erro",error.message)
    })    
  }

  btn.disabled = false
  carregando.esconder()
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