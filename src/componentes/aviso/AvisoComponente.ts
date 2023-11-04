import './styles.scss'

export default function AvisoComponente(titulo:string, mensagem:string, color = "tomato") {
  const container = document.createElement("div")
  container.id= "container"
  container.className = "linha align-center"
  container.style.backgroundColor = color

  container.innerHTML = `
    <div id="esquerda-icone" class="align-center">
      <div id="esquerda-svg">
        <img             
          class="img"
          src="${window.location.origin + "/assets/svgs/jam_alert.svg"}"
          alt="figura"
        />
      </div>
    </div>

    <div class="coluna">
      <p class="titulo">${titulo}</p>
      <p class="mensagem">${mensagem}</p>
    </div>

    <button id="fechar" type="button">
      <div id="fechar-svg">
        <img        
          class="img"
          src="${window.location.origin + "/assets/svgs/mingcute_close-fill.svg"}"
          alt="figura"
        />
      </div>
    </button>
    `
  container.style.opacity = "1"

  const autoEsconder = setTimeout(() => esconderComAnimacao(), 5000);


  const esconderComAnimacao = () => {
    container.style.opacity = "0"    
    setTimeout(() => {
      document.body.removeChild(container)
    },200)
  }
    
  const fechar = () => {
    clearTimeout(autoEsconder)
    esconderComAnimacao()
  }

  container.getElementsByTagName("button")[0].addEventListener("click",fechar)

  return container
}