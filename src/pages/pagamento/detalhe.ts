import { LocalizacaoServico } from "@/servicos/localizacao/localizacao";

const adicionarItem = (container:Element,nome:string,moeda:string,preco:number) => {
  container.innerHTML += `
  <li class="produto linha">
    <span id="nome">${nome}</span>
    <span id="preco">${LocalizacaoServico.converteMoeda(moeda,preco)}</span>
  </li> 
  `
}

const calcularTotal = (precos:number[],moeda:string) => {
  const total = precos.reduce((prev,current) => prev + current)

  document.getElementsByClassName("total")[0].innerHTML = `
    <span id="nome">Total:</span>
    <span id="preco">${LocalizacaoServico.converteMoeda(moeda,total)}</span>
  `
}

export const Detalhe = {
  adicionarItem,
  calcularTotal
}