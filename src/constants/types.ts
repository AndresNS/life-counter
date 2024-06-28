export type LifeTotal = {
  [key: string]: number;
};

export type BackgroundTheme = "default" | "dark" | "light";

export type Player = {
  playerId: string;
  backgroundColor: string;
  backgroundTheme: BackgroundTheme;
  startingLife: number;
  lifeTotal: number;
};
