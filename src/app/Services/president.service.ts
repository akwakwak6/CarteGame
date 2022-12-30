import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PresiTableModel } from '../Models/President/presi.table.model';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { UserModel } from '../Models/User/user.login.model';
import { SETTING } from '../share/consts/Setting';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PresidentService {

  private _url : string = SETTING.URL_API + "Presi/";

  private _event! : EventSource

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


  joinPresiTable(id:number, mth : (data : PresiTableModel) => void): () => void{

    this.idTable = id
    let token : string = localStorage.getItem('token') ?? "null";

    this._event = new EventSource(this._url+"joinTable?tableId="+id+"&token="+token)
    this._event.onerror= (er) => {
      console.log(er)
      this._event.close()
    }

    this._event.addEventListener ( "playerID" , this.setPlayerId.bind(this))//TODO use lambda ?

    const m = (d:any) => {mth(JSON.parse(d.data))}  
    this._event.addEventListener("PresiGameModel",m)

    return () => {
      this.playerId = null
      this.idTable = null
      this._event.removeEventListener("PresiGameModel",m)//TODO remove is usefull ?
      this._event.removeEventListener( "playerID" , this.setPlayerId)
      this._event.close()
    } 
  }

  setPlayerId(d : any){
    this.playerId = JSON.parse(d.data).playerId
  }

  quitTable(){
    console.log("quit table "+this.idTable)
  }

  sendReady(){
    //TODO use token
    this._httpClient.get( `${this._url}ready?tableId=${this.idTable}&playerId=${this.playerId}`).subscribe( )
  }

  //TODO use token
  sendCards(cards : number[]){
    this._httpClient.post( `${this._url}setCards?tableId=${this.idTable}&playerId=${this.playerId}`,cards).subscribe( )
  }

}
