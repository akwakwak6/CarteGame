import { Component, createComponent, Input, OnInit } from '@angular/core';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { PresiCardModel } from 'src/app/Models/President/presi.card.model';
import { PresidentService } from 'src/app/Services/president.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {


  cardes : PresiCardModel[] = []
  canMove : boolean = true

  constructor(private presidentService : PresidentService) { }

  ngOnInit(): void {
    this.presidentService.cardsObs$.subscribe( cs => {
      this.cardes = cs
      if( cs.some( c => c.up ) ){
        this.canMove = false
        setTimeout( () => this.canMove = true, 3000)
      }
    })
  }

  downCard(){
    if(!this.canMove) return
    this.cardes = this.cardes.map( c => {c.up = false;return c} )
  }

  upCard(index:number){
    if(!this.canMove) return
    if( this.cardes[index].shaded ) return
    if( !this.cardes[index].canPlay ) return
    this.cardes[index].up = true
    for(let i = 0;i<this.cardes[index].selectPrec;i++){
      this.cardes[index - i - 1].up = true
    }
  }

  selectCard(index:number){

    if(!this.canMove) return

    if( !this.cardes[index].canPlay ) return

    const cs : number[] = []

    for( let i = index; i >=index-this.cardes[index].selectPrec ; i--  ){
      cs.push( this.cardes[i].val )
    }

    this.presidentService.sendCards(cs)


  }

}
