"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Loader from "../_components/Loader/Loader";
import { useSignalRState } from "../_contexts/SignalRContext";
import { useRouter } from "next/navigation";
import { usePlayerDispatch } from "../_contexts/PlayerContext";
import JoinForm from "@/app/_components/JoinForm/JoinForm";

export default function JoinRoom() {
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const signalRState = useSignalRState();
  const router = useRouter();
  const params = useSearchParams();
  const roomCode = params.get("code");
  const playerDispatch = usePlayerDispatch();
  
  function handleOnSubmit(playerName: string) {
    setIsJoining(true);

    signalRState
      ?.invoke("Join", roomCode, playerName)
      .then((response) => {
        if (response.success) {
          playerDispatch?.({
            name: "join",
            payload: {
              joined: true,
              name: playerName
            }
          });
          router.push("/room?code=" + roomCode);
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main className={styles.main}>
      <h2>Unirse</h2>
      {isJoining ? (
        <>
          {errorMessage !== "" ? (
            <p>{errorMessage}</p>
          ) : (
            <Loader message="Uniendote, por favor espera..." />
          )}
        </>
      ) : (
        <div>
          <JoinForm/>
        </div>
      )}
    </main>
  );
}
