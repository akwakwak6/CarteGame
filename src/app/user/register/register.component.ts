import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterModel } from 'src/app/Models/User/user.register.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form : FormGroup
  loginError : boolean = false

  constructor(private _fb : FormBuilder, private _usrService : UserService,private _router : Router) {
    this.form = this._fb.group({
      pseudo : ["aa", [Validators.required]],//TODO remove default value by null
      password : ["aa", [Validators.required]],
      password2 : ["aa", [Validators.required]]
    }, { validators : [ this.passwordValidator ] })
  }

  ngOnInit(): void {
  }

  submit(){
    
    if(!this.form.valid){
      this.form.markAllAsTouched()
      return
    }

    const u : UserRegisterModel = {
      pseudo : this.form.value.pseudo,
      pwd : this.form.value.password
    }

    this._usrService.register(u).subscribe( (r:Boolean) => {
      if(r){
        this._router.navigate( [ "/home" ] )
      }else{
        this.form.reset()
        this.loginError = true;
      }
    })

  }

  passwordValidator(group : AbstractControl): ValidationErrors | null {

    if(group.get('password')?.value == "" || group.get('password2')?.value == "")
      return null

    if(group.get('password')?.value === group.get('password2')?.value)
      return null

    return { notsame : true }
  }

}
