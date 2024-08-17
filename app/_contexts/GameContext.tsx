import { Dispatch, createContext, useContext, useReducer } from "react";
import IGameState from "../_interfaces/IGameState";
import IGameAction from "../_interfaces/IGameAction";

const initialState: IGameState = {
  finished: false,
  players: [],
  winner: null,
  currentPlayer: "O",
  currentMove: 0,
};

const GameStateContext = createContext<IGameState | null>(null);
const GameDispatchContext = createContext<Dispatch<IGameAction> | null>(null);

export default function GameStateProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameStateContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

function reducer(state: IGameState, action: IGameAction): IGameState {
  switch (action.name) {
    case "player-joined": {
      return { ...state, players: action.payload.players };
    }
    case "square-selected": {
      return {
        ...state,
        currentPlayer: action.payload.currentPlayer,
        currentMove: action.payload.currentMove,
      };
    }
    case "game-finished": {
      return {
        ...state,
        finished: action.payload.finished,
      };
    }
    default:
      throw Error("Unknown action: " + action.name);
  }
}

type Children = {
  children: JSX.Element[] | JSX.Element;
};
