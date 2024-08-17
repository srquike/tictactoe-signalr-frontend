import { useSignalRState } from "@/app/_contexts/SignalRContext";
import Square from "../Square/Square";
import styles from "./Board.module.css";
import { usePlayerState } from "@/app/_contexts/PlayerContext";
import { useGameState } from "@/app/_contexts/GameContext";

type Props = {
  squares: Array<string>;
};

export default function Board({ squares }: Props) {
  const signalRState = useSignalRState();
  const playerState = usePlayerState();
  const gameState = useGameState();

  function handleOnSquareClick(squareIndex: number) {
    signalRState
      ?.send(
        "SelectSquare",
        playerState?.roomCode,
        squareIndex,
        playerState?.token
      )
      .catch((error: Error) => window.alert(error.message));
  }

  return (
    <div className={styles.board}>
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onSquareClick={() => handleOnSquareClick(index)}
          disabled={gameState?.currentPlayer === playerState?.token}
        />
      ))}
    </div>
  );
}
