import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
//import { Room } from './room';

@Injectable()
export class RoomService {

  //private headers = new Headers({'Content-Type': 'application/json'});
  private url: string = "http://localhost:8080";
  private roomsUrl: string = this.url + "/rooms";
  //private room: any;
  //private statusCode: string;

  constructor(private http: Http){
    console.log("Room Service Started");
    //this.room = this.getAllRooms();
    //console.log(this.room);
  }

  getAllRooms(){
    return this.http.get(this.roomsUrl)
      .map(res => res.json())
      //.subscribe(room => this.room = room);
  }

  searchRoom(roomSC){
    return this.http.get(this.roomsUrl+"/code/"+roomSC)
      .map(res => res.json());
  }

  updateRoom(room) {
    //TO DO: code for updating and item => including changing properties or rooms
  }

}
