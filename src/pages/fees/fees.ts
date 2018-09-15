
import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider } from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { PayFeesPage} from '../pay-fees/pay-fees';
import { WelcomePage } from '../welcome/welcome';
import { ReceivePaymentPage } from '../receive-payment/receive-payment';

/**
 * Generated class for the FeesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-fees',
  templateUrl: 'fees.html'
})
export class FeesPage implements OnInit{

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
  public selectedKid;
  public feeList;
  public kidsList;
  public coach;
  public groupList;
  public groupName;
  public user;
  public groupID;


  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams ) {
    console.log('Hello FeesComponent Component');
    this.text = 'Hello World';
    this.coach = this.navParams.get('coach');
    this.user= this.navParams.get('role');
    console.log('received on fee page, username = ' + this.user);

  }

  getKidsInGroup(item){
    console.log("getKidsInGroup");
    this.groupName = item.groupName;
    this.groupID = item.groupID;
    console.log("get kids for group " + this.groupName);
    this.springData.getKidsFeeInGroup(item).subscribe(
      data => {

        this.kidsList= data.kidsList;
        console.log("received kid list size as " + this.kidsList.length);
        //this.selectedKid= data.kidList[0];


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

getFeesForKid(item){
  this.navCtrl.push(PayFeesPage, {item:item, coach:this.coach, role:this.user});

}

paymentReceived(){
  console.log("received payement for ");
  this.navCtrl.push(ReceivePaymentPage, {coach:this.coach, role:this.user, groupID:this.groupID, groupName:this.groupName})
}

payFees(selectedFeeItem){
console.log("payFees for selectedFeeItem = " + selectedFeeItem.dateOfAttendance);
console.log("child id is with me or no? " + this.selectedKid.kidName);
this.navCtrl.push(PayFeesPage, {selectedFeeItem:selectedFeeItem, selectedKid:this.selectedKid, coach:this.coach, role:this.user});

}

goToShowFeeDatesForGroup(){
  console.log("goToShowFeeDatesForGroup");
}

goBackHome(){
  console.log("going back to home page");
  this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
}



}
