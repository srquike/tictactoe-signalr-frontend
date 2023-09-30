"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import JoinPlayerForm from "@/app/_components/JoinPlayerForm/JoinPlayerForm";
import { validatePlayerName } from "@/app/_tools/validations";

export default function CreateRoom() {
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  function handleOnSubmit(event: React.FormEvent, playerName: string) {
    event.preventDefault();
    if (validatePlayerName(playerName)) {
      setIsCreating(true);
    }
  }

  return (
    <main className={styles.main}>
      <h2>Crear sala</h2>
      {isCreating ? (
        <p>Creando sala, por favor espera...</p>
      ) : (
        <div>
          <JoinPlayerForm onFormSubmit={handleOnSubmit}/>
          <p>{message}</p>
        </div>
      )}
    </main>
  );
}
