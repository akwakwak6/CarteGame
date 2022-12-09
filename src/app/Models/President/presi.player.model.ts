import { PlayerModel } from "../player.model";

export class PresiPlayerModel implements PlayerModel {

    id: number
    pseudo: string
    tableId: number

    constructor(id:number, tableId:number, pseudo: string) {
        this.id = id
        this.pseudo = pseudo
        this.tableId = tableId
    }

}