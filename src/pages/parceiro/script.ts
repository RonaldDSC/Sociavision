import '@/globalStyle.css'
import './styles.css'
import { RotasServico } from '@/servicos/navegacao/rotas'
import { atualizaHrefs } from './atualizandoHrefs'
import { addSeconds } from 'date-fns'
import { Tarefas } from './tarefas'
import UsuarioNavBarComponente from '@/componentes/usuarioNavbar/UsuarioNavBarComponente'

atualizaHrefs()

RotasServico.rotaProtegida(() => {
  UsuarioNavBarComponente()
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

Tarefas.adicionarTarefasAndamento({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})
Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})
Tarefas.adicionarTarefasDisponiveis({
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addSeconds(new Date(),10).toISOString(),
  preco:"R$ 20,90",
  id:"a"
})

/*
TarefaAndamentoComponente({container:document.body, plano:"basico",
detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
dataExp:addSeconds(new Date(),10).toISOString(),
preco:"R$ 20,90",
aoClicarProsseguir:()=>{}})

console.log(new Date());

TarefaDisponivelComponente({
  container:document.body,
  plano:"basico",
  detalhe:"O incentivo ao avanço tecnológico, assim como a valorização de fatores subjetivos auxilia a preparação e a composição das regras de conduta normativas.",
  dataExp:addMinutes(new Date(),50).toISOString(),
  preco:"R$ 20,90",
  aoClicarProsseguir:()=>{}
})*/