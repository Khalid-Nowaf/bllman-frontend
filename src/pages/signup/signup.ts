import { VerifyPage } from './../verify/verify';
import { Auth } from './../../providers/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';


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
  constructor(public navCtrl: NavController, private fb: FormBuilder, 
  private auth: Auth, private tc: ToastController, private lc:LoadingController) {
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

    let loading = this.lc.create({
                  content: 'Please wait...'
                  });

    loading.present();
   let user = this.signupForm.value;
   this.auth.signup(user.name,user.phone,user.areaCode,user.email,user.password)
   .then( msg => {
        loading.dismiss();
        this.tc.create({
        message: msg,
        duration: 10000,
        position: 'top',
        showCloseButton: true
      }).present();
   }).then(() => {
     this.navCtrl.push(VerifyPage,{phone:user.phone});
   })
   .catch(errmsg => {
     loading.dismiss(); 
     this.tc.create({
        message: errmsg,
        duration: 10000,
        position: 'top',
        showCloseButton: true
      }).present();
   })
   
  }

}
