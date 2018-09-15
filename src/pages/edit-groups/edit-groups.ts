import { Component , OnInit} from '@angular/core';
import { GetDataFromSpringProvider} from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { GroupsPage} from '../groups/groups';
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the EditGroupsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-edit-groups',
  templateUrl: 'edit-groups.html'
})
export class EditGroupsPage implements OnInit {

  ngOnInit(){
    this.getGroupList();


  }

  text: string;
  public group;
  public result;
  public coach;
  public user;
  public groupList;
  public selectedGroup;
  public selected: Boolean = false;
  public myDate= new Date();
  public packageList;
  public selectedPackage;


  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController,public navParams: NavParams) {
    console.log('Hello EditGroupsComponent Component');
    this.text = 'Hello World';
    this.group= this.navParams.get('selectedGroup');
    //console.log("group name now =" + this.group.groupName);
    this.coach= this.navParams.get('coach');
    this.user = this.navParams.get('role');
    //console.log("in construct of EditGroups, coachID = " + this.coach[0].coachID);

  }

  getGroupList(){
    //get all the kids list from DB first
    console.log("in getGroupList, coachID = " + this.coach[0].coachID);
    this.springData.getGroups(this.coach).subscribe(
      data => {


        this.groupList= data.groupList;

      },
      err => console.error(err),
      () => console.log('getGroupList completed')
    );


  }

  public onItemSelection(selection){
    let item=this.selectedGroup;
    if (selection!=undefined){
      console.log("item selected: "+item.groupName );
    }
  }

  goToEditGroup(selectedGroup){
    this.selected = true;
    this.selectedGroup = selectedGroup;
    console.log("edit group");
    console.log("selected group = " + selectedGroup.groupName);
    console.log("selected group's fee = " + selectedGroup.feeAmount);
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

  updateGroup(){
    console.log("update group Info");
    console.log(" package id = " + this.selectedGroup.packageID)
    this.selectedGroup.packageID = this.selectedPackage.packageID;
    this.springData.updateGroup(this.selectedGroup).subscribe(
      data => {

        this.result=data.result;
        this.navCtrl.push(GroupsPage, {coach:this.coach, role:this.user});

      },
      err => console.error(err),
      () => console.log('update group completed')

    );
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }

}
