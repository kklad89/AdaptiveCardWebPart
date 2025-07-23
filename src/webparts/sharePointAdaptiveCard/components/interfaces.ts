export interface ICardPosition {
  row: number;
  column: number;
}

export interface ICardData {
  id: string;
  position: ICardPosition;
  json: string;
  isFixed?: boolean;
}

export interface IDashboardState {
  cards: ICardData[];
  isCustomizing: boolean;
  defaultLayout: ICardData[];
}
