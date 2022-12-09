import { PlayerModel } from "../player.model";
import { TableModel } from "../table.model";

export class PresiTableModel implements TableModel {
    id: number
    players: PlayerModel[]

    constructor(id: number, players: PlayerModel[] = []) {
        this.id = id
        this.players = players
    }

}