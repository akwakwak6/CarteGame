import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './Services/token-interceptor.interceptor';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule
  ],
  providers: [
    //multi : true => Pour indiquer que votre interceptor injecté en transiant , multi : true
    { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor , multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
