import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: "", component : HomeComponent },
  { path: "user", loadChildren : () => import("../app/user/user.module").then(m => m.UserModule) },
  { path: "presi", loadChildren : () => import("../app/president/president.module").then(m => m.PresidentModule) },
  { path : "**", redirectTo : ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
