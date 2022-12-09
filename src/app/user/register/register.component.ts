import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;

  constructor(private _fb : FormBuilder) {
    this.form = this._fb.group({
      pseudo : [null, [Validators.required]],
      password : [null, [Validators.required]],
      password2 : [null, [Validators.required]]
    }, { validators : [ this.passwordValidator ] })
  }

  ngOnInit(): void {
  }

  submit(){

    console.log(this.form.value)
    
    if(!this.form.valid){
      this.form.markAllAsTouched()
      return
    }
    
    console.log("form OK send to API")
  }

  passwordValidator(group : AbstractControl): ValidationErrors | null {

    if(group.get('password')?.value == "" || group.get('password2')?.value == "")
      return null

    if(group.get('password')?.value === group.get('password2')?.value)
      return null

    return { notsame : true }
  }

}
