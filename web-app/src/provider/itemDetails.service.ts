import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemDetailService {

    private url: string = this.config.apiEndpoint;
    private itemDetailsUrl = this.url + "/items/find/details/item?id=";

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) {  }

    getItemDetails(itemId) {
        return this.http.get(this.itemDetailsUrl + itemId) 
                    .map(res => res.json());
    }
}