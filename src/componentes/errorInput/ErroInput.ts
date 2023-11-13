import './styles.scss'
import alerta from '@assets/svgs/jam_alert.svg'


export default function ErrorInputComponente(container:Element, mensagem:string) {
  if (!mensagem) {
    return;    
  }

  const error = document.createElement("div")
  error.className = "errorInput linha align-center"

  error.innerHTML = `  
    <div class="errorInputSvg">
      <img                    
        class="img"        
        alt="figura"                  
      />
    </div>
    `
  const p = document.createElement('p')
  p.className = "errorInputTexto"
  p.innerText = mensagem

  error.appendChild(p)

  error.getElementsByTagName("img")[0].src = alerta

  container.appendChild(error)
}