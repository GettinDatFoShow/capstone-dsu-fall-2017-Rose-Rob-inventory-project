import { ItemDisplayPage } from './../pages/item-display/item-display';
import { ItemCreatePage } from './../pages/item-create/item-create';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemService } from './../provider/item.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ItemListPage } from '../pages/item-list/item-list';
import { HomePage } from '../pages/home/home';
import { RoomListPage } from "../pages/room-list/room-list";
import { BuildingListPage } from "../pages/building-list/building-list";
import { Camera } from "@ionic-native/camera";
import {RoomCreatePage} from "../pages/room-create/room-create";
import {RoomUpdatePage} from "../pages/room-update/room-update";
import { Geolocation } from '@ionic-native/geolocation';
//import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  icons: any = [];
  pages: Array<{title: string, component: any, icon: string}>;
  item: any = {};
  error: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
                 public itemService: ItemService, public barcodeScanner: BarcodeScanner) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'paper'},
      { title: 'Inventory', component: ItemListPage, icon: 'clipboard'},
      { title: 'Rooms', component: RoomListPage,  icon: 'albums'},
      { title: 'Buildings', component: BuildingListPage,  icon: 'home'},
      { title: 'Create an Item', component: ItemCreatePage, icon: 'create'},
      { title: 'Create a Room', component: RoomCreatePage, icon: 'create'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
       this.itemService.searchItemByCode(barcodeData.text)
  .subscribe(
    // data => console.log(data),
    (data) => this.item = data,
    (error) => { this.error = error;
      if (this.error.status === 404 ) {
        var message = "404";
        this.nav.setRoot(ItemCreatePage, {
          param1: message
        });
      } else {
        alert(this.error);
      }
    },
    () => {
  this.nav.setRoot(ItemDisplayPage, {
    param1: this.item
  })})}
  )}

  createNew() {
    this.openPage(ItemCreatePage);
  }
}
