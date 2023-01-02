import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PresiCardModel } from '../Models/President/presi.card.model';
import { PresiTableModel } from '../Models/President/presi.table.model';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { UserModel } from '../Models/User/user.login.model';
import { SETTING } from '../share/consts/Setting';
import { getValue } from '../share/helper/cardsHelper';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PresidentService {

  private _url : string = SETTING.URL_API + "Presi/";
  private _event! : EventSource

  private _tableData! : PresiTableModel
  private _tableDataSub = new Subject<PresiTableModel>();
  private _CardsSub = new Subject<PresiCardModel[]>();

  cardsObs$ = this._CardsSub.asObservable()

  private playerId : number | null = null
  private idTable : number | null = null

  constructor(private _userService : UserService,private _httpClient : HttpClient) { }

  createTable(){
    //create a new table of president, must be connected so send token
    //TODO use Guard ?
    this._httpClient.post<UserModel>(this._url+"createTable",{}).subscribe( (r) => console.log(" create table "+r) )
  }

  /*
  subscribe<T>(object : string, mth : (object : T) => void): () => void{
    this._event = new EventSource(SETTING.URL_API + "MainSse")
    this._event.onerror= (er) => {
      console.log(er)
      this._event.close()
    }
    const m = (d:any) => {mth(JSON.parse(d.data))}  
    this._event.addEventListener(object,m)
    return () => {
      this._event.removeEventListener(object,m)
      this.close()
    }
  }
  */


  joinPresiTable(id:number):  Observable<PresiTableModel>{
    //TODO use obs, if not connected connect, if no lisener any more, close
    this.idTable = id
    let token : string = localStorage.getItem('token') ?? "null";

    this._event = new EventSource(this._url+"joinTable?tableId="+id+"&token="+token)
    this._event.onerror= (er) => {
      console.log(er)
      this._event.close()
    }

    //this._event.addEventListener ( "playerID" , this.setPlayerId.bind(this))//TODO use lambda ?

    //const m = (d:any) => {mth(JSON.parse(d.data))}  
    this._event.addEventListener("PresiGameModel",this.dataTableToObjet.bind(this))

    /*return () => {
      this.playerId = null
      this.idTable = null
      this._event.removeEventListener("PresiGameModel",m)//TODO remove is usefull ?
      this._event.removeEventListener( "playerID" , this.setPlayerId)
      this._event.close()
    } */

    return this._tableDataSub.asObservable()
  }

  private dataTableToObjet(d:any){
    this._tableData = JSON.parse(d.data)
    this.playerId = this._tableData.me.id
    this._tableDataSub.next(this._tableData)
    this._CardsSub.next( this.makeMyHand() )
  }

  quitTable(){
    console.log("quit table "+this.idTable)
  }

  sendReady(){
    //TODO use token
    //TODO check show ready ?
    this._httpClient.get( `${this._url}ready?tableId=${this.idTable}&playerId=${this.playerId}`).subscribe( )
  }

  //TODO use token
  sendCards(cards : number[]){
    //TODO check my time to play
    this._httpClient.post( `${this._url}setCards?tableId=${this.idTable}&playerId=${this.playerId}`,cards).subscribe( )
  }

  private makeMyHand():PresiCardModel[]{

    const myHand : PresiCardModel[] = []
    const valMin = this._tableData.centerCarte.length > 0 ? getValue(this._tableData.centerCarte[0]) != 0 ? getValue(this._tableData.centerCarte[0]) : 0 : 0
    const nbCenter = this._tableData.centerCarte.length > 0 ?  getValue(this._tableData.centerCarte[0]) != 0 ? this._tableData.centerCarte.length : 0 : 0

    let lastV = -1
    let sameVal = 0
    
    this._tableData.myHand.forEach( c => {

      if( lastV === getValue(c) )
        sameVal++
      else 
        sameVal = 0


        /*
          can play card if val is greater and nbCard grerater or equal ( nb card means cards with same value ) OR val equal and nbcard greater
        */

      let shaded : boolean = ! ( (getValue(c) > valMin && sameVal + 1 >= nbCenter ) || ( getValue(c) >= valMin && sameVal + 1 > nbCenter ) )

      if( getValue(c) == 0 ){//TODO use enum : if is a 2 can play
        shaded = sameVal + 2 < nbCenter
      }
       
      myHand.push( { val:c,shaded:shaded,up:false,selectPrec:sameVal } )
      lastV = getValue(c)
    })

    return myHand
  }

}
