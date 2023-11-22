import planoSvg from '@assets/svgs/plano_logada.svg'
import resumoSvg from '@assets/svgs/resumo_logada.svg'
import dadosSvg from '@assets/svgs/dados_usuario_logada.svg'

export const atualizaHrefs = () => {
  const dadosUsuario = document.getElementsByClassName("dados-usuario")[0].getElementsByTagName("img")[0]
  
  const planoAtivo = document.getElementsByClassName("plano-ativo")[0].getElementsByTagName("img")[0]
  
  const dadosTarefa = document.getElementsByClassName("dados-tarefa")[0].getElementsByTagName("img")[0]
  

  if(dadosUsuario) {
    dadosUsuario.src = dadosSvg
  }
  
  if(planoAtivo) {
    planoAtivo.src = planoSvg
  }
  
  if(dadosTarefa) {
    dadosTarefa.src = resumoSvg
  }
}