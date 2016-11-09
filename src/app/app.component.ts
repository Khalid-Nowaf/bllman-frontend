import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
//serives
import { Auth } from './../providers/auth';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  constructor(platform: Platform,private auth:Auth) {
    platform.ready().then(() => {
      this.rootPage = this.auth.isAuth ? HomePage : LoginPage
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
