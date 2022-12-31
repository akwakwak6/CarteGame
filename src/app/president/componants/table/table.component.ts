import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresiCardModel } from 'src/app/Models/President/presi.card.model';
import { PresiPlayerModel, PresiRoles } from 'src/app/Models/President/presi.player.model';
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
    this.makeMyHand()
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

    this.handTp = data.myHand
    this.centerCard = data.centerCarte
    this.showReady = data.showReady
    this.me = data.me

    this.makeMyHand()
  }

  clickOK(){
      const m = () => {
        this.presidentService.sendReady()
        //this.presidentService.sendCards([0,1,2,3])
      }
      m.bind(this)
      return m
  }

  private makeMyHand(){
    this.myHand = []

    this.myHand.push( { val:1,shaded:true,up:false,selectPrec:0 } )
    this.myHand.push( { val:2,shaded:true,up:false,selectPrec:0 } )
    this.myHand.push( { val:3,shaded:true,up:false,selectPrec:0 } )
    this.myHand.push( { val:16,shaded:false,up:false,selectPrec:1 } )
    this.myHand.push( { val:5,shaded:false,up:false,selectPrec:0 } )
    this.myHand.push( { val:6,shaded:false,up:false,selectPrec:0 } )
    this.myHand.push( { val:7,shaded:false,up:false,selectPrec:0 } )

    /*const valMin = this.centerCard.length > 0 ? getValue(this.centerCard[0]) : 0
    const nbMin = this.centerCard.length

    this.handTp.forEach( c => {

    })*/
  }
}
