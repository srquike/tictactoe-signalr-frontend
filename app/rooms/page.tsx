import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Salas</h2>
      <Link href={"/create-room"}>Crear sala</Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableTh}>#</th>
            <th className={styles.tableTh}>Jugadores</th>
            <th className={styles.tableTh}>Creada</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jugador 1</td>
            <td>Hace 1 minuto</td>
            <td align="right">
              <Link href={"/join"}>Unirse</Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jugador 1, Jugador 2</td>
            <td>Hace 2 minutos</td>
            <td align="right">
              <Link href={"/join"}>Llena</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
