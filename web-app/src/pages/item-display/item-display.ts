import { Room } from './../../models/room';
import { ItemDetail } from './../../models/ItemDetail';
import { ItemHistory } from './../../models/ItemHistory';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ItemListPage } from '../item-list/item-list';
import { ItemService } from '../../provider/item.service';
import { ItemImage } from './../../models/ItemImage';
import { ItemUpdatePage } from '../item-update/item-update';
import { ItemDetailService } from '../../provider/itemDetails.service';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import { ToastController } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-item-display',
  templateUrl: 'item-display.html',
  providers: [ToastController, ItemService, ItemDetailService, ItemHistoryService]
})
export class ItemDisplayPage {

  public displayImage: string = null;
  public image: ItemImage = new ItemImage;
  public images: ItemImage[];
  public item: any = {};
  public room: Room = new Room;
  public itemDetails: any;
  public itemHistories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService,
     public itemDetailService: ItemDetailService, public itemHistoryService: ItemHistoryService,
      public toastCtrl: ToastController) {
      this.item = navParams.get('param1');
      this.room.name = "";
      this.room.number = 0;
      this.getItemImages();
      this.getRoom();
      this.getItemDetails();
      this.getItemHistory();

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDisplayPage');
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
