import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemHistoryService {

    private url: string = this.config.apiEndpoint;
    private itemsUrl = this.url + "/items";
    private itemHistoriesUrl = this.url+"/find/history";
    private itemHistoryByItemId = this.itemsUrl + "/find-item-history/item?id="

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: Http) {
        console.log("Item History Service started..");
    }

    getAllItemHistory() {
        return this.http.get(this.itemHistoriesUrl)
                    .map(res => res.json());
    }
    
    getItemHistoryByItemId(itemId) {
        return this.http.get(this.itemHistoryByItemId+itemId)
                    .map(res => res.json());
    }
}