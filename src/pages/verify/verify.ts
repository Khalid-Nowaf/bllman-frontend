import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the Verify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})

export class VerifyPage {
   code: string;
   phone: string;
  constructor(public navCtrl: NavController,private auth:Auth, private param: NavParams
              , private lc:LoadingController, private tc:ToastController) {
    this.code = "";
    this.phone = this.param.get('phone');
  }

  verify(){
    let loading = this.lc.create({
     content: 'Please wait...'   
    });
    loading.present();
    this.auth.verify(this.phone,this.code)
    .then( msg => {
        loading.dismiss();
        this.tc.create({
        message: msg,
        duration: 10000,
        position: 'top',
        showCloseButton: true
      }).present();
    })
    .then( () => {
      this.navCtrl.popToRoot();
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
  ionViewDidLoad() {
    console.log('Hello VerifyPage Page');
  }

}
