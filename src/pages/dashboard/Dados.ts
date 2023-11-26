import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import ComprasRepositorio from "@/repositorios/compras/comprasRepositorio"
import { DataServico } from "@/servicos/data/data"

interface IProps {
  nome:string
  plano:string
  dataAquisicao:string
  email:string
  numero?:number
  numeroPais?:number
}

const inserir = ({email, nome, dataAquisicao, plano,numero,numeroPais}:IProps) => {
  const nomeInput = document.getElementById("nome")
  const planoInput = document.getElementById("plano")
  const emailInput = document.getElementById("email")
  const dataAquisicaoInput = document.getElementById("aquisicao")
  const numeroInput = document.getElementById("numero") as HTMLInputElement | null
  const numeroPaisInput = document.getElementById("numero-pais") as HTMLInputElement | null

  if (nomeInput && planoInput && emailInput && dataAquisicaoInput) {
    nomeInput.textContent = ` ${nome}`
    emailInput.textContent = ` ${email}` 
    planoInput.textContent = ` ${plano}`
    dataAquisicaoInput.textContent = ` ${dataAquisicao}`
  }

  if (numeroInput && numero) {
    numeroInput.value = String(numero)    
  }
  
  if (numeroPaisInput && numeroPais) {
    numeroPaisInput.value = String(numeroPais)    
  }
}

const recuperarDados = async () => {
  const {usuarioLogado} = new AutenticacaoRepositorio()
  const {pegarDadosCompra} = new ComprasRepositorio()

  const usuario = await usuarioLogado()
  const dados = await pegarDadosCompra() 
  const planoComprado =  dados?.historico.pop()

  if (dados && usuario && planoComprado) {
    inserir({
      nome:usuario.nome,
      plano:dados.plano,
      email:usuario.email,
      numero:usuario.numero,
      numeroPais:usuario.numeroPais,
      dataAquisicao:DataServico.formatarIso(planoComprado.timestamp)
    })
  }
}

export const Dados = {
  recuperarDados
} 