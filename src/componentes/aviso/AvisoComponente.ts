import './styles.scss'
import SairFigura from '@assets/svgs/mingcute_close-fill.svg'
import AlertaFigura from '@assets/svgs/jam_alert.svg'

export default function AvisoComponente(container:Element, titulo:string, mensagem:string, color = "#F25252") {
  const aviso = document.createElement("div")
  aviso.id= "container"
  aviso.className = "linha align-center"
  aviso.style.backgroundColor = color

  aviso.innerHTML = `
    <div id="esquerda-icone" class="align-center">
      <div id="esquerda-svg">
        <img             
          class="img"          
          alt="figura"
        />
      </div>
    </div>

    <div class="coluna">

      <div class="linha space-between">
        <span class="titulo">${titulo}</span>
        <button id="fechar" type="button">
          <div id="fechar-svg">
            <img        
              class="img"
              alt="figura"
            />
          </div>
        </button>
      </div>

      <span class="mensagem">${mensagem}</span>
    <div/>


    
    `
  const figuras = aviso.getElementsByTagName("img")
  figuras[0].src = AlertaFigura
  figuras[1].src = SairFigura
  
  aviso.style.opacity = "1"

  const autoEsconder = setTimeout(() => esconderComAnimacao(), 5000);

  const esconderComAnimacao = () => {
    aviso.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(aviso)
    },200)
  }
    
  const fechar = () => {
    clearTimeout(autoEsconder)
    esconderComAnimacao()
  }

  aviso.getElementsByTagName("button")[0].addEventListener("click",fechar)

  container.appendChild(aviso)

  return {esconder:fechar}
}