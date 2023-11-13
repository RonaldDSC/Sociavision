export enum EnumTabelas {
  "usuarios",
  "compras",
}

export type Tabelas = keyof typeof EnumTabelas