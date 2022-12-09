import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PresiTableModel } from '../Models/President/presi.table.model';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PresidentService {

  private _idTable : number = 0
  private _tableLIst : PresiTableListModel[] = []
  private _SubTableList : Subject<PresiTableListModel[]> = new Subject<PresiTableListModel[]>()

  constructor(private _userService : UserService) { }

  createTable(){
    this._idTable ++
    this._tableLIst.push( new PresiTableModel(this._idTable) )
    this._SubTableList.next(this._tableLIst)
  }

  getTables():Observable<PresiTableListModel[]>{
    return this._SubTableList.asObservable()
  }

  joinPresiTable(id:number){

    let t = this._tableLIst.find( t => t.id === id )

    if( t === undefined ) return

    t.players.push( this._userService.getPresiPlayer(id) )
    
  }

  quitTable(){

  }

  sendReady(){

  }

  sendCards(){

  }

}
