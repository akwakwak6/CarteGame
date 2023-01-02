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

    this.handTp = data.myHand//TODO var useless remove it send in para
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
    this.handTp = []

    this.handTp.push(53)
    this.handTp.push(0)
    this.handTp.push(1)
    this.handTp.push(2)
    this.handTp.push(5)
    this.handTp.push(3)
    this.handTp.push(16)
    this.handTp.push(13)
    this.handTp.push(4)
    this.handTp.push(5)

    this.handTp.sort( (a,b) => getValue(a) - getValue(b)  )

    this.centerCard = [2,15]
    //TODO manage 2s and jokers

    const valMin = this.centerCard.length > 0 ? getValue(this.centerCard[0]) : 0
    let lastV = -1
    let sameVal = 0
    
    this.handTp.forEach( c => {

      if( lastV === getValue(c) )
        sameVal++
      else 
        sameVal = 0
      let shaded : boolean = valMin >= getValue(c)  ||  sameVal + 1 < this.centerCard.length 
      
      if( getValue(c) == 0 ){//if is a 2 can play
        shaded = sameVal + 2 < this.centerCard.length
      }
       
      this.myHand.push( { val:c,shaded:shaded,up:false,selectPrec:sameVal } )
      lastV = getValue(c)
    })
  }
}
