import { Component, Input, OnInit } from '@angular/core';
import { diffValue, isSameValue } from 'src/app/share/helper/cardsHelper';
import { canPlay } from '../../utils/presiCardsUtil';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() cards : number[] = []
  @Input() playing : boolean = true
  @Input() centerCard : number[] = []

  constructor() { }

  ngOnInit(): void {
  }

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

    console.log("can send ")
  }

}
