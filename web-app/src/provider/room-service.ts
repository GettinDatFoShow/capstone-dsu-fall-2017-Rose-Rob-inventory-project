import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class RoomService {

  private url: string = "http://localhost:8080";
  private roomsUrl: string = this.url + "/rooms";

  constructor(private http: Http){
    console.log("Room Service Started");
  }

  getAllRooms(){
    return this.http.get(this.roomsUrl)
                .map(res => res.json());
  }

  searchRoom(roomId) {
    return this.http.get(this.roomsUrl + '/' + roomId)
                .map(res => res.json());
  }

  updateRoom(room) {
    //TO DO: code for updating and item => including changing properties or rooms
    let id = room.id;
    let body = JSON.stringify(room);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.roomsUrl + '/' + id, body, options)
                .map(res => res.json());
  }

  createRoom(room) {
    //TO DO: code for adding item to database (creating a new item)
    let body = JSON.stringify(room);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.roomsUrl, body, options)
                .map(res => res.json());
  }

} 
