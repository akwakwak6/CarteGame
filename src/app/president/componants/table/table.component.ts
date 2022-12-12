import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresiPlayerModel, PresiRoles } from 'src/app/Models/President/presi.player.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  id : number = 0//TODO use interceptor

  hand : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13]
  centerCard : number[] = [53,54]

  players : PresiPlayerModel[] = []

  constructor(private route: ActivatedRoute) {

    this.players = [
      new PresiPlayerModel(1,"p1"),
      new PresiPlayerModel(1,"p2",5),
      new PresiPlayerModel(1,"p3",3,PresiRoles.Bum),
      new PresiPlayerModel(1,"p4",1,PresiRoles.President)
    ]

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number( params.get('id') )
    });
  }

}
