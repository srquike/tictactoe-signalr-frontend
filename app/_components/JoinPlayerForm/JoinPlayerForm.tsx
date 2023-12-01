import { useState } from "react";
import styles from "./JoinPlayerForm.module.css";

export default function JoinPlayerForm({ onFormSubmit }: Props) {
  const [form, setForm] = useState({ playerName: "" });
  const [message, setMessage] = useState("");

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (form.playerName.length >= 3 && form.playerName.length <= 10) {
      setMessage("");
      onFormSubmit(form.playerName);
    } else {
      setMessage("Tu nombre de jugador debe contener entre 3 y 10 caracteres.");
    }
  }

  return (
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
      <button type="submit">Unirse</button>
    </form>
  );
}

type Props = {
  onFormSubmit: (playerName: string) => void;
};
