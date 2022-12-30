import { TableModel } from "../table.model";
import { PresiPlayerModel } from "./presi.player.model";

export interface PresiTableModel {
    
    myPlayerId : number
    players: PresiPlayerModel[]
    centerCarte : number[]
    playing : number[] 
    myHand : number[]
    showReady : boolean
    me : PresiPlayerModel

}