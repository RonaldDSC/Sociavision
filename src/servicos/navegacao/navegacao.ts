import AutenticadorFirebase from "../api/autenticador/autenticadorFirebase";

export const rotas = {
  "/":new URL("/",window.location.origin).href,

  "/login":new URL("/login/",window.location.origin).href,
  "/login/resetarSenha":new URL("/login/",window.location.origin).href,

  "/cadastro":new URL("/cadastro/",window.location.origin).href,  
  "/cadastro/parceiro":new URL("/cadastro/parceiro/",window.location.origin).href,
  "/cadastro/fisica":new URL("/cadastro/fisica/",window.location.origin).href,
  "/cadastro/juridica":new URL("/cadastro/juridica/",window.location.origin).href,
}

type TRotas = keyof typeof rotas

export const navegar = (rota:TRotas) => {
  window.location.href = rotas[rota]
}

new AutenticadorFirebase().autentificador.onAuthStateChanged((usuarioLogado) => {
  const estaNaRotaAutenticacao = 
      window.location.pathname.includes("/login") || 
      window.location.pathname.includes("/cadastro")
  
  const rotaParaCliente = false
  const rotaParaParceiro = false
    
  if (usuarioLogado) {
    if (estaNaRotaAutenticacao) {
      window.location.href = rotas["/"]      
    }        
  } else {
    if (rotaParaCliente || rotaParaParceiro) {
      window.location.href = rotas["/login"]      
    }    
  }
   
  
})

