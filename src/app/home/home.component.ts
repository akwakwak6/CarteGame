import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { presiTablesListModel } from '../Models/President/presi.tablesList.model';
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

  constructor(private presidentService : PresidentService,private usrSer : UserService,private sseSrv : MaimSseService, private router : Router ){ 

  }

  ngOnInit(): void {
    console.log(" init home ")
    this.sseUnsubMth = this.sseSrv.subscribe<presiTablesListModel>( "PresiTableList" , (e : presiTablesListModel) => {
      this.presiTableLIst = e.tables 
      console.log(this.presiTableLIst)
    })
    //this.presidentService.getTables().subscribe( t => this.presiTableLIst = t )
    this.obs = this.usrSer.user.subscribe(u => {this.user = u});
  }

  addPresiTable(){
    this.presidentService.createTable()
  }

  joinPresiTable(id:number){
    this.router.navigate( [ "presi/table/"+id ] )
  }

  leaveTable(){
    this.presidentService.quitTable()
  }

  ngOnDestroy() {
    this.obs.unsubscribe()
    this.sseUnsubMth()
  }

}
