import palette from "@constants/colors";
import { Player } from "@constants/types";

export function isUniformArray<T>(array: T[]): boolean {
  return array.every((value, _, array) => value === array[0]);
}

export function getBackgroundColor(player: Player) {
  if (player.backgroundTheme === "dark") return palette.grays[900];
  if (player.backgroundTheme === "light") return palette.grays[100];

  return player.backgroundColor;
}

export function getTextColor(player: Player) {
  if (player.backgroundTheme === "default") return palette.neutrals.white;
  return player.backgroundColor;
}
