const pegarParametroAtual = () => {
  const params = window.location.search.substring(1).split("&")
  let objetoComParametros:Record<string,string> = {}

  if (params.length > 0) {
    params.forEach((parametro) => {
      const [chave,valor] = parametro.split(/=(.*)/s)
      
      objetoComParametros[chave] = valor
    })
  }

  return objetoComParametros
}

const inserirParametros = (url:string,params:Record<string,string | number>) => {
  let urlComParams = url
  
  const filtro = Object.keys(params).filter(key => key !== "" || undefined)
  
  if(filtro.length != 0) {
    urlComParams += "?"
    for (const [chave,valor] of Object.entries(params)) {      
      if (chave && valor) {
        urlComParams +=`&${chave}=${valor}`        
      }
    }
  }

  return urlComParams.replace("&","")
}

const copiarParametroAtual = (url:string) => {
  return inserirParametros(url, pegarParametroAtual()) 
}

export const UrlServico = {
  inserirParametros,
  pegarParametroAtual,
  copiarParametroAtual,
}