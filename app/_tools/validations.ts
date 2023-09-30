export function validatePlayerName(playerName: string): boolean {
  return playerName.length >= 3 && playerName.length <= 10;
}
