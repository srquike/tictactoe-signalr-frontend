import Square from "../Square/Square";

export default function Board({ xIsNext, squares, onPlay }: Props) {
  function handleOnSquareClick(squareIndex: number) {
    if (calculateWinner(squares) || squares[squareIndex]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[squareIndex] = "X";
    } else {
      nextSquares[squareIndex] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      {squares.map((square, index) => (
        <Square
          value={square}
          onSquareClick={() => handleOnSquareClick(index)}
        />
      ))}
    </div>
  );
}

function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

type Props = {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (nextSquares: Array<string>) => void;
};
