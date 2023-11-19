import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio"
import AutenticadorFirebase from "../api/autenticador/autenticadorFirebase"
import { UrlServico } from "./url"
import PessoaFisica from "@/modelos/pessoa/pessoaFisicaModelo"
import PessoaJuridica from "@/modelos/pessoa/pessoaJuridicaModelo"
import PessoaParceira from "@/modelos/pessoa/pessoaParceiraModelo"
import { TPessoas } from "@/modelos/pessoa/pessoaModelo"

const rotas = {
  "/":new URL("/",window.location.origin).href,

  "/login":new URL("/login/",window.location.origin).href,
  "/login/resetarSenha":new URL("/login/",window.location.origin).href,

  "/cadastro":new URL("/cadastro/",window.location.origin).href,  
  "/cadastro/parceiro":new URL("/cadastro/parceiro/",window.location.origin).href,
  "/cadastro/fisica":new URL("/cadastro/fisica/",window.location.origin).href,
  "/cadastro/juridica":new URL("/cadastro/juridica/",window.location.origin).href,

  "/pagamento":new URL("/pagamento/",window.location.origin).href,
  
  "/dashboard":new URL("/dashboard/",window.location.origin).href,
  "/parceiro":new URL("/parceiro/",window.location.origin).href,
}

const possuiSubdominio = (subdominio:TRotas) => {
  const cut = window.location.pathname.indexOf("/",1)  
  return window.location.pathname.substring(0,cut).includes(subdominio)
}

const redirecionarProxPagina = (fallbackUrl?:string) => {
  const {next} = UrlServico.pegarParametroAtual()

  if(next)
    window.location.replace(next)
  else if(fallbackUrl)
    window.location.replace(fallbackUrl) 
}

const rotaProtegida = (aoMudarAutenticador?:()=>void) => {
  return new AutenticadorFirebase().autentificador.onAuthStateChanged(async (user) => {
    const rotaAutenticacao = possuiSubdominio("/login") || possuiSubdominio("/cadastro")
    
    const rotaExclusivaCliente = possuiSubdominio("/dashboard")
    const rotaExclusivaParceiro = possuiSubdominio("/parceiro")

    aoMudarAutenticador ? aoMudarAutenticador() : null
    if (user) {
      const {usuarioLogado} = new AutenticacaoRepositorio()
      const usuario = await usuarioLogado()

      if (
        rotaAutenticacao ||
        (usuario instanceof PessoaFisica && rotaExclusivaParceiro) ||
        (usuario instanceof PessoaJuridica && rotaExclusivaParceiro) ||
        (usuario instanceof PessoaParceira && rotaExclusivaCliente)
      ) {
        redirecionandoUsuarios(usuario)
     }
  
    } else if (rotaExclusivaCliente || rotaExclusivaParceiro) {       
        window.location.href = rotas["/login"]        
    }   
    
  })  
}

const redirecionandoUsuarios = (usuario:TPessoas | null) => {
  if (usuario instanceof PessoaFisica || usuario instanceof PessoaJuridica) {
    redirecionarProxPagina(rotas["/dashboard"])        
  } else if (usuario instanceof PessoaParceira) {
    redirecionarProxPagina(rotas["/parceiro"])       
  } else {
    redirecionarProxPagina(rotas["/"])
  }
}

export type TRotas = keyof typeof rotas

export const RotasServico = {
  rotas,
  possuiSubdominio,
  redirecionarProxPagina,
  rotaProtegida
}

