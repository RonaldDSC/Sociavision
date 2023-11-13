import Lottie from 'lottie-web'
import loading from '@assets/anim/loadingAnim.json'
import './style.scss'

export default function LoadingComponente(container:Element) {
  const backdrop = document.createElement("div")
  backdrop.className="align-center expandido"
  backdrop.id="backdrop"

  const containerAnim = document.createElement("div")
  containerAnim.className = "align-center"

  Lottie.loadAnimation({
    container:containerAnim,
    rendererSettings:{progressiveLoad:true},
    renderer:"svg",
    animationData:loading,
    loop:true
  })
  
  backdrop.appendChild(containerAnim)
  
  const esconder = () => {
    backdrop.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(backdrop)
    },200)
  }

  container.appendChild(backdrop)
  
  backdrop.style.opacity = "1"

  return {esconder}
}