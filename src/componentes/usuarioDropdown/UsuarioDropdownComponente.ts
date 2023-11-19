import './styles.css'
import iconeUsuario from '@assets/svgs/fa_user.svg'
import iconeSair from '@assets/svgs/material-symbols_logout.svg'

interface IProps {
  container:Element
  nomeUsuario:string,
  emailUsuario:string,
  aoClicarSair: () => void
}


export default function UsuarioDropdownComponente (
  {aoClicarSair,container,emailUsuario,nomeUsuario}:IProps
) {
  const root = document.createElement("div")
  root.className = "usuario-dropdown"

  const content = `    
    <div class="banner-usuario linha align-center">
      <button class="imagem-usuario align-center">
        <img class="img" alt="ícone de usuario" />
      </button>
        <span class="naoSelecionavel">Olá, <span class="credencial-nome">${nomeUsuario}</span></span>
    </div>

    <div tabindex="0" id="detalhe-usuario" class="coluna">
      <div class="linha align-start">
        <div class="imagem-usuario align-center">
          <img class="img" alt="ícone de usuario" />
        </div>

        <div class="coluna info-credenciais">
          <span class="credencial-nome">${nomeUsuario}</span>
          <span class="credencial-email">${emailUsuario}</span>
        </div>
      </div>

      <div class="divisor"></div>

      <ul class="coluna detalhe-acoes">
        <li class="linha detalhe-acao detalhe-sair align-start">
          <img alt="sair">
          <span class="naoSelecionavel">Sair</span>
        </li>
      </ul>
    </div> 
  `
  root.innerHTML = content

  const imgUsuario = root.getElementsByClassName("imagem-usuario")
  for (const imgContainer of imgUsuario) {
    imgContainer.getElementsByTagName("img")[0].src = iconeUsuario
  }

  const itemSair = root.getElementsByClassName("detalhe-sair")[0] as HTMLLIElement
  const icone = itemSair.getElementsByTagName("img")[0]
  if (icone) {
    icone.src = iconeSair
    itemSair.addEventListener("click",aoClicarSair)
  }
  
  const esconder = () => {
    root.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(root)
    },200)
  }  
  
  root.addEventListener("click",visibilidadeDropdown)
  
  container.appendChild(root)

  return {esconder}
}

function visibilidadeDropdown() {
  const detalhe = document.getElementById("detalhe-usuario")    
  if (detalhe) {
    detalhe.style.display = "flex"
    setTimeout(() => {
      detalhe.style.opacity = "1" 
    },50)
    
    detalhe.focus()

    detalhe.addEventListener("focusout", () => {
      detalhe.style.opacity = "1" 

      setTimeout(() => {
        detalhe.style.display = "none"
      },50)        
    })
  }
}