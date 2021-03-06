import { ItemHistoryService } from './../provider/itemHistory.service';
import { ItemCreatePage } from './../pages/item-create/item-create';
import { InfoPage } from './../pages/info/info';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {  IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { PAM } from './app.component';
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
import { APP_CONFIG, AppConfig } from './app.config';
import { Camera } from '@ionic-native/camera';
import { RoomCreatePage } from "../pages/room-create/room-create";
import { RoomUpdatePage } from "../pages/room-update/room-update";
import { RoomHistory } from "../models/RoomHistory";
import { RoomHistoryService } from "../provider/roomHistory.service";
import { ItemUpdatePage } from "../pages/item-update/item-update";
import { Geolocation } from '@ionic-native/geolocation';
import { Ndef, NFC } from "@ionic-native/nfc";
import { MobileInfoService } from '../provider/mobileInfo.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ComponentsModule } from '../components/components.module';
import { BuildingUpdatePage } from '../pages/building-update/building-update';
import { BuildingCreatePage } from '../pages/building-create/building-create';
import { RoomInventoryPage } from '../pages/room-inventory/room-inventory';
import { MomentModule } from 'angular2-moment';
import { Moment } from 'moment';
import { SettingsServiceProvider } from '../provider/settings-service';
import {GoogleMaps, GoogleMap} from '@ionic-native/google-maps';
import { Vibration } from '@ionic-native/vibration';
import { HistoryPage } from '../pages/history/history';

@NgModule({
  declarations: [
    PAM,
    HomePage,
    InfoPage,
    ItemListPage,
    RoomListPage,
    BuildingListPage,
    ItemDisplayPage,
    ItemCreatePage,
    ItemUpdatePage,
    RoomCreatePage,
    RoomUpdatePage,
    BuildingUpdatePage,
    BuildingCreatePage,
    RoomInventoryPage,
    HistoryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(PAM),
    NgxQRCodeModule,
    ComponentsModule,
    MomentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PAM,
    HomePage,
    InfoPage,
    ItemListPage,
    RoomListPage,
    BuildingListPage,
    ItemDisplayPage,
    ItemCreatePage,
    ItemUpdatePage,
    RoomCreatePage,
    RoomUpdatePage,
    BuildingUpdatePage,
    BuildingCreatePage,
    RoomInventoryPage,
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
    Camera,
    RoomHistory,
    RoomHistoryService,
    Geolocation,
    NFC,
    Ndef,
    MobileInfoService,
    GoogleMaps,
    SettingsServiceProvider,
    Vibration
  ]
})
export class AppModule {}
