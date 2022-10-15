export enum CardAttributes {
  title = "title",
  description = "description",
}

export enum CardEvents {
  cardSelected = "cardSelected",
}

export type CardSelectedEvent = CustomEvent<{ title: string }>;
