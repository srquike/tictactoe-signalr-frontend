import { useGameState } from "@/app/_contexts/GameContext";

export default function Game() {
  const state = useGameState();
  return (
    <section>
      {(state?.players.length as number) === 2 ? (
        <button type="button">Iniciar</button>
      ) : (
        <p>Esperando segundo jugador...</p>
      )}
    </section>
  );
}
