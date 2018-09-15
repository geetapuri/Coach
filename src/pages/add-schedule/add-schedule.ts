
import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider } from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the AddScheduleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-add-schedule',
  templateUrl: 'add-schedule.html',
  providers : [GetDataFromSpringProvider]
})
export class AddSchedulePage implements OnInit{

  ngOnInit(){
    console.log("will call get Groups");
    this.springData.getGroups(this.coach).subscribe(
      data => {
        console.log("in subscribe to data of getGroups");

        this.groupList= data.groupList;
        this.selectedGroup= data.groupList[0];
        },
      err => console.error(err),
      () => console.log('getGroups completed')
    );
  }
  text: string;
  myDate: String = new Date().toISOString();
  groupList = [];
  public selectedGroup;
  myTime: string;
  public coach;
  public user;
  public repeat="Tuesday";



  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams ) {
    console.log('Hello AddScheduleComponent Component');
    this.text = 'Hello World Add Schedule';
    this.coach = this.navParams.get('coach');
    this.user = this.navParams.get('role');


  }



  public onItemSelection(selection){
    let item=this.selectedGroup;
    if (selection!=undefined){
      console.log("item selected: "+item.groupName )
    }
  }



  addSchedule(){
    console.log("will call add Schedule");

    this.springData.addSchedule(this.repeat, this.myDate, this.selectedGroup.groupID, this.myTime ).subscribe(
      data => {
        console.log("in subscribe to data of getGroups");

        this.groupList= data.groupList;
      },
      err => console.error(err),
      () => {
        console.log('add schedule completed');
        console.log("added schedule, taking you back to Home page");
        this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
      }
    );


  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push( WelcomePage, {coach:this.coach, role:this.user});
  }


}
