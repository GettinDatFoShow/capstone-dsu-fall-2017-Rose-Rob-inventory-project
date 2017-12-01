import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { IAppConfig, APP_CONFIG } from '../app/app.config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsServiceProvider {

  private url: string = this.config.apiEndpoint;
  private settingsUrl: string = this.url+"/settings";
  private updateSettingsUrl: string =  this.settingsUrl+"/update";

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, public http: Http) {
  }

  getSettings() {
    return this.http.get(this.settingsUrl)
    .map(res => res.json())  
  }

  updateSettings(settings) {
    let body = JSON.stringify(settings);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.updateSettingsUrl, body, options)
                .map(res => res.json());
  }
}
