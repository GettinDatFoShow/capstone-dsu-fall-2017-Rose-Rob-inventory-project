import { ItemHistoryService } from './../provider/itemHistory.service';
import { ItemCreatePage } from './../pages/item-create/item-create';
import { InfoPage } from './../pages/info/info';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {  IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemListPage } from '../pages/item-list/item-list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemService } from '../provider/item.service';
import { RoomService } from "../provider/room.service";
import { RoomListPage } from "../pages/room-list/room-list";
import { ItemDisplayPage } from "../pages/item-display/item-display";
import { BuildingService } from "../provider/building.service";
import { BuildingListPage } from "../pages/building-list/building-list";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { APP_CONFIG, AppConfig } from './app.config';
import { ItemDetailService } from './../provider/itemDetails.service';
import { Camera } from '@ionic-native/camera';
import { ItemUpdatePage } from '../pages/item-update/item-update';
import { HistoryPage } from '../pages/history/history';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfoPage,
    ItemListPage,
    RoomListPage,
    BuildingListPage,
    ItemDisplayPage,
    ItemCreatePage,
    ItemUpdatePage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
    // QRScanner,
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InfoPage,
    ItemListPage,
    RoomListPage,
    BuildingListPage,
    ItemDisplayPage,
    ItemCreatePage,
    ItemUpdatePage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_CONFIG, useValue: AppConfig},
    ItemService,
    RoomService,
    BuildingService,
    ItemHistoryService,
    ItemDetailService,
    Camera
  ]
})
export class AppModule {}
