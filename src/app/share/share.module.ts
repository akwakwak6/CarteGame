import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteComponent } from './componants/carte/carte.component';



@NgModule({
  declarations: [
    CarteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CarteComponent]
})
export class ShareModule { }
