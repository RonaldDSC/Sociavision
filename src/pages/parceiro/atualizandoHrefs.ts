import check from "@assets/svgs/octicon_check-16.svg"
import chevron from "@assets/svgs/fluent_chevron-right-32-filled.svg"

export const atualizaHrefs = () => {
  const opcaoCartao = document.getElementsByClassName("btn-prosseguir")
  
  


  if (opcaoCartao[0]) {
    opcaoCartao[0].getElementsByTagName("img")[0].src = check 
    
    opcaoCartao[1].getElementsByTagName("img")[0].src = chevron 
  }

  

}