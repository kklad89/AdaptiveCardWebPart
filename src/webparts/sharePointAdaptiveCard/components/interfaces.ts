export enum CardVisibility {
  Visible = 'visible',
  Hidden = 'hidden'
}

export interface ICardPosition {
  row: number;
  column: number;
}

export interface ICardData {
  id: string;
  position: ICardPosition;
  json: string;
  isFixed?: boolean;
  visibility?: CardVisibility;
  title?: string;
  icon?: string;
}

export interface IDashboardState {
  cards: ICardData[];
  isCustomizing: boolean;
  defaultLayout: ICardData[];
  hiddenCards: ICardData[];
  isManagingHiddenCards: boolean;
}
