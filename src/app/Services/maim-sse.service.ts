import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SETTING } from '../share/consts/Setting';

@Injectable({
  providedIn: 'root'
})
export class MaimSseService {

  private _event : EventSource

  constructor() {
    this._event = new EventSource(SETTING.URL_API + "MainSse")
    this._event.onerror= (er) => {
      console.log(er)
      this._event.close()
    }
  }

  subscribe<T>(object : string, mth : (object : T) => void): () => void{
    const t = (d:any) => {
      mth(JSON.parse(d.data))
    }  

    this._event.addEventListener(object,t)

    return () => this._event.removeEventListener(object,t)
  }

}
