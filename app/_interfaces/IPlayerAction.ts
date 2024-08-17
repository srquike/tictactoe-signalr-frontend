import IPlayerState from "./IPlayerState";

export default interface IPlayerAction {
    name: string,
    payload: IPlayerState
}