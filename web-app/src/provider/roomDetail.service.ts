import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomDetailService {

    private url: string = this.config.apiEndpoint;
    private roomDetailsUrl = this.url + "/rooms/find/details/room?id=";

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        console.log("RoomDetailService Started");
    }

    getRoomDetails(roomId) {
        return this.http.get(this.roomDetailsUrl + roomId)
                    .map(res => res.json());
    }
}
