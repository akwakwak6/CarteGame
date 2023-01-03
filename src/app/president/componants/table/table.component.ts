
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresiCardModel } from 'src/app/Models/President/presi.card.model';
import { PresiPlayerModel } from 'src/app/Models/President/presi.player.model';
import { PresiTableModel } from 'src/app/Models/President/presi.table.model';
import { PresidentService } from 'src/app/Services/president.service';
import { getValue } from 'src/app/share/helper/cardsHelper';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  myHand : PresiCardModel[] = []
  tableID : number = 0

  handTp : number[] = []
  centerCard : number[] = []
  players : PresiPlayerModel[] = []
  showReady : boolean = false
  me : PresiPlayerModel|null = null

  constructor(private route: ActivatedRoute,private _router: Router,private presidentService : PresidentService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      this.tableID = Number( params.get('id') )
      this.presidentService.joinPresiTable(this.tableID).subscribe( t => this.update(t) )
      console.log("joinPresiTable");
    });
  }

  quit(){
    this._router.navigate(['..'])
  }

  private update(data:PresiTableModel){
    console.log( data )
    
    this.players = data.players
    //this.handTp = data.myHand//TODO var useless remove it send in para
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

  pass(){
    this.presidentService.sendCards([])
  }

  
}
