
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
/*
  Generated class for the GetDataFromSpringProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDataFromSpringProvider {

  authenticated = false;

  constructor(public http: Http) {
    console.log('Hello GetDataFromSpringProvider Provider');
  }

  authenticate(credentials) {

    console.log("in authenticate");

   /* let headers = new Headers(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});*/
    let headers = new Headers ();
    headers.append('Authorization' , 'Basic ' + btoa(credentials.username  + ':' + credentials.password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    let options = new RequestOptions({ headers: headers });
    let body = {
      'test' : 'test'
    }


    //return this.http.post(`http://172.20.10.2:8080/resourceLogin`,body, {headers: headers})
    return this.http.post(`https://coachingapp-203705.appspot.com/resourceLogin`, body, { headers: headers })
    .map(data  => data.json());

  }

  getGroups(coach){
    console.log("in getGroups");

      let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'coachID': coach[0].coachID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getGroups`, body, {headers: headers})
      .map(data => data.json());


  }

  getGroupsForToday(coach, date){
    console.log("in getGroupsForToday");

      let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'coachID': coach[0].coachID,
        'strDate': date
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
     // console.log("sending date  as " + body.date);
      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getCalendarCoachDate`, body, {headers: headers})
      .map(data => data.json());


  }


  getPackages(myDate){
    console.log("in getPackages");

      let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'test': `test`
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getPackages`, body, {headers: headers})
      .map(data => data.json());


  }

  addSchedule(repeat,myDate, groupID, myTime){
    console.log("in add Schedule");

    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'repeat': repeat,
        'date': myDate,
        'groupID': groupID,
        'time': myTime
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/addSchedule`, body, {headers: headers})
      .map(data => data.json());


  }

  addKid(kidName, groupID,  parentName){
    console.log("in add Kid");

    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'kidName': kidName,
        'groupID': groupID,
        'parentName': parentName
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/addKid`, body, {headers: headers})
      .map(data => data.json());


  }

  addGroup(groupName, feeAmount, coach, packageName){
    console.log("in add Group");

    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'groupName': groupName,
        'feeAmount': feeAmount,
        'coachID': coach[0].coachID,
        'packageName' : packageName
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/addGroup`, body, {headers: headers})
      .map(data => data.json());


  }

  getScheduleForGroup(coach, groupID){
    console.log("in getSchedule date,coach");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'coachID': coach[0].coachID,
        'groupID': groupID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
      console.log("sending coachID as " + body.coachID);
      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getCalendarCoachGroup`, body, {headers: headers})
      .map(data => data.json());
  }

  getSchedule(myDate, coach, groupID){
    console.log("in getSchedule date,coach");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'strDate': myDate,
        'coachID': coach[0].coachID,
        'groupID': groupID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
      console.log("sending coachID as " + body.coachID);
      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getCalendarCoachDate`, body, {headers: headers})
      .map(data => data.json());
  }

  saveSchedule(item, myDate){
    console.log("in save Schedule");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'date': myDate,
        'groupID': item.groupID,
        'calendarID': item.calendarID,
        'groupName' : item.groupName,
        'time': item.time
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/updateSchedule`, body, {headers: headers})
      .map(data => data.json());
  }

  getKids(coach){
    console.log("in get Kids");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'coachID': coach[0].coachID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getKids`, body, {headers: headers})
      .map(data => data.json());
  }

  viewAttendanceForKid(item){
    console.log(" in view attendance for kid, kidID = " + item.kidID);

    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'kidID': item.kidID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/viewAttendanceKid`, body, {headers: headers})
      .map(data => data.json());
  }

   viewAttendanceForGroupDate(date, groupID){
    console.log(" in view attendance for GroupDate, date = " + date);

    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'groupID': groupID,
        'date':date
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/viewAttendanceForGroupDate`, body, {headers: headers})
      .map(data => data.json());
  }

  viewFeeForGroupDate(date, groupID){
    console.log(" in service view fee for GroupDate, date = " + date);

    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'groupID': groupID,
        'dateOfAttendance':date
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
      //console.log("http post date is going as : " + body.date);
      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/viewFeeForGroupDate`, body, {headers: headers})
      .map(data => data.json());
  }

  checkAttendance(item){
    console.log(" in check attendance for kid, groupID = " + item.groupID);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'date': item.date,
        'groupID': item.groupID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/checkAttendance`, body, {headers: headers})
      .map(data => data.json());
  }

  getKidsInGroup(groupID){
    //console.log(" in getKidsInGroup, groupID = " + item.groupID);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'groupID': groupID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getKidsInGroup`, body, {headers: headers})
      .map(data => data.json());
  }

  getKidsFeeInGroup(item){
    console.log(" in getKidsInGroup, groupID = " + item.groupID);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'groupID': item.groupID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
      console.log("sending groupID as " + body.groupID);
      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/getKidsFeeInGroup`, body, {headers: headers})
      .map(data => data.json());
  }

  markAttendance(attendanceList){
   // console.log(" in markAttendance, groupID = " + item.groupID);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'attendanceList': attendanceList
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/markAttendance`, body, {headers: headers})
      .map(data => data.json());
  }

  viewFeesForKid(item){
    console.log(" in view Fee for kid, kidID = " + item.kidID);
    let headers = new Headers ({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = {
        'kidID': item.kidID,
        'groupID': item.groupID
      }
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

      //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
     return this.http.post(`https://coachingapp-203705.appspot.com/viewFees`, body, {headers: headers})
      .map(data => data.json());
  }

  payFees(feeList){
      let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
          'feeList': feeList
        }
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
console.log(" sending post request to payFee");
        //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
      return this.http.post(`https://coachingapp-203705.appspot.com/payFees`, body, {headers: headers})
        .map(data => data.json());

  }


  getKidInfo(coach){
    console.log("In get Kids Info");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      'coachID': coach[0].coachID
    }
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

    //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
  return this.http.post(`https://coachingapp-203705.appspot.com/getKidInfoCoach`, body, {headers: headers})
    .map(data => data.json());
  }

  updateKid(kid, selectedGroup){
    console.log("In update Kid Info");
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      'kidID': kid.kidID,
      'kidName': kid.kidName,
      'groupID': selectedGroup.groupID
    }
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

    //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
  return this.http.post(`https://coachingapp-203705.appspot.com/updateKid`, body, {headers: headers})
    .map(data => data.json());

  }

updateGroup(group){
  console.log("In update Group ");
  let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      'groupID': group.groupID,
      'groupName': group.groupName,
      'feeAmount': group.feeAmount,
      'packageID': group.packageID

    }
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');

    //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
  return this.http.post(`https://coachingapp-203705.appspot.com/updateGroup`, body, {headers: headers})
    .map(data => data.json());
}

getCoachID(user){
  console.log("In getCoachID ");
  let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      'coachName': user

    }
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods' , 'POST, GET, OPTIONS, PUT');
    console.log("sending coach name as : " + user);
    //return this.http.post(`http://172.20.10.2:8080/getKids`,body, {headers: headers1})
  return this.http.post(`https://coachingapp-203705.appspot.com/getCoachID`, body, {headers: headers})
    .map(data => data.json());
}

}
