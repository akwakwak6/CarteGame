import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresiPlayerModel, PresiRoles } from 'src/app/Models/President/presi.player.model';
import { PresiTableModel } from 'src/app/Models/President/presi.table.model';
import { PresidentService } from 'src/app/Services/president.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tableID : number = 0

  hand : number[] = [ 0,1,2,3,4,5,6,7,8,23,10,36,49,47]
  centerCard : number[] = [12]
  players : PresiPlayerModel[] = []
  showReady : boolean = false
  me : PresiPlayerModel|null = null

  constructor(private route: ActivatedRoute,private _router: Router,private presidentService : PresidentService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tableID = Number( params.get('id') )
      this.presidentService.joinPresiTable(this.tableID,this.update.bind(this))
      console.log("joinPresiTable");
    });
  }

  quit(){
    this._router.navigate(['..'])
  }

  private update(data:PresiTableModel){
    console.log( data )
    
    this.players = data.players

    console.log(this.players)

    this.hand = data.myHand
    this.centerCard = data.centerCarte
    this.showReady = data.showReady
    this.me = data.me
  }

  clickOK(){
      const m = () => {
        this.presidentService.sendReady()
        //this.presidentService.sendCards([0,1,2,3])
      }
      m.bind(this)
      return m
  }
}
