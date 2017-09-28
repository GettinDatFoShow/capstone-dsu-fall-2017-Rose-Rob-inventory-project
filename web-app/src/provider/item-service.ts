import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class ListItem {

  private url: string = "http://localhost:8080";
  private allItems: string = "/items";
  private items: any;

  constructor(private http: Http){
    console.log("Item Service Started");
    this.items = this.getItems();
    console.log(this.items);
  }

  getItems(){
    return this.http.get(this.url+this.allItems)
      .then(res => {
         return res.data;
      });
  }

}
