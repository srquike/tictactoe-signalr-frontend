import styles from "./Loader.module.css";

export default function Loader({ message }: Props) {
  return (
    <div className={styles.main}>
      <div>{message}</div>
      <div className={styles.loader}></div>
    </div>
  );
}

type Props = {
  message: string;
};
