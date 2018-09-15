
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { GetDataFromSpringProvider } from '../../providers/get-data-from-spring';
import { HttpClient } from '@angular/common/http';
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [GetDataFromSpringProvider]
})
export class HomePage {

  text: string;
  credentials = {username: 'coach_', password: 'coach_'};
  public user;

  constructor(private springData: GetDataFromSpringProvider, private http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello LoginComponent Component');
    this.text = 'Hello Geeta s World';
  }

  login() {
    //alert("calling login fn");
    this.springData.authenticate(this.credentials).subscribe(
      data => {
        this.user = data.user;
        console.log('user name received = '+ data.user.name);
        this.springData.authenticated=true;
        this.navCtrl.push(WelcomePage, {role:data.user.name});
      },
      err => console.error(err),
      () => console.log('login completed')
    );

  }

}
