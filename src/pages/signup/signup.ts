import { Auth } from './../../providers/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm:FormGroup;
  constructor(public navCtrl: NavController, private fb: FormBuilder, private auth: Auth) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('Hello SignupPage Page');
  }

  buildForm(){
    this.signupForm = this.fb.group({
      name:["",[Validators.required, Validators.minLength(2)]],
      areaCode:["",[Validators.required]],
      phone:["",[Validators.required]],
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    });
  }

  signup(){
   let user = this.signupForm.value;
   if(this.auth.signup(user.name,user.phone,user.areaCode,user.email,user.password)){
     console.log(" sign up ok");
   } else {
     console.log("sing up error");
   }
  }

}
