import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HandCardModel } from 'src/app/Models/President/presi.handCard.model';
import { PresiPlayerModel, PresiRoles } from 'src/app/Models/President/presi.player.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  id : number = 0//TODO use interceptor

  hand : HandCardModel[] = [  new HandCardModel(1),new HandCardModel(2),new HandCardModel(3),new HandCardModel(4),new HandCardModel(5),new HandCardModel(6),
                              new HandCardModel(7,true),new HandCardModel(8,true),new HandCardModel(9,true),new HandCardModel(10,true)]
  centerCard : number[] = [53,54]

  players : PresiPlayerModel[] = []

  playing : boolean = true

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
