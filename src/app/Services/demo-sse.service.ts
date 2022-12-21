import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoSSEService {

  constructor(private _httpClient : HttpClient) { }

  Teams : string[] = []

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
    }

    e.addEventListener( "Tp" ,  e => {
      console.log(e)
      const obj : Tp= JSON.parse(e.data);
      console.log(obj)
    } )

    e.onerror = (er) => {
      console.log(er)
      e.close()
    } 
  }

  CreateTeam():void{
    
    const e  = new EventSource("http://localhost:5246/api/DemoSSE/createTeam")

    class Tp {
      id! : number
      name! : string 
      list! : string[]
    }

    console.log('listen my sse Team')
    e.onmessage = (d) => {
      console.log(d)
    }

    e.addEventListener( "Tp" ,  e => {
      console.log(e)
      const obj : Tp= JSON.parse(e.data);
      console.log(obj)
    } )

    e.onerror = (er) => {
      console.log(er)
      e.close()
    } 
    
  }

  getAllTeams(){
    this._httpClient.get<string[]>("http://localhost:5246/api/DemoSSE/teams").subscribe( t => {
      this.Teams = t
      console.log(this.Teams)
    })
  }

  JoinTeam(){
    console.log(this.Teams)
    const e  = new EventSource("http://localhost:5246/api/DemoSSE/joinTeam?teamId="+this.Teams[0])

    console.log('listen my team')
    e.onmessage = (d) => {
      console.log(d)
    }

    e.onerror = (er) => {
      console.log(er)
      e.close()
    } 

  }

}
