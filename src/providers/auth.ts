import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import  'rxjs/add/operator/map';
import { NativeStorage } from 'ionic-native';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  public static user = { name: "", phone: "", areacode: "", email: "", last_loc: "", token: "", code: "", isVerify: "" };
  // a dummy array act as DB for mockingup the service 
  public static users = [];
  public isAuth: boolean;

  constructor(public http: Http) {
   
    console.log("auth service is here ");
    
  }

  AuthInit(): Promise<any> {
    // check if the user were logged in before ?
   return NativeStorage.getItem('userToken')
      .then(
      token => { Auth.user.token = token; this.isAuth = true; console.log('token is' + token) }, //TODO: deep check if user is exist and valid !
      error => { console.log(error); this.isAuth = false; console.log(error)}
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
  signup(name: string, phone: string, areacode: string, email: string, password: string): Promise<any> {
    if (Auth.users[phone]) {
      return Promise.reject("Phone number exist");
    } else {
      return new Promise((res, rej) => {
        let user = { name, phone, areacode, email, password, token: 'secret', last_loc: '', code: '', isVerify: false };
        Auth.users[phone] = user;

        this.sendCode(phone).then( msg => {
          res("User Account created, and " +msg);
        }).catch(err => {
          rej(" Error accure while sending verifaction code to +966" + phone);
        });
      });
    }
  }
  /**
   * @param  {string} phone
   * @param  {string} password
   * @returns boolean
   */
  login(phone: string, password: string): Promise<any> {

    if (Auth.users[phone] &&                   // if exist
      (Auth.users[phone].password == password // if match password
        && Auth.users[phone].isVerify)) {         // if verify
      // a bug could accures here --------------------------------
      Auth.user = Auth.users[phone];

      let saveuser = NativeStorage.setItem('user', Auth.user);
      let savetoken = NativeStorage.setItem('userToken', 'secret');

      return Promise.all([saveuser, savetoken])
        .catch(err => { return Promise.reject(err) });
    }
    else {
      return Promise.reject("User not Auth or does not exist ...")
    }
  }

  /**
   * @param  {string} phone
   * @returns Promise<any>
   */
  sendCode(phone: string): Promise<any> {
    let code = Math.floor(Math.random() * 1000) + 9999
    Auth.users[phone].code = code;
    console.log('Code is => ' + code);
    return Promise.resolve(" A verification code has been sent to +966" + phone);
  }
  /**
   * @param  {string} phone
   * @param  {string} code
   * @returns Promise<any>
   */
  verify(phone: string, code: string): Promise<any> {
    console.log(phone +" => "+ code );
    if (Auth.users[phone]) {
      return new Promise((res, rej) => {
        if (Auth.users[phone].code == code){
          Auth.users[phone].isVerify = true;
          res(" The account sesussfuly has been verified");
        }
        else
          rej("The verivication code does not match ..");
      })
    }else {
      return Promise.reject('The phone number is not valid');
    }

  }
  /**
   * @param  {string} phone
   * @returns Promise<any>
   */
  forgotPassword(phone: string): Promise<any> {
    return this.sendCode(phone);
  }

  /**
   * @param  {string} phone
   * @param  {string} newpassword
   * @param  {string} code
   * @returns Promise<any>
   */
  resetPassword(phone: string, newpassword: string, code: string): Promise<any> {
    console.log('resetpassword');
    return Promise.reject(' not implemited ');
  };

  logout(): Promise<any> {
    this.isAuth = false;
    return NativeStorage.remove('userToken');
  }



}

