import { useState } from "react";
import styles from "./FinishGame.module.css";
import { useGameDispatch } from "@/app/_contexts/GameContext";

type Props = {
  result?: string;
};

export default function FinishGame({ result }: Props) {
  const gameDispatch = useGameDispatch();
  const [modalState, setModalState] = useState("block");

  function handleOnCLickCloseModal() {
    setModalState("none");

    gameDispatch?.({
      name: "game-finished",
      payload: {
        finished: true,
      },
    });
  }

  return (
    <div style={{ display: modalState }} className={styles.modal}>
      <div className={styles.modalContent}>
        <span>
          El ganador es: <b>{result}</b>
        </span>
        <button
          className={styles.closeButton}
          onClick={() => handleOnCLickCloseModal()}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
