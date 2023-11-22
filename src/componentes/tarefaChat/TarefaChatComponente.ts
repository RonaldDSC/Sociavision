import AnimTarefaAceitaComponente from '../tarefaAnim/AnimTarefaAceitaComponente'
import AnimTarefaPendenteComponente from '../tarefaAnim/AnimTarefaPendenteComponente'
import './styles.css'
import whatsSvg from '@assets/svgs/WhatsAppButtonGreen.svg'

interface IProps {
  container:Element,
  titulo:string
  pendente?:boolean,
  aoClicarChat: () => void
  aoClicarCancelar: () => void
  aoClicarFinalizar: () => void
}

export default function TarefaChatComponente({
  titulo,aoClicarCancelar,aoClicarChat,aoClicarFinalizar,container,pendente
}:IProps) {

  const root = document.createElement("div")
  root.className = "andamento align-center coluna expandido"

  const content = `
    <h2>${titulo}</h2>
    <div class="containerAnim align-center"></div>
    <div class="align-center coluna">
      <button class="whatsapp-btn">
        <img src="${whatsSvg}" class="img" alt="logo WhatsApp">
      </button>
      <div>
        <button class="cancelar-btn">Cancelar</button>
        <button class="finalizar-btn">Finalizar</button>
      </div>
    </div>  
  `

  root.innerHTML = content
  
  const btnFinalizar = root.getElementsByClassName("finalizar-btn")[0] as HTMLButtonElement
  const btnCancelar = root.getElementsByClassName("cancelar-btn")[0] as HTMLButtonElement
  const btnChat = root.getElementsByClassName("whatsapp-btn")[0] as HTMLButtonElement

  btnFinalizar.addEventListener("click", aoClicarFinalizar)
  btnCancelar.addEventListener("click", aoClicarCancelar)
  btnChat.addEventListener("click", aoClicarChat)

  if (pendente) {
    btnChat.disabled = true    
  }

  adicionandoAnim(root,pendente)
  
  container.appendChild(root)

  const esconder = () => {
    root.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(document.getElementsByClassName("andamento")[0])      
    },200)
  }

  return {
    esconder
  }
}


const adicionandoAnim = (root:Element,pendente?:boolean) => {
  const anim = root.getElementsByClassName("containerAnim")[0]

  if (pendente) {
    AnimTarefaPendenteComponente(anim)    
  } else {
    AnimTarefaAceitaComponente(anim)
  }
}