import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresiPlayerModel, PresiRoles } from 'src/app/Models/President/presi.player.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  id : number = 0//TODO use interceptor

  hand : number[] = [ 0,1,2,3,4,5,6,7,8,23,10,36,49,47]
  centerCard : number[] = [20,33,46]

  players : PresiPlayerModel[] = []

  playing : boolean = true

  constructor(private route: ActivatedRoute,private _router: Router) {

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

  quit(){
    this._router.navigate(['..'])
  }

}
