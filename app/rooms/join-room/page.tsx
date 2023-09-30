import JoinPlayerForm from "@/app/_components/JoinPlayerForm/JoinPlayerForm";
import { validatePlayerName } from "@/app/_tools/validations";

export default function JoinRoom() {
  function handleOnSubmit(event: React.FormEvent, playerName: string) {
    event.preventDefault();
    if (validatePlayerName(playerName)) {
    }
  }
  return <JoinPlayerForm onFormSubmit={handleOnSubmit} />;
}
