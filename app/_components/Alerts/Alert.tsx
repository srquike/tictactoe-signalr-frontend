export default function Alert({ message }: Props) {
  return <p>{message}</p>;
}

type Props = {
  message: string;
  type?: string;
  icon?: string;
};
