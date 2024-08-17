import { useGameState } from "@/app/_contexts/GameContext";
import { usePlayerState } from "@/app/_contexts/PlayerContext";
import styles from "./GameInfo.module.css";

export default function GameInfo({ roomCode }: Props) {
  const gameState = useGameState();
  const playerState = usePlayerState();

  function getPlayerNameTurn(): string {
    const players = gameState?.players?.filter(
      (p) => p.token !== gameState.currentPlayer
    );
    return players && players.length > 0 ? players[0].name : "";
  }

  return (
    <div>
      <h5>Código de sala: {roomCode}</h5>
      <h1>Jugadores</h1>
      <div className={styles.players}>
        {gameState?.players?.map((player, index) => (
          <p key={index}>
            {player.name} es {player.token}
          </p>
        ))}
      </div>
      <p className={styles.turnName}>
        {gameState?.currentPlayer !== playerState?.token
          ? "Es tu turno"
          : "Es el turno de " + getPlayerNameTurn()}
      </p>
    </div>
  );
}

type Props = {
  roomCode: string;
};
