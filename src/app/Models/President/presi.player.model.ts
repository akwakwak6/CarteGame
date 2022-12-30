
export enum PresiRoles {
    Neutre = 0,
    President = 1,
    VicePresident = 2,
    ViceBum = 3,
    Bum = 4
}

export interface PresiPlayerModel  {

    pseudo: string
    nbCard : number
    role : PresiRoles
    isPlaying : boolean
}