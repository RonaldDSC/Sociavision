export const atualizaHrefs = () => {
  const lista = document.getElementById("tarefa-andamento")?.getElementsByClassName("lista-tarefa")[0] as HTMLUListElement | undefined

  lista?.addEventListener('wheel', (event) => {
    event.preventDefault();

    lista.scrollBy({
      left: event.deltaY < 0 ? -160 : 160,
    });
  });
}
