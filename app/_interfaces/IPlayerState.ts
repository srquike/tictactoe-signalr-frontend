export default interface IPlayerState {
    name: string,
    joined: boolean,
    roomCode: string,
    token: string,
    isInPrivateRoom?: boolean
}