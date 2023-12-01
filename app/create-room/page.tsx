"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CreateRoom() {
  const [isCreating, setIsCreating] = useState(false);
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const router = useRouter();

  function handleOnClick() {
    setIsCreating(true);
    router.push("/join-room");
  }

  function handleOnChange() {
    setIsPrivateRoom((state) => !state);
  }

  return (
    <main className={styles.main}>
      <h2>Crear sala</h2>
      {isCreating ? (
        <p>Creando sala, por favor espera...</p>
      ) : (
        <div className={styles.main}>
          <div>
            <input
              type="checkbox"
              id="checkBoxPrivateRoom"
              onChange={handleOnChange}
            />
            <label htmlFor="checkBoxPrivateRoom"> Sala privada</label>
          </div>
          {isPrivateRoom ? <input type="text" id="" /> : <></>}
          <button type="button" onClick={handleOnClick}>
            Crear
          </button>
        </div>
      )}
    </main>
  );
}
