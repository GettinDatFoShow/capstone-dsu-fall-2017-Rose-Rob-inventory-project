import { Room } from './../../models/room';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { RoomCreatePage } from '../room-create/room-create';
import { ItemListPage } from '../item-list/item-list';
import { NFC } from '@ionic-native/nfc';
import { RoomService } from '../../provider/room.service';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-item-display',
  templateUrl: 'item-display.html',
  providers: [ItemDetailService]
})
export class ItemDisplayPage {
  private Toggle: boolean = true;
  private displayImage: string = null;
  private image: ItemImage = new ItemImage;
  private images: any = [];
  private item: Item = new Item;
  private room: Room = new Room;
  private itemDetails: any = [];
  private itemHistories: any = [];
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private showCode: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private itemService: ItemService,
    private itemDetailService: ItemDetailService, private itemHistoryService: ItemHistoryService,
    private toastCtrl: ToastController, private mobileInfoService: MobileInfoService, private nfc: NFC,
    private roomService: RoomService, private geolocation: Geolocation, private vibration: Vibration) { }

  ionViewDidEnter() {
    this.item = this.navParams.get('item');
    this.room.name = "";
    this.room.number = 0;
    this.getItemImages();
    this.getRoom();
    this.getItemDetails();
    this.getItemHistory();
    if(this.mobileFlag) {
      this.addNfcListeners();
    }
  }

  ionViewDidLeave() {
    if(this.mobileFlag) {
      this.removeNfcListner();      
    }
  }

  getRoom():void {
    this.itemService.getRoomByItem(this.item.id)
      .subscribe(
        data => this.room = data,
        (err) => {
          // this.presentToast("Error recieving room!") 
        }
      );
  }

  getPosition(){
    var coords = this.item.latitude + "," + this.item.longitude; 
    var label = 'Items last scanned location';
    window.open('geo:lat,long?q='+ coords +'(' + label + ')'+'_system');
  }


  getItemImages():void {
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

  showCodeClick() {
    this.showCode = !this.showCode;
  }

  getItemDetails():void {
    this.itemDetailService.getItemDetails(this.item.id)
    .subscribe(
      data => this.itemDetails = data,
      error => {
        // this.presentToast("Error retrieving details")
      }
    )
  }

  getItemHistory():void {
    this.itemHistoryService.getItemHistoryByItemId(this.item.id)
    .subscribe(
      data => this.itemHistories = data,
      error => {
        // this.presentToast("Error retrieving history")
      }
    )
  }

  updateClicked(event: Event):void  {
    this.navCtrl.push(ItemUpdatePage, {
      mobileFlag: this.mobileFlag,
      item: this.item,
      room: this.room,
      history: this.itemHistories,
      details: this.itemDetails
    });
  };

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  addNfcListeners(): void {
    this.mobileInfoService.listen().subscribe( 
      res => {
        this.presentToast("ID Scanned: " + this.nfc.bytesToHexString(res.tag.id));
        this.vibrate(2000);
        this.searchRooms(this.nfc.bytesToHexString(res.tag.id));
      }, 
      (err) => {
          // this.presentToast(err);
      });
  }

  removeNfcListner() {
    this.mobileInfoService.listen().subscribe().unsubscribe();
  }

  searchRooms(tagId: string) {
    this.roomService.getRoomByNfcCode(tagId).subscribe(
      res => {
        this.presentToast("Room: " + this.room.name)
        this.goToItemListPage(res);
      },
      err => {
        this.navCtrl.setRoot(RoomCreatePage, {
          hasTag: true,
          tagId: tagId
        });
        this.navCtrl.popToRoot();
      }
    );
  }

  vibrate(time: number): void {
    this.vibration.vibrate(time);
  }

  goToItemListPage(room: Room): void {
    this.navCtrl.setRoot(ItemListPage, {
      hasRoom: true,
      room: this.room
    });
    this.navCtrl.popToRoot();
  }

}
