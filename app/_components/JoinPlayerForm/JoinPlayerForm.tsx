import { useState } from "react";
import styles from "./JoinPlayerForm.module.css";

export default function JoinPlayerForm({ onFormSubmit }: Props) {
  const [form, setForm] = useState({ playerName: "" });

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event: React.FormEvent) => onFormSubmit(event, form.playerName)}
    >
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
      <button type="submit">Unirse</button>
    </form>
  );
}

type Props = {
  onFormSubmit: (event: React.FormEvent, playerName: string) => void;
};
