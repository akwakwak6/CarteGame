import { Component, Input, OnChanges } from '@angular/core';
import { getCardPath } from '../../consts/CardsPath';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnChanges {

  @Input() cardNum : number = 0;

  path:string = ""

  constructor() { }

  ngOnChanges(): void {
    this.path = getCardPath(this.cardNum)
  }

}
