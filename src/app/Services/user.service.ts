import { Injectable } from '@angular/core';
import { PlayerModel } from '../Models/player.model';
import { PresiPlayerModel } from '../Models/President/presi.player.model';
import { UserModel } from '../Models/User/user.login.model';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '../Models/User/user.sendLogin.model';
import { UserRegisterModel } from '../Models/User/user.register.model';
import { SETTING } from '../share/consts/Setting';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url : string = SETTING.URL_API + "User/";

  private _user = new BehaviorSubject<UserModel | null>(null);

  user = this._user.asObservable()

  constructor(private _httpClient : HttpClient) { }

  login(u:UserLoginModel):Observable<Boolean>{
    const subjet = new Subject<boolean>()
    this._httpClient.post<UserModel>(this._url+"login",u).subscribe( {
      next : r => {
        this.logIn(r)
        subjet.next(true)
      },
      error : e => {
        console.log(e)
        subjet.next(false)
      }
      
    })
    return subjet.asObservable()
  }

  register(u:UserRegisterModel):Observable<Boolean>{//TODO if faild ?
    const subjet = new Subject<boolean>()
    this._httpClient.post<UserModel>(this._url+"register",u).subscribe({
      next : r => {
        this.logIn(r)
        subjet.next(true)
      },
      error : e => {
        console.log(e)
        subjet.next(false)
      }
    })
    return subjet.asObservable()
  }

  private logIn(u : UserModel){//TODO if login faild ?
    console.log(u);
    this._user.next(u)
    localStorage.setItem('token', u.token);
    //this._router.navigate( [ "/home" ] )
  }

  logOut(){
    localStorage.removeItem('token');
    this._user.next(null)
  }

}
