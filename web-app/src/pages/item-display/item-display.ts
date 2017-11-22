import { Room } from './../../models/room';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { ItemImage } from './../../models/ItemImage';
import { ItemUpdatePage } from '../item-update/item-update';
import { ItemDetailService } from '../../provider/itemDetails.service';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import { ToastController } from 'ionic-angular';
import { Item } from '../../models/item';
import { ItemDetail } from '../../models/ItemDetail';
import { MobileInfoService } from '../../provider/mobileInfo.service';
 
@IonicPage()
@Component({
  selector: 'page-item-display',
  templateUrl: 'item-display.html',
})
export class ItemDisplayPage {

  private displayImage: string = null;
  private image: ItemImage = new ItemImage;
  private images: any = [];
  private item: Item = new Item;
  private room: Room = new Room;
  private itemDetails: any = [];
  private itemHistories: any = [];
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();

  constructor(private navCtrl: NavController, private navParams: NavParams, private itemService: ItemService,
    private itemDetailService: ItemDetailService, private itemHistoryService: ItemHistoryService,
    private toastCtrl: ToastController, private mobileInfoService: MobileInfoService) { }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.room.name = "";
    this.room.number = 0;
    this.getItemImages();
    this.getRoom();
    this.getItemDetails();
    this.getItemHistory();
    if(this.mobileFlag) {
      //nfc code
    }
  }

  getRoom() {
    this.itemService.getRoomByItem(this.item.id)
      .subscribe(
        data => this.room = data,
        (err) => {
          this.presentToast("Error recieving room!") 
        }
      );
  }

  getItemImages() {
    this.itemService.getItemImages(this.item.id)
      .subscribe(
        data => this.images = data,
        error => {
          this.presentToast("Error retrieving images")
        },
        () => {
          if (this.images.length > 0){
            this.image = this.images[0];
            this.displayImage = this.image.base64string;
          }
        }
      )
  }

  getItemDetails(){
    this.itemDetailService.getItemDetails(this.item.id)
    .subscribe(
      data => this.itemDetails = data,
      error => {
        this.presentToast("Error retrieving details")
      }
    )
  }

  getItemHistory(){
    this.itemHistoryService.getItemHistoryByItemId(this.item.id)
    .subscribe(
      data => this.itemHistories = data,
      error => {
        this.presentToast("Error retrieving history")
      }
    )
  }

  updateClicked(event) {
    this.navCtrl.push(ItemUpdatePage, {
      mobileFlag: this.mobileFlag,
      item: this.item,
      room: this.room,
      history: this.itemHistories,
      details: this.itemDetails
    });
  };

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


}
