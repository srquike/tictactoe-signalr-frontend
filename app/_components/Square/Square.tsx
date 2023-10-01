export default function Square({ value, onSquareClick }: Props) {
  return <button onClick={onSquareClick}>{value}</button>;
}

type Props = {
  value: string;
  onSquareClick: () => void;
};
