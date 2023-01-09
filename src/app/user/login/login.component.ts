import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/Models/User/user.sendLogin.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  loginError : boolean = false

  constructor(private _fb : FormBuilder, private _userService : UserService,private _router : Router) {
    this.loginForm = this._fb.group({
      pseudo : ["a", [Validators.required]],//TODO change value "a" by null and add min value and more complex pwd and ...
      password : ["a", [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  login(){
    this.loginError = false
    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched()
      return
    }
    const ul : UserLoginModel = {pwd:this.loginForm.value.password, pseudo:this.loginForm.value.pseudo}
    this._userService.login(ul).subscribe( (r:Boolean) => {
      if(r){
        this._router.navigate( [ "/home" ] )
      }else{
        this.loginForm.reset()
        this.loginError = true;
      }
    })
    
  }

}
