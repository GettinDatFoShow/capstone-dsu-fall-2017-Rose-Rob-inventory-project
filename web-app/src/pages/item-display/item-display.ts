import { Room } from './../../models/room';
import { ItemDetail } from './../../models/itemDetail';
import { ItemHistory } from './../../models/ItemHistory';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ItemListPage } from '../item-list/item-list';
import { ItemService } from '../../provider/item.service';
import { ItemCreatePage } from '../item-create/item-create';

@IonicPage()
@Component({
  selector: 'page-item-display',
  templateUrl: 'item-display.html',
  providers: [ItemService]
})
export class ItemDisplayPage {
  public photos: any;
  public item: any = {};
  public room: Room = new Room;
  public itemDetails: ItemDetail[];
  public itemHistories: ItemHistory[];

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
      this.item = navParams.get('param1');
      this.room.name = "";
      this.room.number = 0;
      this.getRoom(this.item.id);
      console.log(this.item);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDisplayPage');
  }

  getRoom(itemId) {
    this.itemService.getRoomByItem(itemId)
      .subscribe(
        data => this.room = data,
        error => alert("error recieving room."),
        () => {
          console.log("room recieved.");
          console.log(this.room);
        }
      );
  }

  deletePhoto(index){
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO UNDO!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //Do nothing
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.photos.splice(index,1);
          }
        }
      ]
    });
    confirm.present();
  }
}
