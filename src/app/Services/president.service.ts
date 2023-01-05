import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _userService : UserService,private _httpClient : HttpClient,private _router: Router) { }

  createTable(){
    //create a new table of president, must be connected so send token
    //TODO use Guard ?
    this._httpClient.post<UserModel>(this._url+"createTable",{}).subscribe( () => {} )
  }


  joinPresiTable(id:number):  Observable<PresiTableModel>{

    this.idTable = id
    let token : string = localStorage.getItem('token') ?? "null";

    this._event = new EventSource(this._url+"joinTable?tableId="+id+"&token="+token)
    this._event.onerror= (er) => {
      console.log(er)
      this._event.close()
      this._router.navigate( [ "/home" ] )
    }

    this._event.addEventListener("PresiGameModel",this.dataTableToObjet.bind(this))

    return this._tableDataSub.asObservable()
  }

  private dataTableToObjet(d:any){
    this._tableData = JSON.parse(d.data)
    this.playerId = this._tableData.me.id
    this._tableDataSub.next(this._tableData)
    this._CardsSub.next( this.makeMyHand() )
  }

  quitTable(){
    this._event.close()
  }

  sendReady(){
    //TODO use token
    //TODO check show ready ?
    this._httpClient.get( `${this._url}ready?tableId=${this.idTable}&playerId=${this.playerId}`).subscribe( )
  }

  //TODO use token
  sendCards(cards : number[]){
    if( this._tableData.me.isPlaying )
      this._httpClient.post( `${this._url}setCards?tableId=${this.idTable}&playerId=${this.playerId}`,cards).subscribe( )
  }

  private makeMyHand():PresiCardModel[]{

    const myHand : PresiCardModel[] = []
    const valMin = this._tableData.centerCarte.length > 0 ? getValue(this._tableData.centerCarte[0]) != 0 ? getValue(this._tableData.centerCarte[0]) : 0 : 0
    const nbCenter = this._tableData.centerCarte.length > 0 ?  getValue(this._tableData.centerCarte[0]) != 0 ? this._tableData.centerCarte.length : 0 : 0

    let lastV = -1
    let sameVal = 0

    
    this._tableData.myHand.forEach( c => {

      const show = this._tableData.newCards.includes(c)

      //if not my turn just show card
      if( !this._tableData.me.isPlaying ){
        myHand.push( { val:c,shaded:false,canPlay:false,up:show,selectPrec:0 } )
        return
      }

      //if have to select cards to exchange
      if( this._tableData.changeCards.length > 0  ){
        const canBeChanged = this._tableData.changeCards.includes(c)
        myHand.push( { val:c,shaded:!canBeChanged,canPlay:canBeChanged,up:false,selectPrec:0 } )
        return
      }

      const val = getValue(c)

      if( lastV === val )
        sameVal++
      else 
        sameVal = 0

      //TODO use enum ( 0 => 2, 1 => 3, ...  12 => K )
      const shaded = val == 0/*enum*/ ? sameVal + 2 < nbCenter : ! ( (val > valMin && sameVal + 1 >= nbCenter ) || ( val >= valMin && sameVal + 1 > nbCenter ) )
       
      myHand.push( { val:c,shaded:shaded,canPlay:!shaded,up:show,selectPrec:sameVal } )
      lastV = getValue(c)
    })

    return myHand
  }

}
