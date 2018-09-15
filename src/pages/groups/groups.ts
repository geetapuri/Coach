import { Component, OnInit } from '@angular/core';
import { GetDataFromSpringProvider } from '../../providers/get-data-from-spring';
import {  NavController, NavParams } from 'ionic-angular';
import { EditGroupsPage} from '../edit-groups/edit-groups';
import { AddGroupsPage} from '../add-groups/add-groups';
import { ShowClassInfoCoachPage} from '../show-class-info-coach/show-class-info-coach';
import { WelcomePage } from '../welcome/welcome';
/**
 * Generated class for the GroupsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage implements OnInit {
  ngOnInit(){
    this.getGroupList();
  }

  text: string;
  public groupList;
  myDate: String = new Date().toISOString();
  public coach;
  public user;


  constructor(private springData: GetDataFromSpringProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello GroupsComponent Component');
    this.text = 'Hello World';
    this.coach= this.navParams.get('coach');
    this.user = this.navParams.get('role');

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



  goToEditGroupDetails(selectedGroup) {
    console.log("edit group");
    this.navCtrl.push(EditGroupsPage, { coach:this.coach, role:this.user});
  }

  addGroup(){
    console.log("add Group");
    this.navCtrl.push(AddGroupsPage, {coach:this.coach, role:this.user});

  }

  goToShowClassInfo(selectedGroup){
    this.navCtrl.push(ShowClassInfoCoachPage,{coach:this.coach, selectedGroup:selectedGroup, role:this.user});
  }

  goBackHome(){
    console.log("going back to home page");
    this.navCtrl.push(WelcomePage, {coach:this.coach, role:this.user});
  }



}
