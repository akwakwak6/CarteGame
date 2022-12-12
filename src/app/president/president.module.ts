import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresidentRoutingModule } from './president-routing.module';
import { TableComponent } from './componants/table/table.component';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    PresidentRoutingModule
  ]
})
export class PresidentModule { }
