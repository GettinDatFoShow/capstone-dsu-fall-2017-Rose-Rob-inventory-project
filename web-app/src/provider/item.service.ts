import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {

  private url: string = this.config.apiEndpoint;
  private itemsUrl: string = this.url + "/items";
  private roomItemsUrl: string = this.itemsUrl+"/find/items?id=";
  private historyURL: string = this.itemsUrl+"/history?id=";
  private detailsUrl: string = this.itemsUrl+"/details?id=";
  private currentRoomUrl: string = this.itemsUrl+"/room?id=";
  private itemRoomUrl: string = this.itemsUrl+"/item-to-room/item?id=";

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http){
    console.log("Item Service Started");
  }

  getAllItems(){
    return this.http.get(this.itemsUrl)
                .map(res => res.json());
  }

  searchItemByCode(code) {
    return this.http.get(this.itemsUrl+"/code/"+ code)
                .map(res => res.json());
  }

  searchItemById(itemId) {
    return this.http.get(this.itemsUrl+"/"+itemId)
                .map(res => res.json());
  }

  getItemHistory(itemId) {
    return this.http.get(this.historyURL+itemId)
                .map(res => res.json());
  }

  getItemDetails(itemId) {
    return this.http.get(this.detailsUrl+itemId)
                .map(res => res.json());
  }

  getItemCurrentRoom(roomId) {
    return this.http.get(this.currentRoomUrl+roomId)
                .map(res => res.json());
  }

  updateItem(item) {
    //TO DO: code for updating and item => including changing properties or rooms
    let specialCode = item.specialCode;
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.itemsUrl+"/code/" + specialCode, body, options)
                .map(res => res.json());
  }

  createItem(item) {
    //TO DO: code for adding item to database (creating a new item)
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.itemsUrl, body, options)
                .map(res => res.json())
  }

  getItemsByRoomId(roomId) {
    return this.http.get(this.roomItemsUrl + roomId)
                .map(res => res.json());
  }

  getRoomByItem(itemId) {
    return this.http.get(this.itemRoomUrl+itemId)
                .map(res => res.json());
  }

} 