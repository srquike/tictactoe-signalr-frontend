"use client";

import { usePlayerState } from "../_contexts/PlayerContext";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Game from "../_components/Game/Game";
import GameInfo from "../_components/GameInfo/GameInfo";
import Link from "next/link";
import { startTransition } from "react";

export default function Room() {
  const playerState = usePlayerState();
  const params = useSearchParams();

  const router = useRouter();
  startTransition(() => {
    router.refresh();
  })
  
  return (
    <main className={styles.main}>
      {playerState?.name === "" ? (
        <>
          <p>Debes ingresar tu nombre de jugador para unirte a esta sala.</p>
          <Link href={"/join?code=" + params.get("code")}>Unirse</Link>
        </>
      ) : (
        <div className={styles.room}>
          <Game />
          <GameInfo />
        </div>
      )}
    </main>
  );
}
