import "./styles.css"
import check from "@assets/svgs/octicon_check-16.svg"
import { DataServico } from "@/servicos/data/data"
import TarefaModelo from "@/modelos/tarefa/TarefaModelo"
import { ENomesPlanos } from "@/modelos/plano/planoModelo"

interface IProps extends TarefaModelo{
  container:Element,
  aoClicarProsseguir: () => void
}

export default function TarefaDisponivelComponente({
  container,plano,aoClicarProsseguir,dataExp,resumo,preco
}:IProps) {
  const root = document.createElement("div")
  
  let titulo = "Tarefa"
  switch (plano) {
    case ENomesPlanos.basico:
      root.className = "cartao-basico"
      titulo = "Básico"
      break;     
      
    case ENomesPlanos.intermediario:
      root.className = "cartao-intermediario"
      titulo = "Intermediário"  
      break;
      
    case ENomesPlanos.premium:
      titulo = "Premium"  
      root.className = "cartao-avancado"      
      break;
  }
  root.className += " tarefa expandido"

  dataExp = DataServico.quantoAteData(new Date().toISOString(),dataExp)
  dataExp = dataExp.includes("segundo") ? "Entregar de imediato" : `Entregar em ${dataExp}`

  const content = `
  <div class="conteudo">
    <h1 class="cartao-plano">${titulo}</h1>
    <p class="cartao-preco">R$ ${preco}</p>
    <p class="cartao-exp">${dataExp}</p>
    <h2>Resumo da tarefa</h2>
    <p class="cartao-detalhe">
      ${resumo}
    </p>
  </div>

  <button class="btn-cartao btn-prosseguir align-center">
    <div class="align-center">
      <img src="${check}" class="img" alt="ícone aceitar" />
    </div>
  </button>  
  `
  root.innerHTML = content

  root.getElementsByClassName("btn-prosseguir")[0].addEventListener("click",aoClicarProsseguir)

  container.appendChild(root)
  
  const esconder = () => {
    root.style.opacity = "0"    
    setTimeout(() => {
      container.removeChild(document.getElementsByClassName(root.className)[0])      
    },200)
  }

  return {
    esconder
  }
}