import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import { ItemHistory } from '../../models/ItemHistory';
import { RoomHistoryService } from '../../provider/roomHistory.service';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  private title: string = "History"
  private itemHistories: any = [];
  private roomHistories: any = [];

  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();  

  constructor(private mobileInfoService: MobileInfoService, public navCtrl: NavController, public navParams: NavParams, 
    private itemHistoryService: ItemHistoryService, private roomHistoryService: RoomHistoryService) {
  }

  ionViewDidEnter() {
    this.getItemHistory();
    this.getRoomHIstory();
  }

  getItemHistory():void {
    this.itemHistoryService.getAllItemHistory()
    .subscribe(
      data => this.itemHistories = data,
      error => {
        // this.presentToast("Error retrieving history")
      }
    )
  }
  getRoomHIstory():void {
    this.roomHistoryService.getAllRoomHistory()
    .subscribe(
      data => this.roomHistories = data,
      error => {
        // this.presentToast("Error retrieving history")
      }
    )
  }
}
