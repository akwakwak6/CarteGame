import { Component, Input, OnInit } from '@angular/core';
import { HandCardModel } from 'src/app/Models/President/presi.handCard.model';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent implements OnInit {

  @Input() cards : HandCardModel[] = []
  @Input() playing : boolean = true

  constructor() { }

  ngOnInit(): void {
    
  }

}
