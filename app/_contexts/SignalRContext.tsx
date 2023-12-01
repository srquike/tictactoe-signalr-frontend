import signalR, { HubConnection } from "@microsoft/signalr";
import { createContext, useEffect, useState } from "react";

const SignalRStateContext = createContext<HubConnection | null>(null);

export default function SignalRStateProvider({ children }: Children) {
  const [state, setState] = useState<HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7217/hubs/rooms").build();
    connection
      .start()
      .then(() => setState(connection))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SignalRStateContext.Provider value={state}>
      {children}
    </SignalRStateContext.Provider>
  );
}

type Children = {
  children: JSX.Element[] | JSX.Element;
};
