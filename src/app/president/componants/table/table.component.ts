
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresiCardModel } from 'src/app/Models/President/presi.card.model';
import { PresiPlayerModel } from 'src/app/Models/President/presi.player.model';
import { PresiTableModel } from 'src/app/Models/President/presi.table.model';
import { PresidentService } from 'src/app/Services/president.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  centerCard : number[] = []
  players : PresiPlayerModel[] = []
  showReady : boolean = false
  me : PresiPlayerModel|null = null

  constructor(private route: ActivatedRoute,private _router: Router,private presidentService : PresidentService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      this.presidentService.joinPresiTable( Number( params.get('id') ) ).subscribe( t => this.update(t) )
    });
  }

  quit(){
    this._router.navigate(['..'])
  }

  private update(data:PresiTableModel){    
    this.players = data.players
    this.centerCard = data.centerCarte
    this.showReady = data.showReady
    this.me = data.me
  }

  clickOK(){
      const m = () => {
        this.presidentService.sendReady()
      }
      m.bind(this)
      return m
  }

  pass(){
    this.presidentService.sendCards([])
  }

  ngOnDestroy() {
    this.presidentService.quitTable()
  }
  
}
