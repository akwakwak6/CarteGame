import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private _fb : FormBuilder, private _userService : UserService,private _router : Router) {
    this.loginForm = this._fb.group({
      pseudo : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  login(){
    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched()
      return
    }

    console.log("form OK send to API")
    
  }

}
