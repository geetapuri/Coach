import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpRequest, HttpInterceptor, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GetDataFromSpringProvider } from '../providers/get-data-from-spring';
import { WelcomePage } from '../pages/welcome/welcome';
import { SchedulePage } from '../pages/schedule/schedule';
import { AddSchedulePage } from '../pages/add-schedule/add-schedule';
import { EditScheduleDetailsPage } from '../pages/edit-schedule-details/edit-schedule-details';
import { AttendancePage } from '../pages/attendance/attendance';
import { MarkAttendancePage } from '../pages/mark-attendance/mark-attendance';
import { FeesPage } from '../pages/fees/fees';
import { PayFeesPage } from '../pages/pay-fees/pay-fees';
import { ManageClassesPage } from '../pages/manage-classes/manage-classes';
import { KidsPage } from '../pages/kids/kids';
import { EditKidPage } from '../pages/edit-kid/edit-kid';
import { AddKidPage } from '../pages/add-kid/add-kid';
import { ClassesPage } from '../pages/classes/classes';
import { GroupsPage } from '../pages/groups/groups';
import { AddGroupsPage } from '../pages/add-groups/add-groups';
import { EditGroupsPage } from '../pages/edit-groups/edit-groups';
import { ShowClassInfoCoachPage } from '../pages/show-class-info-coach/show-class-info-coach';
import { ReceivePaymentPage } from '../pages/receive-payment/receive-payment';
import { SavePaymentPage } from '../pages/save-payment/save-payment';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    SchedulePage,
    AddSchedulePage,
    EditScheduleDetailsPage,
    AttendancePage,
    MarkAttendancePage,
    FeesPage,
    PayFeesPage,
    ManageClassesPage,
    KidsPage,
    EditKidPage,
    AddKidPage,
    ClassesPage,
    GroupsPage,
    AddGroupsPage,
    EditGroupsPage,
    ShowClassInfoCoachPage,
    ReceivePaymentPage,
    SavePaymentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    SchedulePage,
    AddSchedulePage,
    EditScheduleDetailsPage,
    AttendancePage,
    MarkAttendancePage,
    FeesPage,
    PayFeesPage,
    ManageClassesPage,
    KidsPage,
    EditKidPage,
    AddKidPage,
    ClassesPage,
    GroupsPage,
    AddGroupsPage,
    EditGroupsPage,
    ShowClassInfoCoachPage,
    ReceivePaymentPage,
    SavePaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetDataFromSpringProvider, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ]
})
export class AppModule {}
