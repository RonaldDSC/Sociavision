import './styles.scss'
import alerta from '@assets/svgs/jam_alert.svg'

export default function ErrorInputComponente(mensagem:string) {
  const container = document.createElement("div")
  container.className = "errorInput linha align-center"

  container.innerHTML = `  
    <div class="errorInputSvg">
      <img                    
        class="img"        
        alt="figura"                  
      />
    </div>
    <p class="errorInputTexto text-warning" >${mensagem}</p>
    `

  container.getElementsByTagName("img")[0].src = alerta
  return container
}