import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import UsuarioDropdownComponente from "../usuarioDropdown/UsuarioDropdownComponente"
import "./styles.css"
import { NavegacaoServico } from "@/servicos/navegacao/nav"
import AvisoComponente from "../aviso/AvisoComponente"
import logo from '@assets/svgs/logo.svg'
import { RotasServico } from "@/servicos/navegacao/rotas"
import ComprasRepositorio from "@/repositorios/compras/comprasRepositorio"


export default function UsuarioNavBarComponente() {
  const header = document.createElement("header")
  header.className = "navBar"

  const content = `  
    <a href="${RotasServico.rotas["/"]}">
        <img src="${logo}" class="logo" alt="Logo Sociavision" class="logo" />
    </a>
    <div class="nav-container">
        <nav>
            <a href="${RotasServico.rotas["/"]}#home">Home</a>
            <a href="${RotasServico.rotas["/"]}#sobre">Sobre-nos</a>
            <a href="${RotasServico.rotas["/"]}#planos">Planos</a>
            <a href="${RotasServico.rotas["/"]}#contato">Contato</a>
        </nav>
    </div>
  `

  header.innerHTML = content
  inserirDropdown(header)

  document.body.appendChild(header)
}

const inserirDropdown = async (container:Element) => {
  try {
    const {usuarioLogado,sair} = new AutenticacaoRepositorio()
    const {pegarDadosCompra} = new ComprasRepositorio()
    
    const usuario = await usuarioLogado()

    if (usuario !== null) { 
      const dados = await pegarDadosCompra()
      if (dados !== null) {
        const clicouEmSair = async () => {        
          await sair()        
          NavegacaoServico.navegar("/")
        } 
  
        UsuarioDropdownComponente({
          container:container,
          nomeUsuario:usuario.nome,
          planoUsuario:dados.plano,
          aoClicarSair:async () => await clicouEmSair()
        })
      }
        
    }
    
  } catch (error) {
    AvisoComponente(document.body,"Ocorreu um erro","Algo de inesperado aconteceu ao recuperar o usuário")
  } 
}