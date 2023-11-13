import cartaoFigura from "@assets/svgs/icon-park-outline_credit.svg"
import pixFigura from "@assets/svgs/ic_baseline-pix.svg"
import boletoFigura from "@assets/svgs/Mask group.svg"

export const atualizaHrefs = () => {
  const opcaoCartao = document.getElementById("opcaoCartao")
  const opcaoPix = document.getElementById("opcaoPix")
  const opcaoBoleto = document.getElementById("opcaoBoleto")

  if (opcaoCartao) {
    opcaoCartao.getElementsByTagName("img")[0].src = cartaoFigura 
  }
  
  if (opcaoPix) {
    opcaoPix.getElementsByTagName("img")[0].src = pixFigura    
  }
  
  if (opcaoBoleto) {
    opcaoBoleto.getElementsByTagName("img")[0].src = boletoFigura    
  }
}