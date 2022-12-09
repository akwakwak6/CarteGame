import { PlayerModel } from "./player.model"

export interface TableListModel{
    joined:boolean
    id: number
    players: PlayerModel[]
}