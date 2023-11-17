import cartaoFigura from "@assets/svgs/icon-park-outline_credit.svg"
import pixFigura from "@assets/svgs/ic_baseline-pix.svg"
import boletoFigura from "@assets/svgs/Mask group.svg"
import qrCode from "@assets/img/qr-code.png"

export const atualizaHrefs = () => {
  const opcaoCartao = document.getElementById("opcaoCartao")
  const opcaoPix = document.getElementById("opcaoPix")
  const opcaoBoleto = document.getElementById("opcaoBoleto")
  const formPix = document.getElementById("formPix")

  if (opcaoCartao) {
    opcaoCartao.getElementsByTagName("img")[0].src = cartaoFigura 
  }
  
  if (opcaoPix) {
    opcaoPix.getElementsByTagName("img")[0].src = pixFigura    
  }
  
  if (opcaoBoleto) {
    opcaoBoleto.getElementsByTagName("img")[0].src = boletoFigura    
  }
  
  if (formPix) {
    formPix.getElementsByTagName("img")[0].src = qrCode    
  }
}