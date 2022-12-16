import { diffValue } from "src/app/share/helper/cardsHelper"

export function canPlay( hand : number[] , center : number[] ):boolean{

    if( hand.length < center.length )   return false

    if( diffValue(hand[0],center[0]) < 0 )  return false  

    return true

}