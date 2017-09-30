import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class ItemService {

  private url: string = "http://localhost:8080";
  private allItemsUrl: string = this.url + "/items";

  constructor(private http: Http){
    console.log("Item Service Started");
  }

  getAllItems(){
    return this.http.get(this.allItemsUrl)
                .map(res => res.json());
  }

}


// .map(res => res.json())
// // Subscribe to the observable to get the parsed people object and attach it to the
// // component
// .subscribe(people => this.people = people);
// http.get('people.json').subscribe((res:Response) => this.people = res.json());