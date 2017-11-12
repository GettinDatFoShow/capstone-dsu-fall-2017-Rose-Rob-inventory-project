import { Room } from './../../models/room';
import { ItemDetail } from './../../models/ItemDetail';
import { ItemHistory } from './../../models/ItemHistory';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ItemListPage } from '../item-list/item-list';
import { ItemService } from '../../provider/item.service';
import { ItemCreatePage } from '../item-create/item-create';
import { ItemImage } from './../../models/ItemImage';

@IonicPage()
@Component({
  selector: 'page-item-display',
  templateUrl: 'item-display.html',
  providers: [ItemService]
})
export class ItemDisplayPage {

  public displayImage: string = null;
  public image: ItemImage = new ItemImage;
  public images: ItemImage[];
  public item: any = {};
  public room: Room = new Room;
  public itemDetails: ItemDetail[];
  public itemHistories: ItemHistory[];

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
      this.item = navParams.get('param1');
      this.room.name = "";
      this.room.number = 0;
      this.getItemImages();
      this.getRoom();
      console.log(this.item);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDisplayPage');
  }

  getRoom() {
    this.itemService.getRoomByItem(this.item.id)
      .subscribe(
        data => this.room = data,
        error => alert("error recieving room."),
        () => {
          console.log("room recieved.");
          console.log(this.room);
        }
      );
  }

  getItemImages() {
    this.itemService.getItemImages(this.item.id)
      .subscribe(
        data => this.images = data,
        error => console.log("error retrieving images"),
        () => {
          console.log("Image/s recieved.");
          console.log(this.images);
          console.log("image size = ", this.images.length)
          if (this.images.length > 0){
            this.image = this.images[0];
            this.displayImage = this.image.base64string;
          }
        }
      )
  }

  // deletePhoto(index){
  //   let confirm = this.alertCtrl.create({
  //     title: 'Sure you want to delete this photo? There is NO UNDO!',
  //     message: '',
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: () => {
  //           //Do nothing
  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: () => {
  //           this.photos.splice(index,1);
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }
}
