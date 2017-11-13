import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomHistoryService {

  private url: string = this.config.apiEndpoint;
  private roomsUrl = this.url + "/rooms";
  private roomHistoriesUrl = this.url+"/find/history";
  private roomHistoryByRoomId = this.roomHistoriesUrl + "/find-room-history/room?id="

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: Http) {
    console.log("Room History Service started..");
  }

  getAllRoomHistory() {
    return this.http.get(this.roomHistoriesUrl)
      .map(res => res.json());
  }

  getRoomHistoryByRoomId(roomId) {
    return this.http.get(this.roomHistoryByRoomId+roomId)
      .map(res => res.json());
  }
}
