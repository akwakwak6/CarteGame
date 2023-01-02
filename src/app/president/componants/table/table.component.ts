
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

    this.myHand = []
    const valMin = this.centerCard.length > 0 ? getValue(this.centerCard[0]) : 0
    const nbCenter =  this.centerCard.length

    let lastV = -1
    let sameVal = 0
 
    let cptCanPlay = 0
    
    this.handTp.forEach( c => {

      if( lastV === getValue(c) )
        sameVal++
      else 
        sameVal = 0


        /*
          can play card if val is greater and nbCard grerater or equal ( nb card means cards with same value ) OR val equal and nbcard greater
        */

      let shaded : boolean = ! ( (getValue(c) > valMin && sameVal + 1 >= nbCenter ) || ( getValue(c) >= valMin && sameVal + 1 > nbCenter ) )

      if( getValue(c) == 0 ){//TODO use enum : if is a 2 can play
        shaded = sameVal + 2 < nbCenter
      }

      if( !shaded ) 
        cptCanPlay++
       
      this.myHand.push( { val:c,shaded:shaded,up:false,selectPrec:sameVal } )
      lastV = getValue(c)
    })
    return cptCanPlay
  }
}
