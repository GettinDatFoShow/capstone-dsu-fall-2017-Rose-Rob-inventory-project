import { ScanPage } from './../pages/scan/scan';
import { InfoPage } from './../pages/info/info';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemListPage } from '../pages/item-list/item-list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemService } from '../provider/item-service';
import { RoomService } from "../provider/room-service";
import { RoomListPage } from "../pages/room-list/room-list";
import { BuildingService } from "../provider/building-service";
import { BuildingListPage } from "../pages/building-list/building-list";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScanPage,
    InfoPage,
    ItemListPage,
    RoomListPage,
    BuildingListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InfoPage,
    ScanPage,
    ItemListPage,
    RoomListPage,
    BuildingListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemService,
    RoomService,
    BuildingService
  ]
})
export class AppModule {}
