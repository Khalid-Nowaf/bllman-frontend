import { LoginPage } from './../../../.tmp/pages/login/login';
import { Auth } from './../../providers/auth';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: Auth) {

  }

  logout() {
    this.auth.logout()
      .then(() => {
       this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'back'});
      })
      .catch(err => {
        console.log(err);
      });
  }
}
