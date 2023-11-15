export enum EnumTabelas {
  "usuarios",
  "planos",
}

export type Tabelas = keyof typeof EnumTabelas