import { formatDuration, intervalToDuration, parseISO } from "date-fns";


const quantoAteData = (inicio:string , ate:string ) => {
  const units = ['days', 'hours', 'minutes','seconds'];

  let contagem = formatDuration(
    intervalToDuration({start:new Date(inicio),end:new Date(ate)}),
    {format:units}
  )

  const separar = contagem.split(/\s/)  

  let traducao = separar[1]
  
  traducao = traducao.replace("days","dia")
  traducao = traducao.replace("hours","hora")
  traducao = traducao.replace("minutes","minuto")
  traducao = traducao.replace("seconds","segundo")
  
  if (Number(separar[0]) > 1) {
    traducao += "s"    
  }
  
  contagem = `${separar[0]} ${traducao}`
  return contagem
}

const formatarIso = (date:string) => {
  return parseISO(date).toLocaleDateString()
}

export const DataServico = {
  quantoAteData,
  formatarIso
}