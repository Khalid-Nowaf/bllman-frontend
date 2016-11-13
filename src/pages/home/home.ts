import { Auth } from './../../providers/auth';
import { Component, ViewChild} from '@angular/core';

import { NavController,MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private auth: Auth, private menu:MenuController) {
    this.menu.enable(true);
  }
}
