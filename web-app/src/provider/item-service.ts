import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Item } from './item';

@Injectable()
export class ItemService {

  private headers = new Headers({'Content-Type': 'application/json'});  
  private url: string = "http://localhost:8080";
  private allItems: string = this.url + "/items";
  private items: any;
  private statusCode: string;

  constructor(private http: Http){
    console.log("Item Service Started");
    this.items = this.getAllItems();
    console.log(this.items);
  }

  getAllItems(){
    return this.http.get(this.allItems)
            .map(res => res.json())
            .subscribe(items => this.items = items);
  }

  getItems() {
    return this.items;
  }

  getStatusCode() {
    return this.statusCode;
  }

  handleError(){
    console.log("errror happened.");
  };
}


// .map(res => res.json())
// // Subscribe to the observable to get the parsed people object and attach it to the
// // component
// .subscribe(people => this.people = people);
// http.get('people.json').subscribe((res:Response) => this.people = res.json());