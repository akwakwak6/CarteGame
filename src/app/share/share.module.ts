import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteComponent } from './componants/carte/carte.component';
import { HandComponent } from './componants/hand/hand.component';



@NgModule({
  declarations: [
    CarteComponent,
    HandComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
