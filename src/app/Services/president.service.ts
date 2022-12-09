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
    this._tableLIst.push( new PresiTableListModel(this._idTable) )
    this._SubTableList.next(this._tableLIst)
  }

  getTables():Observable<PresiTableListModel[]>{
    return this._SubTableList.asObservable()
  }

  joinPresiTable(id:number){

    let index = this._tableLIst.findIndex( t => t.id === id )

    if( index === -1 ) return

    this._tableLIst[index].players.push( this._userService.getPresiPlayer(id) )
    /*this._tableLIst = this._tableLIst.map( t => {} )
    t.joined = true*/

    //TODO set all joined to false then add good joined

    this._SubTableList.next(this._tableLIst)

    
  }

  quitTable(id:number){

    let ti = this._tableLIst.findIndex( t => t.id === id )

    console.log(this._tableLIst[ti])

    if( ti === -1 ) return

    let i = this._tableLIst[ti].players.findIndex( p => p.id === 1 )

    console.log(i)

    if(i === -1) return

    this._tableLIst[ti].players.splice(i,1)
    this._SubTableList.next(this._tableLIst)


  }

  sendReady(){

  }

  sendCards(){

  }

}
