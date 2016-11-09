import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from 'ionic-native';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  public static  user = {name:"", phone:"", email:"", last_loc:"",token:"",code:"",isVerify:""};
  // a dummy array act as DB for mockingup the service 
  public static users = [];
  public isAuth:boolean;
  constructor(public http: Http) {
    // check if the user were logged in before ?
    NativeStorage.getItem('userToken')
    .then(
      token => { Auth.user.token = token; this.isAuth = true }, //TODO: deep check if user is exist and valid !
      error => { console.log(error); this.isAuth = false}
    );
  }
  
  
  /**
   * @param  {string} name
   * @param  {string} phone
   * @param  {string} areacode
   * @param  {string} email
   * @param  {string} password
   * @returns boolean
   */
  signup(name:string ,phone:string ,areacode:string ,email:string ,password:string) {
    console.log("signup");
  }
  /**
   * @param  {string} phone
   * @param  {string} password
   * @returns boolean
   */
  login(phone: string, password: string): boolean {

    if (Auth.users[phone] &&                   // if exist
      (Auth.users[phone].password == password // if match password
        && Auth.users[phone].isVerify)) {         // if verify
      // a bug could accures here --------------------------------
      Auth.user = Auth.users[phone];
      // save data 
      let saveuser = NativeStorage.setItem('user', Auth.user);
      let savetoken = NativeStorage.setItem('token', 'secret');
      // wait promises
      Promise.all([saveuser, savetoken])
        .then(() => {
          return true;
        })
        .catch(() => {
          console.log("Error on user data saving data");
          return false
        })

    }
    else {
      console.log("User not Auth or does not exist ...");
      return false;
    }
  }

  /**
   * @param  {string} phone
   * @returns boolean
   */
  sendCode(phone:string):boolean{
    console.log('sendcode');
    return false;
  }
  /**
   * @param  {string} phone
   * @param  {string} code
   * @returns boolean
   */
  verify(phone:string, code:string):boolean {
    console.log('verify code');
    return false;
  }
  /**
   * @param  {string} phone
   * @returns boolean
   */
  forgotPassword(phone:string):boolean {
    this.sendCode(phone);
    console.log('forgotpassword');
    return false;
  }
  
  /**
   * @param  {string} phone
   * @param  {string} newpassword
   * @param  {string} code
   * @returns boolean
   */
  resetPassword(phone:string, newpassword:string, code:string):boolean{
    console.log('resetpassword');
    return false;
  };



}
