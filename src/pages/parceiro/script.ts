import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'
import { Dados } from './Dados'

atualizaHrefs()

RotasServico.rotaProtegida()
UsuarioNavBarComponente()

Dados.carregarLista()

