export function isSameValue(card : number,card2 : number) : boolean {
    return card % 13 === card2 % 13
}

export function diffValue(c1:number,c2:number):number{
    return c1 % 13 - c2 % 13
}