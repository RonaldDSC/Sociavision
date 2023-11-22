import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'
// Tem algum bug acontecendo que o codigo ta travando
RotasServico.rotaProtegida(()=>{
  UsuarioNavBarComponente()
  // Qualquer tipo de codigo colocar aki
})