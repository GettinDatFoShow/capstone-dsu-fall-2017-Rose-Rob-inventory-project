import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoomService {

  private url: string = this.config.apiEndpoint;
  private roomsUrl: string = this.url + "/rooms";
  private buildingRoomsUrl: string = this.roomsUrl + "/find/rooms?id=";
  private coursesUrl: string = this.roomsUrl + "/find/courses?id=";
  private createUrl: string = this.roomsUrl+"/create";
  private historyURL: string = this.roomsUrl+"/history?id=";
  private nfcUrl: string = this.roomsUrl+"/code?nfcCode=";
  private roomUpdateUrl: string = this.roomsUrl + "/update-room/room?id=";

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,private http: Http){ }

  getAllRooms(){
    return this.http.get(this.roomsUrl)
      .map(res => res.json())
  }

  getRoomByNfcCode(roomNfcCode){
    return this.http.get(this.nfcUrl+roomNfcCode)
      .map(res => res.json());
  }

  searchRoomById(roomId) {
    return this.http.get(this.roomsUrl + '/' + roomId)
                .map(res => res.json());
  }

  getRoomHistory(roomId){
    return this.http.get(this.historyURL + roomId)
      .map(res => res.json());
  }

  updateRoom(room) {
    //TO DO: code for updating and item => including changing properties or roomm
    //let id = room.id;
    let body = JSON.stringify(room);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("calling create controller...");
    console.log("room = ", room);
    console.log(body);
    return this.http.post(this.roomUpdateUrl + '/' + room.id, body, options)
                .map(res => res.json());
  }

  createRoom(room) {
    //TO DO: code for adding item to database (creating a new item)
    let body = JSON.stringify(room);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("calling create controller... ");
    console.log("room = ", room);
    console.log(body);
    return this.http.post(this.createUrl, body, options)
                .map(res => res.json());
  }

  getRoomsByBuildingId(buildingId) {
    return this.http.get(this.buildingRoomsUrl+buildingId)
                .map(res => res.json());
  }

  getCoursesByRoomId(roomId) {
    return this.http.get(this.coursesUrl+roomId)
                .map(res => res.json());
  }

}
