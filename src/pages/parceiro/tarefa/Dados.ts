import ComprasRepositorio from "@/repositorios/compras/comprasRepositorio"
import TarefaRepositorio from "@/repositorios/tarefas/TarefasRepositorio"
import UsuarioRepositorio from "@/repositorios/usuarios/UsuarioRepositorio"
import { UrlServico } from "@/servicos/navegacao/url"

interface IProps {
  nome:string
  resumo:string
  plano:string
}

const inserir = ({plano, nome, resumo}:IProps) => {
  const nomeInput = document.getElementById("nome")
  const resumoInput = document.getElementById("resumo")
  const planoInput = document.getElementById("plano")

  if (nomeInput && resumoInput && planoInput) {
    nomeInput.textContent = " " + nome
    planoInput.textContent = " " + plano    
    resumoInput.textContent = resumo
  }
}

const recuperarDados = async () => {
  const {id} = UrlServico.pegarParametroAtual()

  if (id) {
    const {pegarUsuario} = new UsuarioRepositorio()
    const {pegarDadosCompra} = new ComprasRepositorio()
    const {pegarTarefas} = new TarefaRepositorio()
  
    const tarefa = (await pegarTarefas()).find(tarefa => tarefa.idTarefa === id)
    const usuario = await pegarUsuario(id) 
    const dados = await pegarDadosCompra(id)
  
    if (dados && usuario && tarefa) {
      inserir({
        nome:usuario.nome,
        plano:dados.plano || "",
        resumo: tarefa.resumo
      })
    }
    
  }

}

export const Dados = {
  recuperarDados
} 