import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {

  private url: string = "http://localhost:8080";
  private itemsUrl: string = this.url + "/items";

  constructor(private http: Http){
    console.log("Item Service Started");
  }

  getAllItems(){
    return this.http.get(this.itemsUrl)
                .map(res => res.json());
  }

  searchItem(itemSC) {
    return this.http.get(this.itemsUrl+"/code/"+ itemSC)
                .map(res => res.json());
  }

  updateItem(item) {
    //TO DO: code for updating and item => including changing properties or rooms
  }

  createItem(item) {
    //TO DO: code for adding item to database (creating a new item)
  }

} 
