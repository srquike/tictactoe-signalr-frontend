"use client";

import { useState } from "react";
import styles from "./page.module.css";
import JoinPlayerForm from "../_components/JoinForm/JoinForm";
import { useRouter } from "next/navigation";
import { usePlayerDispatch } from "../_contexts/PlayerContext";
import { useSignalRState } from "../_contexts/SignalRContext";
import Loader from "../_components/Loader/Loader";
import { useGameDispatch } from "../_contexts/GameContext";
import IPlayer from "../_interfaces/IPlayer";

export default function CreateRoom() {
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const playerDispatch = usePlayerDispatch();
  const gameDispatch = useGameDispatch();
  const signalRState = useSignalRState();
  const router = useRouter();

  function handleOnChange() {
    setIsPrivateRoom((state) => !state);
  }

  function handleOnSubmit(playerName: string) {
  }

  return (
    <main className={styles.main}>
      <h2>Crear sala</h2>
      {isCreatingRoom ? (
        <Loader
          message={
            isPrivateRoom
              ? "Creando sala privada, por favor espere..."
              : "Creando sala, por favor espere..."
          }
        />
      ) : (
        <div className={styles.main}>
          <JoinPlayerForm/>
          <div>
            <input
              type="checkbox"
              id="checkBoxPrivateRoom"
              onChange={handleOnChange}
            />
            <label htmlFor="checkBoxPrivateRoom">Sala privada</label>
          </div>
        </div>
      )}
    </main>
  );
}
