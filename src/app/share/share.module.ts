import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteComponent } from './componants/carte/carte.component';
import { ReadyMsgComponent } from './componants/ready-msg/ready-msg.component';

@NgModule({
  declarations: [
    CarteComponent,
    ReadyMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CarteComponent,ReadyMsgComponent]
})
export class ShareModule { }
