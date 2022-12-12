import { Injectable } from '@angular/core';
import { PlayerModel } from '../Models/player.model';
import { PresiPlayerModel } from '../Models/President/presi.player.model';
import { UserModel } from '../Models/User/user.login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user : UserModel | null = null
  private _player : PlayerModel | null = null

  constructor() { }

  login(){

  }

  register(){

  }

  getPresiPlayer(tableId : number):PlayerModel{
    this._player = this._user === null ? this._player = new PresiPlayerModel(1,"Visitor_1") : new PresiPlayerModel(this._user.id,this._user.pseudo)
    //TODO use subject => next here
    return this._player
  }

}
