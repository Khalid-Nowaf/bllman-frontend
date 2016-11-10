import { HomePage } from './../home/home';
import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
// pages 
import { SignupPage } from './../signup/signup';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  constructor(public vc: NavController, private fb:FormBuilder,private auth:Auth) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  buildForm(){
    this.loginForm = this.fb.group({
      phone:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }

  login() {
    let data = this.loginForm.value;
    if(this.auth.login(data.phone,data.password)) {
      this.vc.push(HomePage);
    } else {
      console.log("ERROR");
    }
  }
  signup() {
    console.log("sign in ...");
    this.vc.push(SignupPage);
  }

  forgot() {
    console.log('forgot password');
  }

}
