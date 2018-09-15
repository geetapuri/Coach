
import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { MarkAttendancePage } from '../mark-attendance/mark-attendance';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the AttendanceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage implements OnInit{

  ngOnInit(){
    console.log("will call get Groups");
    this.springData.getGroups(this.coach).subscribe(
      data => {


        this.groupList= data.groupList;

      },
      err => console.error(err),
      () => console.log('getGroupList completed')
    );


  }

  text: string;
  public kidsList;
  public groupList;
  public selectedKid;
  public attendanceList;
  public coach;
  public scheduleList;
  public groupName;
  public groupID;
  public selectedDate;
  public user;

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController , public navParams: NavParams) {
    console.log('Hello AttendanceComponent Component');
    this.text = 'Hello World';
    this.coach = this.navParams.get('coach');
    this.user = this.navParams.get('role');
    console.log(" in attendance, user = " + this.user);

  }



 goToShowDatesForClass(selectedGroup){
    console.log("goToShowDatesForClass");
    this.groupName=selectedGroup.groupName;
    this.groupID=selectedGroup.groupID;
    this.springData.getScheduleForGroup(this.coach,selectedGroup.groupID).subscribe(
      data => {

        this.scheduleList= data.Schedule;

       // this.selectedKid= data.kidList[0];

      },
      err => console.error(err),
      () => console.log('getSchedule for Group completed')
    );


 }

  viewAttendance(){
    //Get Kids list in a dropdown
    console.log("view attendance");
    this.springData.getKids(this.coach).subscribe(
      data => {

        this.kidsList= data.kidList;
        this.selectedKid= data.kidList[0];

      },
      err => console.error(err),
      () => console.log('getKids completed')
    );

  }
  public onItemSelection(selection){
    let item=this.selectedKid;
    if (selection!=undefined){
      console.log("item selected: "+item.kidName );

    }
  }
  markAttendance(){
    console.log("calling mark Attendance");
    this.navCtrl.push(MarkAttendancePage, {coach:this.coach ,role:this.user});

  }



  getAttendanceForKid(item){
    this.springData.viewAttendanceForKid(item).subscribe(
      data => {


        this.attendanceList= data.attendance;

      },
      err => console.error(err),
      () => console.log('viewAttendanceKid completed')
    );
  }

  getAttendanceForGroupDate(date){
    this.selectedDate=date;
    this.navCtrl.push(MarkAttendancePage, {coach:this.coach, groupID:this.groupID,date:date, role:this.user});



  }
  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }


}
