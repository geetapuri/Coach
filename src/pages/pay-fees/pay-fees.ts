import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { FeesPage } from '../fees/fees';
import { WelcomePage } from '../welcome/welcome';


/**
 * Generated class for the PayFeesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-pay-fees',
  templateUrl: 'pay-fees.html'
})
export class PayFeesPage implements OnInit {

  ngOnInit(){
    console.log(" get fees for kid - "+ this.kid.kidName);
    this.springData.viewFeesForKid(this.kid).subscribe(
    data => {


      this.feeList= data.feeList;
      //console.log("fee list received as : " +this.feeList.json());
      /*this.checkedItems = new Array(this.feeList.length);
        this.feeList.forEach((item,index) => {
          console.log(item);
          console.log(index);
          if (item.feePaid=="Y"){
            console.log("found a check at index = " + index);
            this.checkedItems[index]=true;
          } else {
            this.checkedItems[index]=false;
          }


        });*/


    },
    err => console.error(err),
    () => console.log('viewFeesKid completed')
  );
}


  text: string;
  public kidID;
  public feeList;
  public selectedKid;
  public kidsList;
  public myDate;
  public selectedFeeItem;
  public result;
  public coach;
  public kid;
  public checkedItems;
  public user;


  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello PayFees Page');
    this.text = 'Hello World';
    this.selectedKid= navParams.get('selectedKid');
    this.selectedFeeItem = navParams.get('selectedFeeItem');
    //console.log("date = " + this.selectedFeeItem.dateOfAttendance + ", kidID = "+ this.selectedKid.kidID);
    this.coach = this.navParams.get('coach');
    this.kid = this.navParams.get('item');
    this.user = this.navParams.get('role');

  }

  saveFeePaid(){
    console.log("Now ill go and save the fee status");
    this.checkedItems.forEach((item,index) => {
      console.log(item);
      console.log(index);
      console.log("checked Items length = " + this.checkedItems.length);
      if (item){
        console.log("found a check at index = " + index);
        this.feeList[index].feePaid="Y";
      } else {
        this.feeList[index].feePaid="N";
      }


    });


    this.springData.payFees(this.feeList).subscribe(

      data => {

        console.log("received data");
        this.result= data.result;
        console.log("going to Fee Component now");
        this.navCtrl.push(FeesPage, {coach:this.coach});

      },
      err => console.error(err),
      () =>
        console.log('save Fee Paid completed'),
    );

  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }

}
