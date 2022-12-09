import { Component, OnInit } from '@angular/core';
import { PresiTableListModel } from '../Models/President/presi.tableList.model';
import { PresidentService } from '../Services/president.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  presiTableLIst : PresiTableListModel[] = []

  constructor(private presidentService : PresidentService ){ 
  }

  ngOnInit(): void {
    this.presidentService.getTables().subscribe( t => this.presiTableLIst = t )
  }

  addPresiTable(){
    this.presidentService.createTable()
  }

  joinPresiTable(id:number){
    this.presidentService.joinPresiTable(id)
  }

}
