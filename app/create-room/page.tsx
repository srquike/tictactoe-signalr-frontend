"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import JoinPlayerForm from "@/app/_components/JoinPlayerForm/JoinPlayerForm";

export default function CreateRoom() {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  function handleOnSubmit(playerName: string) {
    setIsCreating(true);
  }

  return (
    <main className={styles.main}>
      <h2>Crear sala</h2>
      {isCreating ? (
        <p>Creando sala, por favor espera...</p>
      ) : (
        <div>
          <JoinPlayerForm onFormSubmit={handleOnSubmit}/>
        </div>
      )}
    </main>
  );
}
