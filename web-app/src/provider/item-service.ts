import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {

  private url: string = "http://localhost:8080";
  private itemsUrl: string = this.url + "/items";
  private roomItemsUrl: string = this.url+"/rooms/find/items?id=";

  constructor(private http: Http){
    console.log("Item Service Started");
  }

  getAllItems(){
    return this.http.get(this.itemsUrl)
                .map(res => res.json());
  }

  searchItem(itemSc) {
    return this.http.get(this.itemsUrl+"/code/"+ itemSc)
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

} 
