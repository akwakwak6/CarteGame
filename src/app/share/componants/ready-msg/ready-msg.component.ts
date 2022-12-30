import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ready-msg',
  templateUrl: './ready-msg.component.html',
  styleUrls: ['./ready-msg.component.scss']
})
export class ReadyMsgComponent implements OnInit {

  @Input() fct! : () => void ;

  constructor() { }

  ngOnInit(): void {
  }

  ok(){
    this.fct()
  }

}
