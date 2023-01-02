import { Component, Input, OnInit } from '@angular/core';
import { PresiCardModel } from 'src/app/Models/President/presi.card.model';
import { PresidentService } from 'src/app/Services/president.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {


  cardes : PresiCardModel[] = []

  constructor(private presidentService : PresidentService) { }

  ngOnInit(): void {
    this.presidentService.cardsObs$.subscribe( cs => this.cardes = cs )
  }

  downCard(){
    this.cardes = this.cardes.map( c => {c.up = false;return c} )
  }

  upCard(index:number){
    if( this.cardes[index].shaded ) return
    this.cardes[index].up = true
    for(let i = 0;i<this.cardes[index].selectPrec;i++){
      this.cardes[index - i - 1].up = true
    }
  }

  selectCard(index:number){

    const cs : number[] = []

    for( let i = index; i >=index-this.cardes[index].selectPrec ; i--  ){
      cs.push( this.cardes[i].val )
    }

    this.presidentService.sendCards(cs)


  }

}
