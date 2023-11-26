import ErrorInputComponente from "@/componentes/errorInput/ErroInput"
import { validacao } from "./validacao"
import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import TarefaRepositorio from "@/repositorios/tarefas/TarefasRepositorio"
import ComprasRepositorio from "@/repositorios/compras/comprasRepositorio"
import UsuarioRepositorio from "@/repositorios/usuarios/UsuarioRepositorio"
import LoadingComponente from "@/componentes/loading/loadingComponente"
import AvisoComponente from "@/componentes/aviso/AvisoComponente"

export interface IDadosTarefa {
  resumo:string
  numeroPais:string,
  numero:string
}

async function enviar({numero,numeroPais,resumo}:IDadosTarefa) {
  const loading = LoadingComponente(document.body)

  try {
    const {criarTarefa} = new TarefaRepositorio()
  
    const {usuarioLogado} =  new AutenticacaoRepositorio()
    const {pegarDadosCompra} =  new ComprasRepositorio()
  
    const {atualizarUsuario} = new UsuarioRepositorio()
  
    const usuario = await usuarioLogado()
    const dados = await pegarDadosCompra()
    const planoComprado = dados?.historico.pop()
    
    if (usuario && dados && planoComprado) {
      await atualizarUsuario(usuario.id,{numeroPais,numero})
  
      await criarTarefa({
        resumo,
        plano:dados.plano,
        dataExp:planoComprado.produto.dataExp,
        preco:String(planoComprado.produto.preco / 2),
        idTarefa:usuario.id
      })
    }
    
  } catch (error) {
    AvisoComponente(document.body,"Ocorreu um erro","Aconteceu um erro ao enviar a tarefa")
  } finally {
    loading.esconder()
  }
}

async function cancelar() {  
  const loading = LoadingComponente(document.body)
  try {
    const {cancelarTarefa} = new TarefaRepositorio()
    const {usuarioLogado} = new AutenticacaoRepositorio()

    const usuario = await usuarioLogado()
  
    if (usuario) {
      await cancelarTarefa(usuario.id)      
    }

  } catch (error) {
    AvisoComponente(document.body,"Ocorreu um erro","Aconteceu um erro ao cancelar a tarefa")    
  } finally {
    loading.esconder()
  }
}

const lerInputs = () => {
  const inputs = document.getElementsByClassName("form")[0].getElementsByTagName("input")
  const dados = <IDadosTarefa> {}

  for (const input of inputs) {
    switch (input.name) {
      case "numero-pais":        
        dados.numeroPais = input.value.replace(/[^\d]/g, "")
        break;
      
      case "numero":       
        dados.numero = input.value.replace(/[^\d]/g, "")
        break;
    }   
  }

  const resumo = document.getElementById("campo-resumo")?.getElementsByTagName("textarea")[0]

  if (resumo && resumo.value) {
    dados.resumo = resumo.value  
  }
  
  return dados
}

const validarCampos = (dados:IDadosTarefa) => {
  const erros = validacao.validarDados(dados)

  for (const error of document.getElementsByClassName("errorInput")) {
    error.remove()  
  }

  if (erros) {
    Object.keys(erros).forEach((campoError) => {
            
      switch (campoError) {  
        case "numeroPais":
        case "numero":
          inserirError("campo-numero",erros[campoError].replace("caracteres","número"))
          break         
          
        case "resumo":
          inserirError("campo-resumo",erros[campoError])        
          break
      }
    })
  }

  return erros
}

const inserirError = (idCampo:string, mensagem:string) => {
  const campo = document.getElementById(idCampo)
  const erroInput = campo?.getElementsByClassName("errorInput")[0]
  
  if (erroInput) {
    erroInput.getElementsByClassName("errorInputTexto")[0].textContent = mensagem                           
  } else if(campo) {
    ErrorInputComponente(campo,mensagem)
  }
}

export const ProcessarTarefa = {
  enviar,
  cancelar,
  lerInputs,
  validarCampos
}