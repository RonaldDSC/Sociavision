import resumoSvg from '@assets/svgs/resumo_logada.svg'
import dadosSvg from '@assets/svgs/dados_usuario_logada.svg'

export const atualizaHrefs = () => {
  const dadosUsuario = document.getElementsByClassName("dados-usuario")[0].getElementsByTagName("img")[0]
  
  const resumoTarefa = document.getElementsByClassName("resumo-tarefa")[0].getElementsByTagName("img")[0] 

  if(dadosUsuario) {
    dadosUsuario.src = dadosSvg
  }
  
  if(resumoTarefa) {
    resumoTarefa.src = resumoSvg
  }
 
}