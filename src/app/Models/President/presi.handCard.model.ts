export class HandCardModel {

    card: number
    playable: boolean

    constructor(card: number, playable : boolean = false) {
        this.card = card
        this.playable = playable
    }

}