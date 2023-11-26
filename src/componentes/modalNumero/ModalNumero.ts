import ErrorInputComponente from "../errorInput/ErroInput"
import fecharSvg from '@assets/svgs/mingcute_close-fill.svg'
import whatsSvg from '@assets/svgs/ic_outline-whatsapp.svg'
import './styles.css'
import { validacao } from "./validacao"

export interface ICampo {
  numero:string
  numeroPais:string
}

export default async  function ModalNumero (aoEnviar: (valores:ICampo) => Promise<void>, container = document.body) {
  const backdrop = document.createElement("div")
  backdrop.className = "modal-backdrop expandido align-center"

  const content = `  
    <div class="modal-numero coluna">

      <div class="linha align-start">
        <div id="whats-svg">
          <img class="img" src="${whatsSvg}" alt="icone WhatsApp">
        </div>
        <h1>Informe seu numero de WhatsApp</h1>
      </div>

      <h2>O cliente vai entrar em contato com você através desse número</h2>

      <div id="campo-numero" class="coluna">
        <div class="linha">
          <input id="numero-pais" name="numero-pais" type="number" inputmode="numeric" maxlength="3" placeholder="55" value="55">
          <input id="numero" name="numero" type="number" inputmode="tel" placeholder="Seu numero">
        </div>        
      </div>

      <button class="fechar align-center" type="button">
        <div id="fechar-svg">
          <img
            src="${fecharSvg}"      
            class="img"
            alt="fechar"
          />
        </div>
      </button>  

      <button class="btn-enviar">Enviar</button>  
    </div>    
  `

  backdrop.innerHTML = content

  backdrop.getElementsByClassName("btn-enviar")[0].addEventListener("click",async () => {
    const valores = lerInputs(backdrop)
    const erros = validarCampos(valores, backdrop)

    if (!erros) {
      await aoEnviar(valores)
      esconder()  
    }
  })

  const esconder = () => {
    backdrop.style.opacity = "0"    
    setTimeout(() => {
      document.getElementsByClassName("modal-backdrop")[0].remove()    
    },200)
  }
  backdrop.getElementsByClassName("fechar")[0].addEventListener("click", esconder)
  container.appendChild(backdrop)
}



const validarCampos = (campos:ICampo,container:Element) => {
  const erros = validacao.validarDados(campos)

  for (const error of container.getElementsByClassName("errorInput")) {
    error.remove()  
  }

  if (erros) {
    Object.keys(erros).forEach((campoError) => {            
      inserirError("campo-numero",erros[campoError].replace("caracteres","números"))
    })
  }
  return erros
}

const lerInputs = (container:Element) => {
  const inputs = container.getElementsByTagName("input")
  const resultado = <ICampo>{}

  for (const input of inputs) {
    switch (input.name) {
      case "numero-pais":        
        resultado.numeroPais = input.value.replace(/[^\d]/g, "")
        break;
      
      case "numero":       
        resultado.numero = input.value.replace(/[^\d]/g, "")
        break;
    }   
  }

  return resultado
}

const inserirError = (idCampo:string, mensagem:string) => {
  const campo = document.getElementById(idCampo)
  const erroInput = campo?.getElementsByClassName("errorInput")[0]
  
  if (erroInput) {
    erroInput.getElementsByClassName("errorInputTexto")[0].textContent = mensagem                           
  } else if(campo) {
    ErrorInputComponente(campo,mensagem)
  }
}