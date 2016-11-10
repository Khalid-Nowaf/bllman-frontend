import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
// services
import { Auth } from './../providers/auth';
// third-p-lib


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  providers: [Auth]
})
export class AppModule {}
