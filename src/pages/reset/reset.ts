import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the Reset page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html'
})
export class ResetPage {

  code: string;
  newPassword: string;
  constructor(public vc: ViewController, public params:NavParams) {
    this.code = "";
    this.newPassword = ""; 
  }

  ionViewDidLoad() {
    console.log('Hello ResetPage Page');
  }

  reset() {
    let phone = this.params.get('phone');
    let auth: Auth = this.params.get('auth');
    auth.isCodeMatch(phone,this.code)
    .then(msg => {
      console.log(msg);
      this.vc.dismiss({code:this.code,newPassword:this.newPassword});
    })
    .catch(errmsg => {
      console.log(errmsg);
    })
  }

}
