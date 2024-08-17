import { Dispatch, useReducer, createContext, useContext, ReactNode } from "react";
import IPlayerAction from "../_interfaces/IPlayerAction";
import IPlayerState from "../_interfaces/IPlayerState";

const PlayerStateContext = createContext<IPlayerState | null>(null);
const PlayerDispatchContext = createContext<Dispatch<IPlayerAction> | null>(null);

type Children = {
  children: JSX.Element[] | JSX.Element | ReactNode;
};

export default function PlayerStateProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <PlayerStateContext.Provider value={state}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerStateContext.Provider>
  );
}

function reducer(state: IPlayerState, action: IPlayerAction): IPlayerState {
  switch (action.name) {
    case "join-from-create-room": {
      return {
        ...state,
        joined: action.payload.joined,
        name: action.payload.name,
        roomCode: action.payload.roomCode,
        isInPrivateRoom: action.payload.isInPrivateRoom
      };
    }
    case "leave": {
      return {
        ...state,
        joined: action.payload.joined,
        name: action.payload.name,
        roomCode: action.payload.roomCode,
      };
    }
    case "joined": {
      return {
        ...state,
        joined: action.payload.joined,
        name: action.payload.name,
        roomCode: action.payload.roomCode,
        token: action.payload.token
      };
    }
    default:
      throw Error("Unknown action: " + action.name);
  }
}

export function usePlayerState() {
  return useContext(PlayerStateContext);
}

export function usePlayerDispatch() {
  return useContext(PlayerDispatchContext);
}

function getInitialState(): IPlayerState {
  return {
    name: "",
    joined: false,
    roomCode: "",
    isInPrivateRoom: false,
    token: ""
  };
}
