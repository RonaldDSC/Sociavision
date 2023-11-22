import Lottie from 'lottie-web'
import './styles.css'
import criandoAnim from '@assets/anim/creatingAnim.json'

export default function AnimTarefaAceitaComponente(container:Element) {
  const containerAnim = document.createElement("div")
  containerAnim.className = "align-center"
  containerAnim.className = "anim"

  Lottie.loadAnimation({
    container:containerAnim,
    rendererSettings:{progressiveLoad:true},
    renderer:"svg",
    animationData:criandoAnim,
    loop:true
  })
  
  container.appendChild(containerAnim)
  setTimeout(() => {
    containerAnim.style.opacity = "1"
  },200)

  
  const esconder = () => {
    containerAnim.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(containerAnim)
    },200)
  }

  return {esconder}
}