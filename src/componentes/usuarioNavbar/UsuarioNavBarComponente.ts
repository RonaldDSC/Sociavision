import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import UsuarioDropdownComponente from "../usuarioDropdown/UsuarioDropdownComponente"
import "./styles.css"
import { NavegacaoServico } from "@/servicos/navegacao/nav"
import AvisoComponente from "../aviso/AvisoComponente"
import logo from '@assets/svgs/logo.svg'
import { RotasServico } from "@/servicos/navegacao/rotas"
import ComprasRepositorio from "@/repositorios/compras/comprasRepositorio"
import HeaderDrawerComponente from "../headerDrawer/HeaderDrawerComponente"
import iconeSair from '@assets/svgs/material-symbols_logout.svg'
import { ETipoPessoa } from "@/modelos/pessoa/pessoaModelo"

export default async function UsuarioNavBarComponente() {

  const header = document.createElement("header")
  header.className = "navBar"

  const content = `  
    <a href="${RotasServico.rotas["/"]}">
        <img src="${logo}" class="logo" alt="Logo Sociavision" class="logo" />
    </a>
    <div class="nav-container">
        <nav>
            <a class="nav-home-item" href="${RotasServico.rotas["/"]}#home">Home</a>
            <a href="${RotasServico.rotas["/"]}#sobre">Sobre-nos</a>
            <a href="${RotasServico.rotas["/"]}#planos">Planos</a>
            <a href="${RotasServico.rotas["/"]}#contato">Contato</a>
        </nav>
    </div>

    <button class="btn-menu-mob toggle-menu">
      <img name="menu-outline" />
    </button>
  `
  const drawer = `
  <div class="overlay toggle-menu"></div>  
  <div class="nav-container-mob menu-is-close expandido test1">
      <div class="box-btn-mobile">            
      </div>                   
      <nav class="nav-container-options">
          <a class="nav-home-item" href="${RotasServico.rotas["/"]}#home">Home</a>
          <a href="${RotasServico.rotas["/"]}#sobre">Sobre-nos</a>
          <a href="${RotasServico.rotas["/"]}#planos">Planos</a>
          <a href="${RotasServico.rotas["/"]}#contato">Contato</a>
      </nav>

                 
      <button class="nav-btn-sair" > <img src="${iconeSair}" alt="sair"> Sair</button>     
  </div>      
  `

  document.body.innerHTML += drawer
  const headerDrawer = document.body.getElementsByClassName("box-btn-mobile")[0] 
  
  header.innerHTML = content
  
  
  document.body.appendChild(header)
  drawerController();

  await inserindoComponentes(header,headerDrawer)
}

const inserindoComponentes = async (header:Element,headerDrawer:Element) => {
  try {
    const {usuarioLogado,sair} = new AutenticacaoRepositorio()
    const {pegarDadosCompra} = new ComprasRepositorio()
    
    const usuario = await usuarioLogado()

    if (usuario !== null) { 
      const dados = await pegarDadosCompra()
     
      const clicouEmSair = async () => {        
        await sair()        
        NavegacaoServico.navegar("/")
      } 

      UsuarioDropdownComponente({
        container:header,
        nomeUsuario:usuario.nome,
        planoUsuario:dados?.plano || "",
        aoClicarSair:async () => await clicouEmSair()
      })

      HeaderDrawerComponente({
        drawer:headerDrawer,
        nomeUsuario:usuario.nome,
        planoUsuario:dados?.plano || "",
      })  
      
      substituindoNavHome(usuario.tipoConta)

      const btnSair = document.body.getElementsByClassName("nav-btn-sair")[0]
      btnSair?.addEventListener("click",sair)
    }
    
  } catch (error) {
    AvisoComponente(document.body,"Ocorreu um erro","Algo de inesperado aconteceu ao recuperar o usuário")
  } 
}


const drawerController = () => {
  //Abrindo e Fechado Menu Mobile
  var toggleMenu = document.querySelectorAll(".toggle-menu");
  var menuMobile = document.querySelector(".nav-container-mob");
  var btnMenuMobImg = document.querySelector(".btn-menu-mob ion-icon");

  for (var m = 0; m < toggleMenu.length; m++) {
    toggleMenu[m].addEventListener("click", function () {
      var overlay = document.querySelector(".overlay");

        overlay?.classList.toggle("open");
        menuMobile?.classList.toggle("menu-is-close");
        menuMobile?.classList.toggle("menu-is-open");

        var icon = btnMenuMobImg?.getAttribute("name");

        if (icon === "menu-outline") {
            btnMenuMobImg?.setAttribute("name", "close-outline");
        } else {
            btnMenuMobImg?.setAttribute("name", "menu-outline");
        }    
    });
  }
}


const substituindoNavHome = (tipoConta:keyof typeof ETipoPessoa) => {
  const homeNav = document.body.getElementsByClassName("nav-home-item") as HTMLCollectionOf<HTMLAnchorElement>

  for (const a of homeNav) {
    a.textContent = "Dashboard"

    console.log(tipoConta === ETipoPessoa.fisica);
    
    
    switch (tipoConta) {
      case ETipoPessoa.fisica:
      case ETipoPessoa.juridica:
        a.href = RotasServico.rotas["/dashboard"]        
        break;
      
      case ETipoPessoa.parceira:
        a.href = RotasServico.rotas["/dashboard"]        
        break;
    
      default:
        a.textContent = "Home"
        a.href = RotasServico.rotas["/"] 
        break;
    }
  }
}