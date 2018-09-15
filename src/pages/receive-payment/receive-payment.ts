import { Component , OnInit} from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { SavePaymentPage } from '../save-payment/save-payment';

/**
 * Generated class for the ReceivePaymentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-receive-payment',
  templateUrl: 'receive-payment.html'
})
export class ReceivePaymentPage implements OnInit{
  ngOnInit(){
    console.log("calling viewPaymentForDate");
    this.goToShowDatesForClass();
  }

  text: string;
  public coach;
  public user;
  public date : String = new Date().toISOString();
  public groupID;
  public kidsFeeList;
  public checkedItems:Boolean[];
  public groupName;
  public scheduleList;

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello ReceivePaymentComponent Component');
    this.text = 'Hello World';
    this.coach = this.navParams.get('coach');
    this.user=this.navParams.get('role');
    this.groupID= this.navParams.get('groupID');
    this.groupName= this.navParams.get('groupName');
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }

  savePayment(){
    console.log("save payment");

  }

  goToShowDatesForClass(){
    console.log("goToShowClassAttendance");

    this.springData.getScheduleForGroup(this.coach,this.groupID).subscribe(
      data => {

        this.scheduleList= data.Schedule;
       // this.selectedKid= data.kidList[0];

      },
      err => console.error(err),
      () => console.log('getSchedule for Group completed')
    );



 }

 getFeeForGroupDate(date){
  console.log("getFeeForGroupDate");
  console.log("sending date as: " + date);
  this.navCtrl.push(SavePaymentPage, {coach:this.coach, role:this.user, date:date, groupID:this.groupID, groupName:this.groupName});
 }





}
