import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { ItemDisplayPage } from '../item-display/item-display';
import { ToastController } from 'ionic-angular';
import { ItemUpdatePage } from '../item-update/item-update';
import { RoomUpdatePage } from "../room-update/room-update";
import { Building } from "../../models/building";
import { Room } from '../../models/room';
import { Item } from '../../models/item';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { BuildingService } from '../../provider/building.service';
import { NFC } from '@ionic-native/nfc';
import { RoomService } from '../../provider/room.service';
import { ItemCreatePage } from '../item-create/item-create';
import { RoomInventoryPage } from '../room-inventory/room-inventory';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import { ItemHistory } from '../../models/ItemHistory';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html'
})

export class ItemListPage {

  private refreshingFlag: boolean = false;
  private title: string = "Inventory";
  private room: Room = new Room;
  private items: any = [];
  private item: Item = new Item;
  private total: number = 0;
  private header: string = "Items";
  private building: Building = new Building;
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  private hasRoom: boolean = false;
  private showDetails: boolean = false;
  private itemHistories: any = [];
  private itemHistory: ItemHistory = new ItemHistory;

  constructor(private navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController,
    private itemService: ItemService, private mobileInfoService: MobileInfoService, private barcodeScanner: BarcodeScanner, 
    private nfc: NFC, private roomService: RoomService, private itemHistoryService: ItemHistoryService, private vibration: Vibration) { }


  ionViewDidLoad() {
    this.hasRoom = this.navParams.get('hasRoom');
    if (this.hasRoom) {
      this.room = this.navParams.get('room');
      this.getRoomItems(this.room.id);
    }
    else {
      this.getAll();
    }
    if (this.mobileFlag) {
      this.addNfcListeners();
    }

  }

  ionViewDidLeave() {
    if (this.mobileFlag){
      this.removeNfcListner();
    }
  }

  refresh():void {
    this.presentToast("Refreshing List..");
    this.refreshingFlag = true;
    if (this.hasRoom){
      this.getRoomItems(this.room.id);
    }
    else{
      this.getAll();
    }
  }

  presentToast(message: string):void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  getRoomItems(roomId: string): void {
    this.itemService.getItemsByRoomId(roomId)
    .subscribe(
      data => this.items = data,
      error => {
        // this.presentToast("Error retrieving Items");
      },
      () => {
        this.total = this.items.length;
        this.header = this.room.name + " " + this.room.number + " currently has " + this.total + " items listed.";
        if(this.refreshingFlag === true ){
          this.presentToast("Item List is Fresh!");
          this.refreshingFlag = false;
        }
      }
    );
  }

  getAll():void {
    this.itemService.getAllItems()
        .subscribe(
          data => this.items = data,
          error => {
            // this.presentToast("Error retrieving Items");
          },
          () => {
            this.total = this.items.length;
            this.header = this.total + " items listed.";
            if(this.refreshingFlag === true ){
              this.presentToast("List is Fresh!");
              this.refreshingFlag = false;
            }
          }
        );
  }

  buttonTapped(event: Event, item: Item) {
    this.item = item;
    this.navCtrl.push(ItemDisplayPage, {
      item: this.item,
      room: this.room
    });
  };

  checkItemNotNull(item: Item) {
    if(item === undefined) {
      this.presentToast("Item Needs Updating")
      this.navCtrl.push(ItemUpdatePage, {
        mobileFlag: this.mobileFlag,
        item: this.item
      })
    }
    else{
      this.navCtrl.push(ItemDisplayPage, {
        mobileFlag: this.mobileFlag,
        item: this.item
      });
    }
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
       this.itemService.searchItemByCode(barcodeData.text)
       .subscribe(
        data => { 
          //console.log(barcodeData.text);
          this.item = data;
          let date = new Date();          
          this.item.lastAudit = date.toDateString();
          if (this.hasRoom) {
            this.itemService.getRoomByItem(this.item.id).subscribe(
              res => {
                let roomCheck: Room = res;
                if(roomCheck.id !== this.room.id) {
                  this.item.addedToRoom = date.toDateString();
                  this.itemHistory.action = "Room Change";
                  this.itemHistory.date = date.toDateString();
                  this.itemHistoryService.getItemHistoryByItemId(this.item.id).subscribe(
                    hist => {
                      this.itemHistories = hist;
                      this.itemHistories.push(this.itemHistory);
                      this.itemHistory.action = "Item Audited";
                      this.itemHistories.push(this.itemHistory);
                    }, 
                     err => {
                    }
                  );
                  let itemWrapper = {
                    item: this.item,
                    room: this.room,
                    histories: this.itemHistories
                  }
                  this.itemService.updateItem(itemWrapper).subscribe( res =>{
                  },
                  err => {
                  });
                } else {
                  this.room = roomCheck;
                  this.itemHistory.action = "Item Audited";
                  this.itemHistory.date = date.toDateString();
                  this.itemHistoryService.getItemHistoryByItemId(this.item.id).subscribe(
                    res => {
                      this.itemHistories = res;
                      this.itemHistories.push(this.itemHistory);
                    },
                    err => {
                    }
                  );
                  let itemWrapper = {
                    item: this.item,
                    room: this.room, 
                    histories: this.itemHistories
                  }
                  this.itemService.updateItem(itemWrapper).subscribe( res =>{
                  },
                  err => {
                  });
                }

                }, err => {
                   this.presentToast("error finding room");
                }
            );
          } else {
            this.navCtrl.push(ItemDisplayPage, {
              item: this.item
            }) 
          }
  
        },
        error => {       
         this.presentToast("Item Not Found");
         this.navCtrl.push(ItemCreatePage,
           {
             hasSpecialCode: true,
             specialCode: barcodeData.text
           });}
      );
    }, (err) =>{
    });
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
        this.room = res;
        this.presentToast("Room: " + this.room.name)
        this.goToItemListPage(this.room);
      },
      err => {
        // this.presentToast("Room Not Found.");
      }
    );
  }

  vibrate(time:number): void {
    this.vibration.vibrate(time);
  }

  goToItemListPage(room: Room): void {
    this.room = room;
    this.navCtrl.push(ItemListPage, {
      hasRoom: true,
      room: this.room
    });
  }

  addItem(){
    if(this.hasRoom) {
      this.navCtrl.push(ItemCreatePage, {
        hasRoom: true,
        room: this.room
      });
    }
     else {
      this.navCtrl.push(ItemCreatePage);
    }
    
  }

  showDetail() {
    this.showDetails = !this.showDetails
  }

  auditCheck() {
    this.navCtrl.push(RoomInventoryPage,{
      room: this.room
    });
  }
  
}
