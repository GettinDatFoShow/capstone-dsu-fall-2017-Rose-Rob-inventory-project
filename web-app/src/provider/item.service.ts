import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Item } from "ionic-angular/components/item/item";

@Injectable()
export class ItemService {

  private url: string = this.config.apiEndpoint;
  private itemsUrl: string = this.url + "/items";
  private roomItemsUrl: string = this.itemsUrl+"/find/items?id=";
  private historyURL: string = this.itemsUrl+"/history?id=";
  private detailsUrl: string = this.itemsUrl+"/details?id=";
  private currentRoomUrl: string = this.itemsUrl+"/room?id=";
  private itemRoomUrl: string = this.itemsUrl+"/item-to-room/item?id=";
  private itemDescriptionsUrl: string = this.itemsUrl+"/descriptions";
  private itemImagesUrl: string = this.itemsUrl+"/find/item-images/";
  private createUrl: string = this.itemsUrl + "/create";
  private itemUpdateUrl: string = this.itemsUrl + "/update-item/item?id=";

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http){  } 


  getAllItems(){
    return this.http.get(this.itemsUrl)
                .map(res => res.json());
  }

  searchItemByCode(nfcCode: string) {
    return this.http.get(this.itemsUrl+"/code/"+ nfcCode)
                .map(res => res.json());
  }

  searchItemById(itemId: string) {
    return this.http.get(this.itemsUrl+"/"+itemId)
                .map(res => res.json());
  }

  getItemHistory(itemId: string) {
    return this.http.get(this.historyURL+itemId)
                .map(res => res.json());
  }

  getItemDetails(itemId: string) {
    return this.http.get(this.detailsUrl+itemId)
                .map(res => res.json());
  }

  getItemCurrentRoom(roomId: string) {
    return this.http.get(this.currentRoomUrl+roomId)
                .map(res => res.json());
  }

  updateItem(item) {
    // code for updating and item => including changing properties or rooms
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.itemUpdateUrl + item.id, body, options)
                .map(res => res.json());
  }

  createItem(item) {
    // code for adding item to database (creating a new item)
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("calling create controller...");
    console.log("item = ", item);
    console.log(body);
    return this.http.post(this.createUrl, body, options)
                .map(res => res.json());
  }

  getItemsByRoomId(roomId: string) {
    return this.http.get(this.roomItemsUrl + roomId)
                .map(res => res.json());
  }

  getRoomByItem(itemId: string) {
    return this.http.get(this.itemRoomUrl+itemId)
                .map(res => res.json());
  }

  getAllDescriptions(){
    return this.http.get(this.itemDescriptionsUrl)
                .map(res => res.json());
  }

  getItemImages(itemId: string){
    return this.http.get(this.itemImagesUrl+itemId)
                .map(res => res.json());
  }

}
