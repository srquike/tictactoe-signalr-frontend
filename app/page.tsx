"use client";

import styles from "./page.module.css";
import { usePlayerState } from "./_contexts/PlayerContext";
import JoinForm from "./_components/JoinForm/JoinForm";
import Game from "./_components/Game/Game";
import { useGameDispatch } from "./_contexts/GameContext";
import GameInfo from "./_components/GameInfo/GameInfo";
import Loader from "./_components/Loader/Loader";
import { useSignalRState } from "./_contexts/SignalRContext";
import IPlayer from "./_interfaces/IPlayer";
import { useState } from "react";

export default function Home() {
  const playerState = usePlayerState();
  const signalRState = useSignalRState();
  const gameDispatch = useGameDispatch();
  const [playerCount, setPlayerCount] = useState(0);
  
  signalRState?.on("PlayerJoined", (players: IPlayer[]) => {
    gameDispatch?.({
      name: "player-joined",
      payload: {
        players: players,
      },
    });
    setPlayerCount(players.length);
  });

  return (
    <main className={styles.main}>
      {playerState?.joined ? (
        <div className={styles.game}>
          <GameInfo roomCode={playerState.roomCode} />
          {playerCount >= 2 ? (
            <Game />
          ) : (
            <Loader message="Esperando al segundo jugador, por favor espera..." />
          )}
        </div>
      ) : (
        <JoinForm />
      )}
    </main>
  );
}
