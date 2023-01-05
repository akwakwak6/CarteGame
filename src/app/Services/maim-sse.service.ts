import { Injectable } from '@angular/core';
import { SETTING } from '../share/consts/Setting';

@Injectable({
  providedIn: 'root'
})
export class MaimSseService {

  private _event! : EventSource

  
  constructor() {
    
  }

  /*//TODO use observavle
  methode generique to subscribe to event from API

  para1 : event name ( object name send from API ) 
  para2 : call back mth, called when get msg from API with para of type T.  

  return : mth to remove subscribe
  */
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

  close(){
    this._event.close()
  }

}
