

import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider } from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { EditKidPage } from '../edit-kid/edit-kid';
import { AddKidPage } from '../add-kid/add-kid';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the KidsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-kids',
  templateUrl: 'kids.html'
})
export class KidsPage implements OnInit{
  ngOnInit(){
    this.getKidsList();

  }
  text: string;
  public kidList;
  public coach;
  public user;

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello KidsComponent Component');
    this.text = 'Hello World';
    this.coach= this.navParams.get('coach');
    this.user = this.navParams.get('role');
    console.log("in constructor, coach ID = " + this.coach[0].coachID);
  }

  getKidsList(){
    //get all the kids list from DB first
    this.springData.getKidInfo(this.coach).subscribe(
      data => {


        this.kidList= data.kidList;

      },
      err => console.error(err),
      () => console.log('getKidsList completed')
    );


  }



  addKids(){
    console.log("add kid");
    this.navCtrl.push(AddKidPage, {coach:this.coach, role:this.user});

  }

  goToEditKidDetails(selectedKid) {
    console.log("edit kid");
    console.log("pushing coach ID as " + this.coach[0].coachID);
    this.navCtrl.push(EditKidPage, {coach:this.coach,selectedKid:selectedKid, role:this.user });
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }

}

