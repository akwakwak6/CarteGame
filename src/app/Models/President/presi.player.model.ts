import { PlayerModel } from "../player.model";

export class PresiPlayerModel implements PlayerModel {
    pseudo: string
    tableId: number

    constructor(tableId:number, pseudo: string) {
        this.pseudo = pseudo
        this.tableId = tableId
    }
    
}