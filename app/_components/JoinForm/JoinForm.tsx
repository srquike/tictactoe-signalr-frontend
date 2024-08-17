import { useState } from "react";
import styles from "./JoinForm.module.css";
import Alert from "../Alerts/Alert";
import Loader from "../Loader/Loader";
import { useSignalRState } from "@/app/_contexts/SignalRContext";
import { usePlayerDispatch } from "@/app/_contexts/PlayerContext";

export default function JoinForm() {
  const [form, setForm] = useState({ playerName: "", roomCode: "" });
  const [message, setMessage] = useState("");
  const [haveRoomCode, setHaveRoomCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signalRState = useSignalRState();
  const playerDispatch = usePlayerDispatch();

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleOnCLickJoin() {
    const roomCode = form.roomCode;

    if (roomCode.length > 0 && roomCode.length !== 6) {
      setMessage("Tu código de sala debe tenere 6 caracteres.");
      return;
    }

    const playerName = form.playerName;

    if (playerName.length < 3 || playerName.length > 10) {
      setMessage("Tu nombre de jugador debe contener entre 3 y 10 caracteres.");
      return;
    }

    setMessage("Uniendote, por favor espera...");
    setIsLoading(true);

    signalRState
      ?.invoke("Join", roomCode, playerName, "O")
      .then((response) => {
        if (!response.success) {
          setIsLoading(false);
          setMessage(response.message);
          return;
        }

        playerDispatch?.({
          name: "joined",
          payload: {
            joined: true,
            name: playerName,
            roomCode: roomCode,
            token: "O"
          },
        });
      })
      .catch((error: Error) => {
        setIsLoading(false);
        setMessage(
          "Al parecer tenemos problemas para unirte. Puedes intentar nuevamente."
        );
        return;
      });
  }

  function handleOnClickPlay() {
    const playerName = form.playerName;

    if (playerName.length < 3 || playerName.length > 10) {
      setMessage("Tu nombre de jugador debe contener entre 3 y 10 caracteres.");
      return;
    }

    setMessage("Creando sala y uniendote, por favor espera...");
    setIsLoading(true);

    signalRState
      ?.invoke("CreateAndJoin", playerName, "X")
      .then((response) => {
        if (!response.success) {
          setIsLoading(false);
          setMessage(response.message);
          return;
        }

        playerDispatch?.({
          name: "joined",
          payload: {
            joined: true,
            name: playerName,
            roomCode: response.result.roomCode,
            token: "X"
          },
        });
      })
      .catch((error: Error) => {
        setIsLoading(false);
        setMessage(
          "Al parecer tenemos problemas para crear la sala y unirte. Puedes intentar nuevamente."
        );
        return;
      });
  }

  function handleOnClickHaveRoom() {
    setHaveRoomCode(!haveRoomCode);
  }

  return (
    <div>
      {isLoading ? (
        <Loader message={message} />
      ) : (
        <div className={styles.form}>
          <Alert message={message} />
          <div className={styles.section}>
            <input
              className={styles.input}
              value={form.playerName}
              onChange={handleOnChange}
              type="text"
              name="playerName"
              placeholder="Ingresa tu nombre de jugador"
              required
            />
          </div>
          {haveRoomCode ? (
            <div className={styles.section}>
              <input
                className={styles.input}
                value={form.roomCode}
                onChange={handleOnChange}
                type="text"
                name="roomCode"
                placeholder="Ingresa tu código de sala"
                required
              />
              <button type="button" onClick={handleOnCLickJoin}>
                Unirse
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleOnClickPlay}>
              Jugar
            </button>
          )}
          <button type="button" onClick={handleOnClickHaveRoom}>
            {haveRoomCode ? "Atrás" : "Tengo un código de sala"}
          </button>
        </div>
      )}
    </div>
  );
}
