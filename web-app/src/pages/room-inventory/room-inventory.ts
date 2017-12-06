import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Room } from '../../models/room';
import { Item } from '../../models/item';
import { ItemDisplayPage } from '../item-display/item-display';
import { SettingsServiceProvider } from '../../provider/settings-service';
import { MobileInfoService } from '../../provider/mobileInfo.service';
import { ItemHistoryService } from '../../provider/itemHistory.service';
import { RoomService } from '../../provider/room.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemHistory } from '../../models/ItemHistory';
import { Vibration } from '@ionic-native/vibration';
import { ItemCreatePage } from '../item-create/item-create';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-room-inventory',
  templateUrl: 'room-inventory.html',
})
export class RoomInventoryPage {

  options: GeolocationOptions
  private total: number = 0;
  private items: any = [];
  private item: Item = new Item;
  private room: Room = new Room;
  private colorCheck: string = "primary";
  private auditList: any = [];
  private auditDays: number = 30;
  private auditSelection: number = 0;
  private itemHistory: ItemHistory = new ItemHistory;
  private itemHistories: any = [];
  private selections: any = [
    {
      value: 0,
      months: 1,
      days: 30
    },
    {
      value: 1,
      months: 3,
      days: 90
    },
    {
      value: 3,
      months: 6,
      days: 180
    },
    {
      value: 4,
      months: 12,
      days: 360
    }
  ]
  private title: string = "";

  public auditTime: any = this.selections[this.auditSelection];

  private auditTimePlaceHolder: string = "Months: "+this.auditTime.months+" Days: "+this.auditTime.days;
  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService,
    public toastCtrl: ToastController, private settingsService: SettingsServiceProvider, private mobileInfoService: MobileInfoService,
     private barcodeScanner: BarcodeScanner, private roomService: RoomService, private itemHistoryService: ItemHistoryService,
     private vibration: Vibration, private geolocation: Geolocation
    ) {
  }

  ionViewDidEnter() {
    this.room = this.navParams.get('room');
    this.getAuditDays();    
    this.getRoomItems(this.room.id);
    this.title = "Room: " + this.room.name + "- " + this.room.number + " (Auditing)";
  }

  getRoomItems(roomId: string): void {
    this.itemService.getItemsByRoomId(roomId)
    .subscribe(
      data => {
        this.items = data;
        this.total = this.items.length;
        this.mutateList();
      },
      error => {
        this.presentToast("Error retrieving Items");
      }
    );
  }

  refresh():void {
    this.presentToast("Refreshing List..");
    this.getRoomItems(this.room.id);
  }

  presentToast(message: string):void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  mutateList() {
    for(let i = 0; i < this.total; i++) {
      let colorCheck = this.checkDate(this.items[i], this.auditDays);
      let auditItem = {
        item: this.items[i],
        color: colorCheck[0],
        diffDays: colorCheck[1],
        showDays: false
      }
      if(auditItem.color === "secondary") {
        this.auditList.unshift(auditItem);
        }
      else {
        this.auditList.push(auditItem); 
        }
      }
    }

  buttonTapped(event: Event, item: Item) {
    this.item = item;
    this.navCtrl.push(ItemDisplayPage, {
      item: this.item,
      room: this.room
    });
  };

  checkDate(item: Item, days: number) {
      let current = new Date();
      let itemDate = new Date(item.lastAudit);
      let oneDay = 24*60*60*1000;
      let diffDays = Math.round(Math.abs((current.getTime() - itemDate.getTime())/(oneDay)));
      if (diffDays > days) {
        return ["danger", diffDays];
      } else {
        return ["secondary", diffDays];        
      }
    }

    getAuditDays() {
      this.settingsService.getSettings().subscribe(
        res => {
          this.auditSelection = res[0].auditSelection;
          // console.log(this.auditSelection);
          this.auditDays = this.selections[this.auditSelection].days;
          this.auditTime = this.selections[this.auditSelection];
        }
      )
    }

    scanCode(){
      this.barcodeScanner.scan().then(barcodeData => {
         this.itemService.searchItemByCode(barcodeData.text)
         .subscribe(
          data => { 
            //console.log(barcodeData.text);
            this.item = data;
            this.getCurrentPosition();            
            let date = new Date();          
            this.item.lastAudit = date.toDateString();
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
            }, 
            error => {       
              this.presentToast("Item Not Found");
              this.navCtrl.push(ItemCreatePage, {
               hasSpecialCode: true,
               specialCode: barcodeData.text
             });
            }
        );
      }, (err) =>{ 
        this.presentToast("no scanner present");
      });
    }

    getCurrentPosition(){
      this.options = {
        enableHighAccuracy : true
      };
       this.geolocation.getCurrentPosition(this.options).then(res => {
        //  console.log(res.coords);
         this.item.latitude = res.coords.latitude.toString(),
         this.item.longitude = res.coords.longitude.toString()
       }).catch((error) => {
        //  console.log('Location Unavailable.', error);
       });
    }
  

    updateAuditDays(days: number) {
      let settings = {
        auditDays: days 
      }
      this.settingsService.updateSettings(settings).subscribe(
        res => {
          this.presentToast("settings updated, days: " + days);
        },
        err => {
          // this.presentToast("could not update audit days")
        }
      );
      this.getAuditDays();          
    }

}
