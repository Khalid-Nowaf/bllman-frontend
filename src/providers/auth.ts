import { Injectable, EventEmitter } from '@angular/core';
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
  public static user = { name: "", phone: "", areacode: "", email: "", last_loc: "", token: "", code: "", isVerify: "" };
  // a dummy array act as DB for mockingup the service 
  public static users = [];
  public isAuth: boolean;

  constructor(public http: Http) {

    console.log("auth service is here ");
    // create dummy user 
    let user = { name: 'khalid', phone: '561031000', areacode: '+966', email: 'test@test.com', token: 'secret', last_loc: '', code: '', isVerify: false };
    Auth.users[user.phone] = user;

  }

  AuthInit(): Promise<any> {
    // check if the user were logged in before ?
    return NativeStorage.getItem('userToken')
      .then(
      token => { Auth.user.token = token; this.isAuth = true; console.log('token is' + token) }, //TODO: deep check if user is exist and valid !
      error => { console.log(error); this.isAuth = false; console.log(error) }
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

        this.sendCode(phone).then(msg => {
          res("User Account created, and " + msg);
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

    return new Promise((res, rej) => {
      this.userExist(phone)
        .then(msg => {
          if (Auth.users[phone].password != password)
            return rej('Wrong password');
          else if (!Auth.users[phone].isVerify)
            return rej('your account has not been verified yet');
          else {
            // a bug could accures here --------------------------------
            Auth.user = Auth.users[phone];
            let saveuser = NativeStorage.setItem('user', Auth.user);
            let savetoken = NativeStorage.setItem('userToken', 'secret');

            Promise.all([saveuser, savetoken])
              .then(msg => {
                res('Auth user ');
              })
              .catch(err => {
                rej(err)
              });
          }
        }).catch(errmsg => {
          rej(errmsg);
        })
    })
  }

  /**
   * @param  {string} phone
   * @returns Promise<any>
   */
  sendCode(phone: string): Promise<any> {
    return new Promise((res, rej) => {
      this.userExist(phone)
        .then(msg => {
          let code = Math.floor(Math.random() * 1000) + 9999
          Auth.users[phone].code = code;
          console.log('Code is => ' + code);
          res(" A verification code has been sent to +966" + phone);
        })
        .catch(errmsg => {
          rej(errmsg)
        })
    })
  }

  /**
   * @param  {string} phone
   * @param  {string} code
   * @returns Promise
   */
  isCodeMatch(phone: string, code: string): Promise<any> {
    return new Promise((res, rej) => {
      this.userExist(phone).then(msg => {
        if (Auth.users[phone].code == code) {
          res(" The verivication code matched");
        }
        else
          rej("The verivication code does not matched ..");
      }).catch(errmsg => {
        rej(errmsg)
      });
    })
  }

  /**
   * @param  {string} phone
   * @param  {string} code
   * @returns Promise<any>
   */
  verify(phone: string, code: string): Promise<any> {
    return new Promise((res, rej) => {
      this.isCodeMatch(phone, code)
        .then(msg => {
          Auth.users[phone].isVerify = true;
          res(" The account sesussfuly has been verified");
        }).catch(errmsg => {
          rej(errmsg);
        });
    });
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
    return new Promise((res, rej) => {
      this.verify(phone, code)
        .then(msg => {
          Auth.users[phone].password = newpassword;
          return res('Password has been updated');
        })
        .catch(errmsg => {
          return rej(errmsg);
        })
    })

  }

  /**
   * @param  {string} phone
   * @returns Promise
   */
  userExist(phone: string): Promise<any> {
    if (Auth.users[phone])
      return Promise.resolve('user exists')
    else return Promise.reject(" the phone number does not exists");
  }

  /**
   * @returns Promise
   */
  logout(): Promise<any> {
    this.isAuth = false;
    return NativeStorage.remove('userToken');
  }



}

