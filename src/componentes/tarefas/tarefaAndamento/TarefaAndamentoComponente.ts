import "./styles.css"
import chevron from "@assets/svgs/fluent_chevron-right-32-filled.svg"
import { DataServico } from "@/servicos/data/data"
import TarefaModelo from "@/modelos/tarefa/TarefaModelo"
import { ENomesPlanos } from "@/modelos/plano/planoModelo"

interface IProps extends TarefaModelo {
  container:Element,
  aoClicarProsseguir: () => void
}

export default function TarefaAndamentoComponente({
  container,aoClicarProsseguir,dataExp,resumo,plano,preco
}:IProps) {
  const root = document.createElement("div")
  root.className = "tarefa expandido tarefa-andamento"

  let titulo = "Tarefa"
  switch (plano) {
    case ENomesPlanos.basico:
      titulo = "Básico"
      break;     
      
    case ENomesPlanos.intermediario:
      titulo = "Intermediário"  
      break;
      
    case ENomesPlanos.premium:
      titulo = "Premium"  
      break;
  }

  dataExp = DataServico.quantoAteData(new Date().toISOString(),dataExp)
  dataExp = dataExp.includes("segundo") ? "Entregar de imediato" : `Entregar em ${dataExp}`

  const content = `  
    <div class="conteudo">
      <div class="linha align-start">
        <h1 class="cartao-plano">${titulo}</h1>
        <span class="cartao-exp">${dataExp}</span>
      </div>
      <p class="cartao-preco">${preco}</p>

      <h2>Resumo da tarefa</h2>
      <p class="cartao-detalhe">
        ${resumo}
      </p>
    </div>

    <button class="btn-cartao btn-prosseguir align-center">
      <div class="align-center">
        <img src="${chevron}" class="img" alt="ícone aceitar" />
      </div>
    </button>
  `
  root.innerHTML = content

  root.getElementsByClassName("btn-prosseguir")[0].addEventListener("click",aoClicarProsseguir)
  
  container.appendChild(root)    
}