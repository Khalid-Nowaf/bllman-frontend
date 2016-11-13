import { SettingsPage } from './../pages/settings/settings';
import { MyAccountPage } from './../pages/my-account/my-account';
import { MyOrdersPage } from './../pages/my-orders/my-orders';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import {StatusBar, Splashscreen } from 'ionic-native';
//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
//serives
import { Auth } from './../providers/auth';



@Component({
  templateUrl:'app.html'
})
export class MyApp { 
  @ViewChild("content") nav : NavController;
rootPage;
home = HomePage;
myOrders = MyOrdersPage;
myAccount = MyAccountPage;
settings = SettingsPage;

 
  constructor(platform: Platform,private auth:Auth, private menu: MenuController) {
   
    platform.ready().then(() => {
      this.auth.AuthInit()
      .then( ( () => this.rootPage = this.auth.isAuth ? HomePage:  LoginPage ))
      .catch( err => console.log(err));
      this.menu.enable(false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

     openPage(page) {
       this.menu.close();
       this.nav.setRoot(page,{animate: true, direction: 'back'});
    }

    about() {
      this.menu.close();
      console.log('about');
    }

    call() {
      this.menu.close()
      console.log('call');
    }

    rate() {
      this.menu.close()
       console.log('rate');
    }

    logout() {
      this.menu.close();
      this.auth.logout()
      .then(msg => {
         console.log(msg);
         this.nav.setRoot(LoginPage,{animate: true, direction: 'back'})
      })
      .catch(errmsg => {
        console.log(errmsg);
      })
    }
}
