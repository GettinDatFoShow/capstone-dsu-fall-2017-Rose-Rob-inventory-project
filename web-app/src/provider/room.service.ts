import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Room } from "../models/room";

@Injectable()
export class RoomService {

  private url: string = this.config.apiEndpoint;
  private roomsUrl: string = this.url + "/rooms";
  private buildingRoomsUrl: string = this.roomsUrl + "/find/rooms?id=";
  private coursesUrl: string = this.roomsUrl + "/find/courses?id=";
  private createUrl: string = this.roomsUrl+"/create";
  private historyURL: string = this.roomsUrl+"/history?id=";
  private nfcUrl: string = this.roomsUrl+"/code?id=";
  private roomUpdateUrl: string = this.roomsUrl + "/update-room/room?id=";

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,private http: Http){ }

  getAllRooms(){
    return this.http.get(this.roomsUrl)
      .map(res => res.json())
  }

  getRoomByNfcCode(roomNfcCode: string){
    return this.http.get(this.nfcUrl+roomNfcCode)
      .map(res => res.json());
  }

  searchRoomById(roomId: string) {
    return this.http.get(this.roomsUrl + '/' + roomId)
                .map(res => res.json());
  }

  getRoomHistory(roomId: string){
    return this.http.get(this.historyURL + roomId)
      .map(res => res.json());
  }

  updateRoom(room) {
    let body = JSON.stringify(room);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.roomUpdateUrl + '/' + room.id, body, options)
                // .map(res => res.json());
  }

  createRoom(room) {
    let body = JSON.stringify(room);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.createUrl, body, options)
                // .map(res => res.json());
  }

  getRoomsByBuildingId(buildingId: string) {
    return this.http.get(this.buildingRoomsUrl+buildingId)
                .map(res => res.json());
  }

  getCoursesByRoomId(roomId: string) {
    return this.http.get(this.coursesUrl+roomId)
                .map(res => res.json());
  }

}
