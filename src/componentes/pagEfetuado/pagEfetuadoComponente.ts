import Lottie from 'lottie-web'
import check from '@assets/anim/checkAnim.json'
import SairFigura from '@assets/svgs/mingcute_close-fill.svg'
import './style.scss'

export default function PagEfetuadoComponente(container:Element,aposEsconder?:() => void) {
  const backdrop = document.createElement("div")
  backdrop.className="align-center expandido linha"
  backdrop.id="backdrop"

  backdrop.innerHTML += `
    <button id="fechar" type="button">
      <div id="fechar-svg">
        <img        
          class="img"
          alt="figura"
        />
      </div>
    </button>  
  `
  backdrop.getElementsByTagName("img")[0].src = SairFigura

  const containerAnim = document.createElement("div")
  containerAnim.className = "align-center"
  containerAnim.id = "anim"

  Lottie.loadAnimation({
    container:containerAnim,
    rendererSettings:{progressiveLoad:true},
    renderer:"svg",
    animationData:check,
    loop:false
  })
  
  backdrop.appendChild(containerAnim)

  const h1 = document.createElement("h1")
  h1.textContent = "Compra realizada com sucesso"
  backdrop.appendChild(h1)
  
  const esconder = () => {
    backdrop.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(backdrop)

      aposEsconder ? aposEsconder() : null     
    },200)
  }
  
  backdrop.getElementsByTagName("button")[0].addEventListener("click",() => esconder())
  container.appendChild(backdrop)
  
  backdrop.style.opacity = "1"

  return {esconder}
}