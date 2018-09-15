import { Component } from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { KidsPage } from '../kids/kids';
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the EditKidComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-edit-kid',
  templateUrl: 'edit-kid.html'
})
export class EditKidPage {

  text: string;
  public kid;
  public selectedGroup;
  public groupList;
  myDate: String = new Date().toISOString();
  public result;
  public coach;
  public kidName;
  public user;
  public packageList;
  public selectedPackage;

  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController,public navParams: NavParams  ) {
    console.log('Hello EditKidComponent Component');

    this.text = 'Hello World';
    this.kid= this.navParams.get('selectedKid');
    this.coach = this.navParams.get('coach');
    this.user=this.navParams.get('role');
    //this.selectedGroup.groupID= this.kid.groupID;
    console.log("in constructor of editKid , coachID = " + this.coach[0].coachID);
    let groupName = this.kid.groupName;
    this.kidName = this.kid.kidName;
    console.log("kidName = " + this.kidName);

    //get groups from DB to choose
    this.springData.getGroups(this.coach).subscribe(
      data => {

        this.groupList= data.groupList;
        this.selectedGroup= data.groupList[0];

      },
      err => console.error(err),
      () => console.log('getGroups completed')
    );

    console.log("will call get packages");
    this.springData.getPackages(this.myDate).subscribe(
      data => {
        console.log("in subscribe to data of getPackages");

        this.packageList= data.packageList;
        this.selectedPackage= data.packageList[0];
        //alert("groupList seems like " + this.groupList.entries().next().value[1]);
      },
      err => console.error(err),
      () => console.log('getPackages completed')
    );

  }

  public onItemSelection(selection){
    let item=this.selectedGroup;
    if (selection!=undefined){
      console.log("item selected: "+item.groupName );

    }
  }

  saveKidInfo(){
    console.log("save kid info, selectedGroup ID = " + this.selectedGroup.groupID);

    this.springData.updateKid(this.kid, this.selectedGroup).subscribe(
      data => {

        this.result=data.result;
        this.navCtrl.push(KidsPage, {coach:this.coach});

      },
      err => console.error(err),
      () => console.log('saveKidInfo completed')

    );
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }


}
