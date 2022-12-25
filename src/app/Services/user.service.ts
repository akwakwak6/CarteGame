import { Injectable } from '@angular/core';
import { PlayerModel } from '../Models/player.model';
import { PresiPlayerModel } from '../Models/President/presi.player.model';
import { UserModel } from '../Models/User/user.login.model';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../Models/User/user.sendLogin.model';
import { UserRegisterModel } from '../Models/User/user.register.model';
import { SETTING } from '../share/consts/Setting';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url : string = SETTING.URL_API + "User/";

  private _user = new BehaviorSubject<UserModel | null>(null);

  user = this._user.asObservable()

  constructor(private _httpClient : HttpClient) { }

  login(u:UserLoginModel){
    this._httpClient.post<UserModel>(this._url+"login",u).subscribe( (r: UserModel) => this.logIn(r) )
  }

  register(u:UserRegisterModel){
    this._httpClient.post<UserModel>(this._url+"register",u).subscribe( (r: UserModel) => this.logIn(r) )
  }

  private logIn(u : UserModel){

    console.log(u);
    this._user.next(u)
    localStorage.setItem('token', u.token);

  }

  private logOut(){
    localStorage.removeItem('token');
    this._user.next(null)
  }

  /*
  getPresiPlayer(tableId : number):PlayerModel{
    this._player = this._user === null ? this._player = new PresiPlayerModel(1,"Visitor_1") : new PresiPlayerModel(this._user.id,this._user.pseudo)
    //TODO use subject => next here
    return this._player
  }*/

}
