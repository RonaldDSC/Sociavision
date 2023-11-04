import AutenFirebase from "../api/autenticador/autenFirebase";

export const rotas = {
  "/":new URL("/",window.location.origin).href,

  "/login":new URL("/login/index.html",window.location.origin).href,
  "/login/resetarSenha":new URL("/login/index.html",window.location.origin).href,

  "/cadastro":new URL("/cadastro/index.html",window.location.origin).href,  
  "/cadastro/parceiro":new URL("/cadastro/parceiro/index.html",window.location.origin).href,
  "/cadastro/fisica":new URL("/cadastro/fisica/index.html",window.location.origin).href,
  "/cadastro/juridica":new URL("/cadastro/juridica/index.html",window.location.origin).href,
}

type TRotas = keyof typeof rotas

export const navegar = (rota:TRotas) => {
  window.location.href = rotas[rota]
}
/*
new AutenFirebase().autentificador.onAuthStateChanged((usuarioLogado) => {
  const estaNaRotaAutenticacao = 
      window.location.pathname.includes("/login") || 
      window.location.pathname.includes("/cadastro") 
    
  if (usuarioLogado) {
    if (estaNaRotaAutenticacao) {
      window.location.href = rotas["/"]      
    }        
  } else {
    if (estaNaRotaAutenticacao === false) {
      window.location.href = rotas["/login"]      
    }    
  }
   
  
})*/

