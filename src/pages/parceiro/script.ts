import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import { addDays, addHours, addSeconds } from 'date-fns'
import { Tarefas } from './tarefas'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'

atualizaHrefs()

RotasServico.rotaProtegida()
UsuarioNavBarComponente()


Tarefas.adicionarTarefasAndamento({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasAndamento({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasAndamento({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasAndamento({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasAndamento({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"Fotos de treinos, conquistas fitness, dicas de saúde, alimentação saudável e inspiração para estilo de vida ativo.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"Fotos de refeições, receitas, restaurantes, pratos criativos e vídeos de preparo de alimentos.",
  dataExp:addDays(new Date(),23).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"intermediario",
  detalhe:"Paisagens de viagens, fotos de destinos, atividades ao ar livre, e experiências culturais.",
  dataExp:addHours(new Date(),18).toISOString(),
  preco:"R$ 59.50",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"premium",
  detalhe:"Anúncios de produtos, bastidores de negócios, depoimentos de clientes, e promoções.",
  dataExp:addDays(new Date(),12).toISOString(),
  preco:"R$ 109.50",
  id:"a"
})


