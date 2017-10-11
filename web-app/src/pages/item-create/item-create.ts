import { ItemHistory } from './../../models/ItemHistory';
import { RoomService } from './../../provider/room-service';
import { ItemService } from './../../provider/item-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from './../../models/item';
import { ItemDetail } from './../../models/itemDetail';
// import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ItemCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html',
  providers: [ToastController]
})
export class ItemCreatePage {

  public title: string = "Create Item";
  public description: string = "";
  public item: Item = new Item;
  public rooms: any;
  public itemDetail = new ItemDetail;
  public itemDetails: ItemDetail[];
  public itemHistory: ItemHistory;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService,
     public roomService: RoomService, public toastCtrl: ToastController) {
          this.getRooms();
          this.itemDetails = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemCreatePage');
  }

  onAddDetail() {
    this.itemDetails.push(this.itemDetail);
    this.itemDetail = new ItemDetail;
    this.presentToast("Detail Added!")
    // this.toast.show(`Detail Added`, '5000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  onCreate() {
    if(this.itemDetails.length > 0){
        this.item.details = this.itemDetails;
    }
    this.itemHistory.action = 'created';
    this.itemHistory.date = new Date;
    this.item.created = new Date;
    this.item.addedToRoom = new Date;
    this.item.histories = [this.itemHistory];
    this.presentToast("Creating New Item");
    this.itemService.createItem(this.item);
  }

  getRooms() {
    this.roomService.getAllRooms()
        .subscribe(
          res => this.rooms = res,
          () => {
            console.log(this.rooms);
          }
        )
  }

}
