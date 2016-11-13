import { Auth } from './../../providers/auth';
import { ResetPage } from './../reset/reset';
import { Component, Input } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';

/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  phone: string;
  newPassword: string;
  resetModel: Modal;
  submitted: boolean;
  code: string;
  constructor(public nc: NavController, private auth: Auth, public mc: ModalController) {
    this.phone = "";
    this.newPassword = "";
    this.code = "";
    this.submitted = false;
  }

  ionViewDidLoad() {
    console.log('Hello ForgotPage Page');
  }


  buildresetModal() {
    this.resetModel = this.mc.create(ResetPage,{auth:this.auth,phone:this.phone});
    this.resetModel.onDidDismiss(data => {
      this.auth.resetPassword(this.phone, data.newPassword, data.code)
        .then(msg => {
          console.log(msg);
          this.nc.pop();
        })
        .catch(errmsg => {
          console.log(errmsg);
        })
    })
  }

  forgot() {
    console.log("forgot() !!"); 
   this.auth.forgotPassword(this.phone)
   .then(msg => {
     console.log(msg);
     this.buildresetModal();
     this.resetModel.present();
   })
   .catch(errmsg => {
     console.log(errmsg);
   })
  }
}
