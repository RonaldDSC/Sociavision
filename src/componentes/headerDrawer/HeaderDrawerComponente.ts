import { RotasServico } from '@/servicos/navegacao/rotas'
import iconeUsuario from '@assets/svgs/fa_user.svg'
import './style.css'

interface IProps {
  drawer:Element
  nomeUsuario?:string,
  planoUsuario?:string,
}

export default function HeaderDrawerComponente({drawer,nomeUsuario,planoUsuario}:IProps) {
  const root = document.createElement("div")
  root.className = "root-drawer expandido"

  let content = ""

  if(nomeUsuario && planoUsuario) {
    content = `
    <div class="header-drawer linha align-start">   
      <div class="imagem-usuario align-center">
        <img src="${iconeUsuario}" class="img" alt="ícone de usuario" />
      </div>

      <div class="coluna info-credenciais">
        <span class="credencial-nome">${nomeUsuario}</span>
        <span class="credencial-plano">${planoUsuario}</span>
      </div>  
    </div>  
    `
  } else {
    content = `
      <a href="${RotasServico.rotas["/login"]}" class="btn-login">Login</a>
      <a href="${RotasServico.rotas["/cadastro"]}" class="btn-cadastro">Cadastre-se</a>
    `
  }
  

  root.innerHTML = content
  drawer.appendChild(root)
}