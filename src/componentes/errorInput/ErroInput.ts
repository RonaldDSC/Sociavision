import './styles.scss'

export default function ErrorInputComponente(mensagem:string) {
  const container = document.createElement("div")
  container.className = "errorInput linha align-center"

  container.innerHTML = `  
    <div class="errorInputSvg">
      <img                    
        class="img"
        src="${window.location.origin + "/assets/svgs/jam_alert.svg"}"
        alt="figura"                  
      />
    </div>
    <p class="errorInputTexto text-warning" >${mensagem}</p>
    `
  return container
}