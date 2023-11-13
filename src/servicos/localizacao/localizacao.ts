const converteMoeda = (moeda:string,valor:number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: moeda }).format(
    valor,
  )
}

export const LocalizacaoServico = {
  converteMoeda
}