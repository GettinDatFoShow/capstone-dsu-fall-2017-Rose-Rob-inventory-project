import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemHistoryService {

    private url: string = this.config.apiEndpoint;
    private itemsUrl = this.url + "/items";
    private itemHistoriesUrl = this.itemsUrl+"/find/history";
    private itemHistoryByItemId = this.itemsUrl + "/find-item-history/item?id="

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: Http) {  }

    getAllItemHistory() {
        return this.http.get(this.itemHistoriesUrl)
                    .map(res => res.json());
    }
    
    getItemHistoryByItemId(itemId: string) {
        return this.http.get(this.itemHistoryByItemId+itemId)
                    .map(res => res.json());
    }
}