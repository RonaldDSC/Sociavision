export enum EnumTabelas {
  "usuarios",
  "planos",
  "tarefas"
}

export type Tabelas = keyof typeof EnumTabelas