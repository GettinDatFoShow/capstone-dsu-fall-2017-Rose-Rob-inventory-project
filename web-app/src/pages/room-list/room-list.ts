import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomService } from '../../provider/room-service';
import { Room } from '../../provider/room';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the RoomListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-list',
  templateUrl: 'room-list.html',
})
export class RoomListPage {

  public rooms: any;
  public observe: Observable<any>;
  public error: any;
  public room: Room;

  constructor(public navCtrl: NavController, public navParams: NavParams, public roomServices: RoomService) {
    this.getAllRooms();
    console.log(this.observe);
  }

  getAllRooms() {
    this.roomServices.getAllRooms()
      .subscribe(
        // data => console.log(data),
        data => this.rooms = data,
        error => alert(error),
        () => {
          console.log(this.rooms);
          console.log("finished")
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomListPage');
  }

  roomTapped(event, room) {
    var roomSC = room.specialCode;
    this.roomServices.searchRoom(roomSC)
      .subscribe(
        // data => console.log(data),
        data => this.room = data,
        error => alert(error),
        () => {
          console.log(this.room);
          console.log("finished")
        }
      );
  };

}
