import { PlayerModel } from "../player.model";
import { TableModel } from "../table.model";
import { HandCardModel } from "./presi.handCard.model";
import { PresiPlayerModel } from "./presi.player.model";

export class PresiTableModel implements TableModel {
    
    id: number
    
    players: PresiPlayerModel[] = []
    centerCarte : number = 0
    playing : number = 0
    myHand : HandCardModel[] = []
    

    constructor(id: number) {
        this.id = id
    }

}