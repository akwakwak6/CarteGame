import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { UserModel } from '../Models/User/user.login.model';
import { UserLoginModel } from '../Models/User/user.sendLogin.model';
import { MaimSseService } from '../Services/maim-sse.service';
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

  private obs! : Subscription
  private sseUnsubMth! : () => void

  constructor(private presidentService : PresidentService,private usrSer : UserService,private sseSrv : MaimSseService ){ 

  }

  ngOnInit(): void {
    this.sseUnsubMth = this.sseSrv.subscribe<UserModel>( "UserLoginModel" , (e : UserModel) => console.log(e.pseudo) )
    //this.presidentService.getTables().subscribe( t => this.presiTableLIst = t )
    this.obs = this.usrSer.user.subscribe(u => {this.user = u});
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

  ngOnDestroy() {
    this.obs.unsubscribe()
    this.sseUnsubMth()
  }

}
