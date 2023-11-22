import Lottie from 'lottie-web'
import './styles.css'
import procurandoAnim from '@assets/anim/searchingAnim.json'


export default function AnimTarefaPendenteComponente(container:Element) {
  const containerAnim = document.createElement("div")
  containerAnim.className = "align-center"
  containerAnim.className = "anim"

  Lottie.loadAnimation({
    container:containerAnim,
    rendererSettings:{progressiveLoad:true},
    renderer:"svg",
    animationData:procurandoAnim,
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