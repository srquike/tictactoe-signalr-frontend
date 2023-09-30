"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CreateRoom() {
  const [form, setForm] = useState({ playerName: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (validatePlayerName(form.playerName)) {
      setIsCreating(true);
      const response = await fetch("");
      if (response.ok) {
        // Llamar al metodo On de SignalR
        router.push("/room?id=");
      }
    }
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function validatePlayerName(playerName: string): boolean {
    if (playerName.length >= 3 && playerName.length <= 10) {
        setMessage("");
        return true;
    } else {
        setMessage("Tu nombre de jugador debe contener entre 3 y 10 letras");
        return false
    }
  }

  return (
    <main className={styles.main}>
      <h2>Crear sala</h2>
      {isCreating ? (
        <p>Creando sala, por favor espera...</p>
      ) : (
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <input
            className={styles.input}
            value={form.playerName}
            onChange={handleOnChange}
            type="text"
            name="playerName"
            placeholder="Ingresa tu nombre de jugador"
            maxLength={10}
            minLength={3}
            required
          />
          <p>{message}</p>
          <button type="submit">Crear</button>
        </form>
      )}
    </main>
  );
}
