import { HomePage } from './../home/home';
import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
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
  constructor(public vc: NavController, private fb:FormBuilder,private auth:Auth,
  private tc: ToastController, private lc:LoadingController) {
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
    let loading = this.lc.create({
                  content: 'Please wait...'
                  });
    loading.present()
    let data = this.loginForm.value;
    this.auth.login(data.phone,data.password)
    .then(msg => {
      loading.dismiss();
      this.tc.create({
        message: msg,
        duration: 10000,
        position: 'top',
        showCloseButton: true
      }).present();
      this.vc.push(HomePage); 
    })
    .catch(errmsg => { 
       loading.dismiss();
        this.tc.create({
        message: errmsg,
        duration: 10000,
        position: 'top',
        showCloseButton: true
      }).present();
    });
  }
  signup() {
    console.log("sign in ...");
    this.vc.push(SignupPage);
  }

  forgot() {
    console.log('forgot password');
  }

}
