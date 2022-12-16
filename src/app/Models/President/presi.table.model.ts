import { TableModel } from "../table.model";
import { PresiPlayerModel } from "./presi.player.model";

export class PresiTableModel implements TableModel {
    
    id: number
    
    players: PresiPlayerModel[] = []
    centerCarte : number = 0
    playing : number = 0
    myHand : number[] = []
    

    constructor(id: number) {
        this.id = id
    }

}