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
  importandoIonIcon()

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

    <div class="box-btn">
        <a href="${RotasServico.rotas["/login"]}" class="btn-login">Login</a>
        <a href="${RotasServico.rotas["/cadastro"]}" class="btn-cadastro">Cadastre-se</a>
    </div>
  `
  const drawer = `
  <ion-button class="btn-menu-mob toggle-menu" aria-label="Favorito">
      <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
  </ion-button>
  
  <div class="overlay toggle-menu"></div>  
  <div class="nav-container-mob menu-is-close expandido test1">
      <div class="box-btn-mobile">
        <div class="box-sign">
          <a href="${RotasServico.rotas["/login"]}" class="btn-login">Login</a>
          <a href="${RotasServico.rotas["/cadastro"]}" class="btn-cadastro">Cadastre-se</a>
        </div>          
                
      </div>    
      
      <nav class="nav-container-options">
          <a class="nav-home-item" href="${RotasServico.rotas["/"]}#home">Home</a>
          <a href="${RotasServico.rotas["/"]}#sobre">Sobre-nos</a>
          <a href="${RotasServico.rotas["/"]}#planos">Planos</a>
          <a href="${RotasServico.rotas["/"]}#contato">Contato</a>
      </nav>
                
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
      
      atualizandoNav(usuario.tipoConta)

      adicionandoSair(document.getElementsByClassName("nav-container-mob")[0],clicouEmSair)
    }
    
  } catch (error) {   
    AvisoComponente(document.body,"Ocorreu um erro","Algo de inesperado aconteceu ao recuperar o usuário")
  } 
}

const adicionandoSair = (drawerOptions: Element, aoClicar:() => void) => {

  const content = `
    <button class="nav-btn-sair" > <img src="${iconeSair}" alt="sair"> Sair</button>     
  `

  drawerOptions.innerHTML += content

  const btn = drawerOptions.getElementsByClassName("nav-btn-sair")[0] as HTMLButtonElement

  btn.addEventListener("click",aoClicar)
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


const atualizandoNav = (tipoConta:keyof typeof ETipoPessoa) => {
  const homeNav = document.body.getElementsByClassName("nav-home-item") as HTMLCollectionOf<HTMLAnchorElement>

  const signIn = document.querySelector(".box-sign")
  const signInHeader = document.querySelector(".box-btn")

  if (signIn) {
    signIn.classList.toggle("none")    
  }  
  
  if (signInHeader) {
    signInHeader.classList.toggle("none")    
  }

  for (const a of homeNav) {
    a.textContent = "Dashboard"
    
    switch (tipoConta) {
      case ETipoPessoa.fisica:
      case ETipoPessoa.juridica:
        a.href = RotasServico.rotas["/dashboard"]        
        break;
      
      case ETipoPessoa.parceira:
        a.href = RotasServico.rotas["/parceiro"]      
        break;
    
      default:
        a.textContent = "Home"
        a.href = RotasServico.rotas["/"] 
        break;
    }
  }
}

const importandoIonIcon = () => {
  var iconEsm = document.createElement('script');
  var icon = document.createElement('script');

  iconEsm.setAttribute('type','module');
  iconEsm.setAttribute('src','https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js');
  
  icon.setAttribute('nomodule','');
  icon.setAttribute('src','https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js');

  document.head.appendChild(iconEsm);
  document.head.appendChild(icon);
}