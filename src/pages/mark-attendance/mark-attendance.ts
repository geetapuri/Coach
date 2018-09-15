import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams, Item } from 'ionic-angular';
import { AttendancePage } from '../attendance/attendance';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the MarkAttendanceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-mark-attendance',
  templateUrl: 'mark-attendance.html'
})
export class MarkAttendancePage implements OnInit{
  ngOnInit(){
    console.log("calling viewAttendanceForDate service");

    this.springData.viewAttendanceForGroupDate(this.date, this.groupID).subscribe(
      data => {

        this.attendanceList= data.attendance;
        if(data.attendance.length){
          this.checkedItems = new Array(this.attendanceList.length);
          this.attendanceList.forEach((item,index) => {
            if (item.presentAbsent=="P"){
              console.log("found a check at index = " + index);
              this.checkedItems[index]=true;
            } else {
              this.checkedItems[index]=false;
            }


          });
        }
        else {
          console.log("No data in attendance list");
          //show kids in group and show empty checkboxes to mark attendnance
          this.springData.getKidsInGroup(this.groupID).subscribe(
            data => {
              this.attendanceList=data.kidsList;
              this.checkedItems = new Array(this.attendanceList.length);
              this.attendanceList.forEach((item,index) => {
                  this.checkedItems[index]=false;


              });
            },
            err => console.error(err),
            () => console.log("getKidsInGroup completed")
          );
        }
      },
      err => console.error(err),
      () => console.log('viewAttendanceForGroupDate completed')
    );

  }

  text: string;

  myDate: String = new Date().toISOString();
  groupList = [];
  public selectedGroup;
  public scheduleList;
  public attendanceList;
  public kidsList;
  //checkedItems:boolean[];
  public coach;
  public groupID;
  public date;
  public checkedItems:Boolean[];
  public result;
  public user;
  public group;

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello MarkAttendanceComponent Component');
    this.text = 'Hello World of Mark Attendance';
    this.coach = this.navParams.get('coach');
    this.date = this.navParams.get('date');
    this.groupID = this.navParams.get('groupID');
    console.log("group id received = " + this.groupID);
    //this.group.groupID = this.groupID;
    this.user = this.navParams.get('role');
    console.log(" in mark attendance, user = " + this.user);
  }

  public onItemSelection(selection){
    let item=this.selectedGroup;
    if (selection!=undefined){
      console.log("item selected: "+item.groupName )
    }
  }

  /*getKidsInGroup(item){

    this.navCtrl.push(MarkAttendanceForGroupComponent, {item:item, coach:this.coach});


  }*/

  saveAttendance(){
    console.log(" save attendance");


      console.log("saving attendance for kids");

      this.checkedItems.forEach((item,index) => {
        this.attendanceList[index].date= this.date;
        console.log("date = "+ this.date);
        this.attendanceList[index].presentAbsent="A";

        if (item){
          console.log("found a check at index = " + index);
          this.attendanceList[index].presentAbsent="P";
        } else {
          this.attendanceList[index].presentAbsent="A";
        }

      });


      //send this kids list for marking attendance now
      this.springData.markAttendance(this.attendanceList).subscribe(
        data => {


          this.result= data.result;
          this.navCtrl.push(AttendancePage, {coach:this.coach, role:this.user});

        },
        err => console.error(err),
        () =>
          console.log('mark Attendance completed'),
      );
}

goBackHome(){
  console.log("going back to home page");
  this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
}


}
