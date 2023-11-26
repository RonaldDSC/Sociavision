import Lottie from 'lottie-web'
import loading from '@assets/anim/loadingAnim.json'
import './style.scss'

export default function LoadingComponente(container:Element) {
  const backdrop = document.createElement("div")
  backdrop.className="align-center expandido loadingComp"

  const containerAnim = document.createElement("div")
  containerAnim.className = "align-center"

  const anim = Lottie.loadAnimation({
    container:containerAnim,
    rendererSettings:{progressiveLoad:true},
    renderer:"svg",
    animationData:loading,
    loop:true,
  }) 

  anim.addEventListener("DOMLoaded",()=> {    
    backdrop.appendChild(containerAnim)
    
    container.appendChild(backdrop)
    
    backdrop.style.opacity = "1"
  })    
  
  const esconder = () => {
    backdrop.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(document.getElementsByClassName("loadingComp")[0])      
    },200)
  }

  return {esconder}
}