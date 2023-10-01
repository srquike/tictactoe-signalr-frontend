"use client";

import JoinPlayerForm from "@/app/_components/JoinPlayerForm/JoinPlayerForm";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Game from "../_components/Game/Game";

export default function JoinRoom() {
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const params = useSearchParams();
  const roomId = params.get("id");

  function handleOnSubmit(playerName: string) {
    setIsJoining(true);
  }

  return (
    <main>
      {isJoined ? (
        <></>
      ) : (
        <div className={styles.main}>
          <h2>Unirse</h2>
          {isJoining ? (
            <p>Uniendote, por favor espera...</p>
          ) : (
            <div>
              <JoinPlayerForm onFormSubmit={handleOnSubmit} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
