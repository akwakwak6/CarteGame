import { Component, Input, OnInit } from '@angular/core';
import { PresiCardModel } from 'src/app/Models/President/presi.card.model';
import { PresidentService } from 'src/app/Services/president.service';
import { diffValue, isSameValue } from 'src/app/share/helper/cardsHelper';
import { canPlay } from '../../utils/presiCardsUtil';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {


  cardes : PresiCardModel[] = []

  constructor(private presidentService : PresidentService) { }
  /*@Input() cards : number[] = []
  @Input() playing : boolean = true
  @Input() centerCard : number[] = []

  
constructor(private presidentService : PresidentService) { }
  

  getClass(i:number):string{

    //TODO : redo this code, use Attribute directives : be able to use several decks ( means can have 13 times same cards no way to do 13 class in css )
    if( !this.playing ) return ""
    if( i < this.cards.length - 3 && isSameValue(this.cards[i],this.cards[i+3]) && canPlay([this.cards[i],this.cards[i+1],this.cards[i+2],this.cards[i+3]],this.centerCard) )  return "cuatro"
    if( i < this.cards.length - 2 && isSameValue(this.cards[i],this.cards[i+2]) && canPlay([this.cards[i],this.cards[i+1],this.cards[i+2]],this.centerCard) )  return "tres"
    if( i < this.cards.length - 1 && isSameValue(this.cards[i],this.cards[i+1]) && canPlay([this.cards[i],this.cards[i+1]],this.centerCard) )  return "dos"
    if( canPlay([this.cards[i]],this.centerCard) )  return "uno"
    else return "lock"

  }

  selectCard(index:number){
    //TODO test for DEV, really redo handComp Code
    console.log(index)
    if(this.getClass(index) === "" || this.getClass(index) === "lock" )
      return

    this.presidentService.sendCards([this.cards[index]]);
    console.log("can send ")
  }*/

  ngOnInit(): void {
    //this.cardes.forEach( c => console.log(` ${c.val} ${c.shaded} ${c.up} ${c.selectPrec} `) )
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
