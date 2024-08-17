
import styles from "./Square.module.css";

export default function Square({ value, onSquareClick, disabled }: Props) {
  return <button className={styles.cell} onClick={onSquareClick} disabled={disabled}>{value}</button>;
}

type Props = {
  value: string;
  onSquareClick: () => void;
  disabled: boolean
};
