import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserRegisterModel } from 'src/app/Models/User/user.register.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;

  constructor(private _fb : FormBuilder, private _usrService : UserService) {
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

    this._usrService.register(u)

  }

  passwordValidator(group : AbstractControl): ValidationErrors | null {

    if(group.get('password')?.value == "" || group.get('password2')?.value == "")
      return null

    if(group.get('password')?.value === group.get('password2')?.value)
      return null

    return { notsame : true }
  }

}
