import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomHistoryService {

  private url: string = this.config.apiEndpoint;
  private roomsUrl = this.url + "/rooms";
  private roomHistoriesUrl = this.roomsUrl+"/find/history";
  private roomHistoryByRoomId = this.roomsUrl + "/find-room-history/room?id="

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: Http) {  }

  getAllRoomHistory() {
    return this.http.get(this.roomHistoriesUrl)
      .map(res => res.json());
  }

  getRoomHistoryByRoomId(roomId: string) {
    return this.http.get(this.roomHistoryByRoomId+roomId)
      .map(res => res.json());
  }
}
