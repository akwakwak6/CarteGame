import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { UserModel } from '../Models/User/user.login.model';
import { DemoSSEService } from '../Services/demo-sse.service';
import { PresidentService } from '../Services/president.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  presiTableLIst : PresiTableListModel[] = []

  user : UserModel | null = null

  private obs! : Subscription;

  constructor(private presidentService : PresidentService,private demoSse:DemoSSEService, private usrSer : UserService ){ 
    demoSse.connect()
  }

  ngOnInit(): void {
    this.presidentService.getTables().subscribe( t => this.presiTableLIst = t )
    this.obs = this.usrSer.user.subscribe(u => {
      console.log("user ")
      console.log(u)
      this.user = u
    });
  }

  addPresiTable(){
    this.presidentService.createTable()
  }

  joinPresiTable(id:number){
    this.presidentService.joinPresiTable(id)
  }

  leaveTable(id:number){
    this.presidentService.quitTable(id)
  }

  leaveTableIndex(index:number){
    this.presidentService.quitTableIndex(index)
  }

  sseTeam(){
    this.demoSse.CreateTeam()
  }

  getTeams(){
    this.demoSse.getAllTeams()
  }

  JoinTeam(){
    this.demoSse.JoinTeam()
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}
