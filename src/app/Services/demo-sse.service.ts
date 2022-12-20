import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoSSEService {

  constructor() { }

  connect():void{
    const e  = new EventSource("http://localhost:5246/api/DemoSSE")//TODO usefull ?, { withCredentials: true }

    class Tp {
      id! : number
      name! : string 
      list! : string[]
    }

    console.log('listen sse')
    e.onmessage = (d) => {
      
      console.log(d)
      const obj : Tp= JSON.parse(d.data);
      console.log(obj)


    }
    e.onerror = (er) => {
      console.log(er)
      e.close()
    } 
  }

}
