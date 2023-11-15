import AutenticadorFirebase from "../api/autenticador/autenticadorFirebase"
import { UrlServico } from "./url"

const rotas = {
  "/":new URL("/",window.location.origin).href,

  "/login":new URL("/login/",window.location.origin).href,
  "/login/resetarSenha":new URL("/login/",window.location.origin).href,

  "/cadastro":new URL("/cadastro/",window.location.origin).href,  
  "/cadastro/parceiro":new URL("/cadastro/parceiro/",window.location.origin).href,
  "/cadastro/fisica":new URL("/cadastro/fisica/",window.location.origin).href,
  "/cadastro/juridica":new URL("/cadastro/juridica/",window.location.origin).href,

  "/pagamento":new URL("/pagamento/",window.location.origin).href,
}

const possuiSubdominio = (subdominio:string) => window.location.pathname.includes(subdominio)

const redirecionarProxPagina = (fallbackUrl?:string) => {
  const {next} = UrlServico.pegarParametroAtual()

  if(next)
    window.location.replace(next)
  else if(fallbackUrl)
    window.location.replace(fallbackUrl) 
}

const rotaProtegida = () => {
  new AutenticadorFirebase().autentificador.onAuthStateChanged((usuarioLogado) => {
    const estaNaRotaAutenticacao = possuiSubdominio("/login") || possuiSubdominio("/cadastro")
    const estaNaRotaPagamento = possuiSubdominio("/pagamento")
    
    const rotaParaCliente = false
    const rotaParaParceiro = false
  
    if (usuarioLogado) {
      if (estaNaRotaAutenticacao) {
        redirecionarProxPagina(rotas["/"])     
      }        
    } else {
      if (rotaParaCliente || rotaParaParceiro || estaNaRotaPagamento) {
        window.location.href = rotas["/login"]      
      }    
    }   
    
  })  
}

export type TRotas = keyof typeof rotas

export const RotasServico = {
  rotas,
  possuiSubdominio,
  redirecionarProxPagina,
  rotaProtegida
}

