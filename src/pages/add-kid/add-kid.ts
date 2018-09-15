import { Component , OnInit } from '@angular/core';
import { GetDataFromSpringProvider } from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { KidsPage } from '../kids/kids';
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the AddKidComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-add-kid',
  templateUrl: 'add-kid.html'
})
export class AddKidPage implements OnInit{

  ngOnInit(){
    console.log("will call get Groups");
    this.springData.getGroups(this.coach).subscribe(
      data => {
        console.log("in subscribe to data of getGroups");

        this.groupList= data.groupList;
        this.selectedGroup= data.groupList[0];
        console.log("groupList seems like " + this.groupList.entries().next().value[1]);
      },
      err => console.error(err),
      () => console.log('getGroups completed')
    );

  }

  text: string;
  myDate: String = new Date().toISOString();
  groupList = [];
  public selectedGroup;
  packageList = [];
  public selectedPackage;
  public kidName;
  public result;
  public coach;
  public parentName;
  public user;

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello AddKidComponent Component');
    this.text = 'Hello World';
    this.coach = this.navParams.get('coach');
    this.user = this.navParams.get('role');
    console.log("user =  " + this.user + ",  coach = " + this.coach);

  }

  public onItemSelection(selection){
    let item=this.selectedGroup;
    if (selection!=undefined){
      console.log("item selected: "+item.groupName );
    }
  }

  addKid(){
    console.log("Add kid");
    console.log("Sending parent Name as : " + this.parentName);
    this.springData.addKid(this.kidName, this.selectedGroup.groupID, this.parentName).subscribe(
      data => {
        console.log("in subscribe to data of addKid");

        this.result= data.result;
        this.navCtrl.push(KidsPage, {coach:this.coach, role:this.user});
      },
      err => console.error(err),
      () => console.log('addKid completed')
    );
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }

}
