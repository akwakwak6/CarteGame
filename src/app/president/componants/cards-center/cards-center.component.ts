import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-center',
  templateUrl: './cards-center.component.html',
  styleUrls: ['./cards-center.component.scss']
})
export class CardsCenterComponent implements OnInit {

  @Input() cards : number[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
