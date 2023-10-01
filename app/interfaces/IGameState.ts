import IPlayer from "./IPlayer";

export default interface IGameState {
    finished: boolean,
    players: IPlayer[],
    winner: IPlayer | null
}