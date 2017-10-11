import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemDetailService {

    private url: string = this.config.apiEndpoint;
    private itemDetailsUrl = this.url + "/item_details/item?id=";

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {
        console.log("ItemDetailService Started")
    }

    getItemDetails(itemId) {
        return this.http.get(this.itemDetailsUrl + itemId) 
                    .map(res => res.json());
    }
}