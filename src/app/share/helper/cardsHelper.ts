//TODO enum of all cards value ect

export function isSameValue(card : number,card2 : number) : boolean {
    return getValue(card) === getValue(card2)
}

export function diffValue(c1:number,c2:number):number{
    return getValue(c1) - getValue(c2)
}

export function getValue(c:number):number{
    if (isJoker(c)) return 14 
    return c % 13
}

export function isJoker(c:number){
    return c == 52 || c == 53
}