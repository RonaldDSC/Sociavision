import { UrlServico } from "./url";
import { TRotas, RotasServico } from "./rotas";

const navegar = (rota:TRotas,params?:Record<string,string | number>) => {  
  if (params && Object.keys(params).length > 0) {  
    window.location.href = UrlServico.inserirParametros(RotasServico.rotas[rota],params)     
  } else {
    window.location.href = RotasServico.rotas[rota]
  }  
}

const replace = (rota:TRotas) => { 
    window.location.replace(RotasServico.rotas[rota])   
}

export const NavegacaoServico = {
  navegar,
  replace
}

