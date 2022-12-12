import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PresiPlayerModel,PresiRoles } from 'src/app/Models/President/presi.player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges {

  @Input() player!: PresiPlayerModel;
  roleStr : string = ""

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.roleStr = PresiRoles[this.player.role]
  }

  ngOnInit(): void {
  }

}
