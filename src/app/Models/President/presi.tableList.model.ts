import { PlayerModel } from "../player.model"
import { TableListModel } from "../tableList.model"

export class PresiTableListModel implements TableListModel {
    id: number
    players: PlayerModel[]

    constructor(id: number, players: PlayerModel[] = []) {
        this.id = id
        this.players = players
    }
}