import { useState } from "react";
import Board from "../Board/Board";
import styles from "./Game.module.css";
import { useSignalRState } from "@/app/_contexts/SignalRContext";
import { useGameDispatch, useGameState } from "@/app/_contexts/GameContext";
import FinishGame from "../FinishGame/FinishGame";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const signalRState = useSignalRState();
  const gameDispatch = useGameDispatch();
  const gameState = useGameState();
  const [isFinished, setIsFinished] = useState(false);
  const [gameResult, setGameResult] = useState<string | undefined>("");

  signalRState?.on("SquareSelected", (squareIndex: number, token: string) => {
    const nextSquares = currentSquares.slice();

    nextSquares[squareIndex] = token;

    gameDispatch?.({
      name: "square-selected",
      payload: {
        currentPlayer: token,
        currentMove: currentMove,
      },
    });

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const gameResult = checkWinner(nextSquares);

    if (gameResult !== undefined) {
      setIsFinished(true);
      setGameResult(gameResult);
    };
  });

  function checkWinner(board: string[]): string | undefined {
    // Definir las combinaciones ganadoras
    const winningCombinations = [
      [0, 1, 2], // Fila superior
      [3, 4, 5], // Fila del medio
      [6, 7, 8], // Fila inferior
      [0, 3, 6], // Columna izquierda
      [1, 4, 7], // Columna del medio
      [2, 5, 8], // Columna derecha
      [0, 4, 8], // Diagonal principal
      [2, 4, 6], // Diagonal secundaria
    ];
  
    // Revisar si alguna combinación ganadora se cumple
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winnerName = gameState?.players?.filter(p => p.token === board[a]);
        return winnerName ? winnerName[0].name : "";
      }
    }
  
    // Revisar si hay empate
    if (board.every((cell) => cell !== null)) {
      return "Empate";
    }
  
    // No hay ganador ni empate
    return undefined;
  }

  return (
    <div>
      {isFinished ? (
        <FinishGame result={gameResult} />
      ) : (
        <div className={styles.gameBoard}>
          <Board squares={currentSquares} />
        </div>
      )}
    </div>
  );
}


