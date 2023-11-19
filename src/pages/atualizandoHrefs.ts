import logoSvg from "@assets/svgs/logo.svg"
import whatsSvg from "@assets/svgs/whatsapp-home.svg"
import instaSvg from "@assets/svgs/instagram-home.svg"
import twitterSvg from "@assets/svgs/twitter-home.svg"
import faceSvg from "@assets/svgs/facebook-home.svg"
import bannerSvg from "@assets/svgs/svg-banner.svg"

import sobre1Img from "@assets/img/img-sobre1.png"
import sobre2Img from "@assets/img/img-sobre2.png"
import sobre3Img from "@assets/img/img-sobre3.png"

import globoSvg from "@assets/svgs/icon-globo.svg"
import suporteSvg from "@assets/svgs/icon-support.svg"
import estrelaSvg from "@assets/svgs/icon-star.svg"

import checkCards from '@assets/svgs/check-cads.svg'
import estrelaCards from '@assets/svgs/star-check-cards.svg'

import convenioCheck from '@assets/svgs/check-white.svg'

import contatoEmail from '@assets/svgs/email-footer.svg'

import contatoTelefone from '@assets/svgs/tel-footer.svg'


import { RotasServico } from "@/servicos/navegacao/rotas";

export const atualizaHrefs = () => {
  const login = document.getElementsByClassName("btn-login")[0] as HTMLAnchorElement
  const cadastro = document.getElementsByClassName("btn-cadastro")[0] as HTMLAnchorElement

  login.href = RotasServico.rotas["/login"]
  cadastro.href = RotasServico.rotas["/cadastro"]

  const logo = document.getElementsByClassName("logo") as HTMLCollectionOf<HTMLImageElement>

  if (logo.length !== 0) {
    for (const img of logo) {
      img.src = logoSvg
    }   
  }

  const iconesBanner = document.getElementsByClassName("banner")[0].getElementsByTagName("img")

  if (iconesBanner.length !== 0) {
    for (const img of iconesBanner) {
      switch (img.alt) {
        case "Instagram":
          img.src = instaSvg
          break;
          
        case "Whatsapp":
          img.src = whatsSvg
          break;

        case "Facebook":
            img.src = faceSvg
            break;
            
        case "Twitter":
            img.src = twitterSvg
            break;
            
        case "Banner":
          img.src = bannerSvg
          break;
      }
    }            
  }
  
  const sobre = document.getElementsByClassName("sobre")[0].getElementsByTagName("img")

  if (sobre.length !== 0) {
    for (const img of sobre) {
      switch (img.alt) {
        case "Sobre1":
          img.src = sobre1Img
          break;
          
        case "Sobre2":
          img.src = sobre2Img
          break;

        case "Sobre3":
            img.src = sobre3Img
            break;
      }
    }            
  }
  
  const serv = document.getElementsByClassName("box-serv")[0].getElementsByTagName("img")

  if (serv.length !== 0) {
    for (const img of serv) {
      switch (img.alt) {
        case "Suporte":
          img.src = suporteSvg
          break;
          
        case "Estrela":
          img.src = estrelaSvg
          break;

        case "Globo":
            img.src = globoSvg
            break;
      }
    }            
  }
  
  const beneficios = document.getElementsByClassName("box-beneficios")
  for (const cards of beneficios) {

    let box = cards.getElementsByTagName("img")
    if (box.length !== 0) {
      for (const img of box) {
        switch (img.alt) {
          case "Beneficios":
            img.src = checkCards
            break;
            
          case "Beneficios-estrela":
            img.src = estrelaCards
            break;
        }
      }            
    }
  }

  const conv = document.getElementsByClassName("box-convenio")[0].getElementsByTagName("img")

  if (conv.length !== 0) {
    for (const img of conv) {
      switch (img.alt) {
        case "Beneficios":
          img.src = convenioCheck
          break;        
      }
    }            
  }
  
  const contato = document.getElementsByClassName("contato")[0].getElementsByTagName("img")

  if (contato.length !== 0) {
    for (const img of contato) {
      switch (img.alt) {
        case "Email":
          img.src = contatoEmail
          break;   
          
        case "Telefone":
          img.src = contatoTelefone
          break;        
      }
    }            
  }


    

}