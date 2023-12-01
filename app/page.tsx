import Link from "next/link";
import styles from "./page.module.css";
import RoomList from "./_components/RoomList/RoomList";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Salas</h2>
      <Link href={"/create-room"}>Crear sala</Link>
      <RoomList />
    </main>
  );
}
