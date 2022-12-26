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

  private _idTable : number = 0
  private _tableLIst : PresiTableListModel[] = []
  private _SubTableList$ : Subject<PresiTableListModel[]> = new Subject<PresiTableListModel[]>()

  constructor(private _userService : UserService,private _httpClient : HttpClient) { }

  createTable(){

    this._httpClient.post<UserModel>(this._url+"createTable",{}).subscribe( (r) => console.log(r) )
    //TODO tp
    /*this._idTable ++
    this._tableLIst.push( new PresiTableListModel(this._idTable) )
    this._SubTableList$.next(this._tableLIst)
    *///
  }

  getTables():Observable<PresiTableListModel[]>{
    return this._SubTableList$.asObservable()
  }

  joinPresiTable(id:number){

    //find table
    let index = this._tableLIst.findIndex( t => t.id === id )
    if( index === -1 ) return

    //leave all table
    this._tableLIst = this._tableLIst.map( t => {
      if(t.joined){
        this.quitTable(t.id)
        t.joined = false
      }
      return t
    })
    
    //join table
    //this._tableLIst[index].players.push( this._userService.getPresiPlayer(id) )
    this._tableLIst[index].joined = true

    //event
    this._SubTableList$.next(this._tableLIst)

    
  }


  quitTableIndex(index:number):void{
    let i = this._tableLIst[index].players.findIndex( p => p.id === 1 )//TODO use use id in userService
    if(i === -1) return
    this._tableLIst[index].joined = false
    this._tableLIst[index].players.splice(i,1)
    this._SubTableList$.next(this._tableLIst)
  }

  //better use index, not ID
  quitTable(id:number){
    let ti = this._tableLIst.findIndex( t => t.id === id )
    if( ti === -1 ) return
    this.quitTableIndex(ti)
  }

  sendReady(){

  }

  sendCards(){

  }

}
