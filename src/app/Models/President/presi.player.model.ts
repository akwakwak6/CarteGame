import { PlayerModel } from "../player.model";


export enum PresiRoles {
    Neutre = 0,
    President = 1,
    VicePresident = 2,
    ViceBum = 3,
    Bum = 4
}

export class PresiPlayerModel implements PlayerModel {

    id: number
    pseudo: string

    nbCard : number = 0
    role : PresiRoles = 0


    constructor(id:number, pseudo: string,nbCard : number = 0 ,role : PresiRoles = 0) {
        this.id = id
        this.pseudo = pseudo
        this.nbCard = nbCard
        this.role = role
    }

}