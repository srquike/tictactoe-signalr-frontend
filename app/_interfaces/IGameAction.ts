import IGameState from "./IGameState";

export default interface IGameAction {
    name: string,
    payload: IGameState
}