import { Component } from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the ShowClassInfoCoachComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-show-class-info-coach',
  templateUrl: 'show-class-info-coach.html'
})
export class ShowClassInfoCoachPage {

  text: string;
  public kid;
  public selectedGroup;
  public groupList;
  public myDate = new Date();
  public result;
   public coach;
   public user;
   public selectedDate;
   public scheduleForDate;
   public dateToSend;
   public monthNum;


   date: any = new Date();
daysInThisMonth: any;
daysInLastMonth: any;
daysInNextMonth: any;
//monthNames: string[];
//currentMonth: any;
public currentMonth;
currentYear: any;
currentDate: any;

monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController,public navParams: NavParams ) {
    console.log('Hello ShowClassInfoCoachComponent Component');
    this.text = 'Hello World';
    console.log("calling getCurrMonthYear");
    this.coach = this.navParams.get('coach');
    this.selectedGroup= this.navParams.get('selectedGroup');
    this.user = this.navParams.get('role');
    this.getCurrentMonthYear();

    this.dateToSend = this.myDate.toISOString().split("T")[0];
    console.log("getting schedule for today - " + this.dateToSend);

    this.springData.getSchedule(this.dateToSend, this.coach,this.selectedGroup.groupID).subscribe(
      data => {

        this.scheduleForDate=data.Schedule;
        console.log("scheduleForDate list has come as: " +
          data.Schedule);
        //console.log("data received = " + this.scheduleForDate[0].time);
        //this.navCtrl.push(KidsComponent, {parent:this.parent});

      },
      err => console.error(err),
      () => console.log('getScheduleForDate completed')

    );
  }

  getDaysOfMonth() {
    console.log("getDaysOfMonth");
    console.log("month = " + this.date.getDay());

    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    console.log("month name  " + this.currentMonth);

    if(this.date.getMonth() === new Date().getMonth()) {
      console.log("here 1");
      this.currentDate = new Date().getDate();
    } else {
      console.log("here 2");
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      console.log("here**");
      for(i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  getCurrentMonthYear(){
    console.log("getCurrentMonthYear");
    this.date=new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    this.getDaysOfMonth();

  }

  goToLastMonth() {
    console.log("goToLastMonth");
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    console.log("in goToNextMonth");
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

  clearHighlightedDate() {
    //implement to clear dates
      for (let index = 1; index < 32; index++) {
        try {
          var withSpan = document.getElementById("col-"+index).innerHTML;
          //console.log("1 withspan index " + withSpan);
          if(withSpan.startsWith('<span')) {
            console.log("withspan index " + withSpan.indexOf("selectedDate\">"));

            withSpan = withSpan.substring(withSpan.indexOf("selectedDate\">")+14,withSpan.indexOf("</span>"));
            //withSpan = withSpan.substring(withSpan.indexOf("</span>"), withSpan.length);
            console.log("withspan cleared " + withSpan);
            document.getElementById("col-"+index).innerHTML = withSpan;
          }
        } catch (error) {
          console.log("error in clearHighlightedDate "+ error);

        }


      }
  }

  clickedDate(day) {
    console.log("clicked date = " + day + this.currentMonth + this.currentYear);
    console.log("this.date  = " + this.date);
    console.log("get element by id for col id = " + document.getElementById("col-"+day).innerHTML );
    var toSpan = document.getElementById("col-"+day).innerHTML;
    this.clearHighlightedDate();
     toSpan = "<span class='selectedDate'>"+toSpan + "</span>";
     document.getElementById("col-"+day).innerHTML = toSpan;
    this.monthNum = this.date.getMonth() + 1;
    this.selectedDate = this.currentYear + "-" + this.monthNum + "-" + day;
    console.log("selected date = " + this.selectedDate);
   let newDate = new Date(this.selectedDate).toLocaleDateString();
    //this.dateToSend = new Date(this.selectedDate).toISOString();
    //this.dateToSend = '2018-7-5';
    console.log("selected date = " + this.selectedDate);
    this.springData.getSchedule(this.selectedDate, this.coach, this.selectedGroup.groupID).subscribe(
      data => {

        this.scheduleForDate=data.Schedule;
        //console.log("scheduleForDate list has come as: " +
          //data.Schedule);

        //console.log("data received = " + this.scheduleForDate[0].time);
        //this.navCtrl.push(KidsComponent, {parent:this.parent});

      },
      err => console.error(err),
      () => console.log('getScheduleForDate completed')

    );
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }


}
