import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";

const SignalRStateContext = createContext<HubConnection | null>(null);

export default function SignalRStateProvider({ children }: Children) {
  const [state, setState] = useState<HubConnection | null>(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7217/hubs/room", {
        logger: LogLevel.Error,
        withCredentials: false
      })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => setState(connection))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SignalRStateContext.Provider value={state}>
      {children}
    </SignalRStateContext.Provider>
  );
}

export function useSignalRState() {
  return useContext(SignalRStateContext);
}

type Children = {
  children: JSX.Element[] | JSX.Element;
};
