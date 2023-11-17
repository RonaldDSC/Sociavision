import './style.scss'

interface IProps {
  root:Element
  id?:string
  name?:string
  placeholder?:string

}

export default function CopyInputComponente({root,id,name,placeholder}:IProps) {
  if (root.getElementsByClassName("copyInput")[0]) {
    return;
  }

  const container = document.createElement("div")
  container.className = "copyInput linha  expandido"
  

  container.innerHTML = `
  <input type="text" class="expandido" readonly value="" id="${id}" name="${name}" placeholder="${placeholder}">
  <button id="btnCopy">Copiar</button>
  `
  var btn = container.getElementsByTagName("button")[0]

  const copiar = () => {
    var copyText = container.getElementsByTagName("input")[0];    
    
    copyText.select();
    copyText.setSelectionRange(0, 99999);
  
    navigator.clipboard.writeText(copyText.value);
  
    btn.textContent = "Copiado"
  }
  
  container.getElementsByTagName("button")[0].addEventListener("click",copiar)
  
  root.appendChild(container)
}