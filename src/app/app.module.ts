import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { VerifyPage } from './../pages/verify/verify';
import { ForgotPage } from './../pages/forgot/forgot';
import { ResetPage } from './../pages/reset/reset';
import { SettingsPage } from './../pages/settings/settings';
import { MyOrdersPage } from './../pages/my-orders/my-orders';
import { MyAccountPage } from './../pages/my-account/my-account';

// services
import { Auth } from './../providers/auth';
// third-p-lib


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    VerifyPage,
    ForgotPage,
    ResetPage,
    MyAccountPage,
    MyOrdersPage,
    SettingsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    VerifyPage,
    ForgotPage,
    ResetPage,
    MyAccountPage,
    MyOrdersPage,
    SettingsPage
  ],
  providers: [Auth]
})
export class AppModule {}
