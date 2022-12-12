import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './componants/table/table.component';

const routes: Routes = [
  { path: "table/:id", component : TableComponent },
  { path: "**", redirectTo:".." },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresidentRoutingModule { }
