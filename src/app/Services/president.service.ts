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

  private MyId : number | null = null

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


    let token : string = localStorage.getItem('token') ?? "null";

    this._event = new EventSource(this._url+"joinTable?tableId="+id+"&token="+token)
    this._event.onerror= (er) => {
      console.log(er)
      this._event.close()
    }

    const m = (d:any) => {mth(JSON.parse(d.data))}  
    this._event.addEventListener("PresiGameModel",m)

    return () => {
      this._event.removeEventListener("PresiGameModel",m)
      this._event.close()
    } 
  }

  quitTable(id:number){
    console.log("quit table "+id)
  }

  sendReady(){

  }

  sendCards(){

  }

}
