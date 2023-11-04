import AvisoComponente from '../componentes/aviso/AvisoComponente'
import '@/globalStyle.css'
import './main.css'
import '@/servicos/validation/yupTranslation'
import '@/servicos/navegacao/navegacao'

document.body.append (AvisoComponente("Ocorreu um Erro","Errooooooooooooooo","var(--indigo-100)"))