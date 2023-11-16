import '@/globalStyle.css'
import './styles.css'
import { atualizaHrefs } from './atualizandoHrefs'
import { RotasServico } from '@/servicos/navegacao/rotas'

RotasServico.rotaProtegida()
atualizaHrefs()