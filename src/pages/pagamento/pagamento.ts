const exibirFormConformeInput = (input:HTMLInputElement) => {
  const formCartao = document.getElementById("formCartao")
  const formPix = document.getElementById("formPix")
  
  if (formCartao || formPix) {
    
    formCartao!.style.opacity = "0"
    formPix!.style.opacity = "0"    
    formCartao!.style.transform = "translateX(50px)"
    formPix!.style.transform = "translateX(50px)"
    
    setTimeout(() => {
      formCartao!.style.display = "none"  
      formPix!.style.display = "none"  
  
      switch (input.id) {
        case "cartao":
          formCartao!.style.display = "block"
          setTimeout(() => {
            formCartao!.style.opacity = "1"
            formCartao!.style.transform = "translateX(0px)"            
          }, 200);         
          break;
          
        case "pix":
          formPix!.style.display = "block"
          setTimeout(() => {
            formPix!.style.opacity = "1"            
            formPix!.style.transform = "translateX(0px)"            
          }, 200);         
          break;
      }
    }, 200);
  }  

}

const verificarRadioSelecionado = (
  container:HTMLCollectionOf<HTMLInputElement>, 
  funcao:(inputSelecionado:HTMLInputElement) => void
) => {
  for (const radio of container) {
    if (radio.checked) {
      funcao(radio)    
    }    
  } 
}

export const Pagamento = {
  verificarRadioSelecionado,
  exibirFormConformeInput
}