import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class ListItem {

  private url: string = "http://localhost:8100/";

  constructor(private http: Http){
    console.log("Hello Everyone");
  }

  getItems(){
    return this.http.get(this.url)
      .do(res => console.log(res));
  }

}
