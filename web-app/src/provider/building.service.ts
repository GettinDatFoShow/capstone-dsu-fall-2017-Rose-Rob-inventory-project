import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG, IAppConfig } from './../app/app.config';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class BuildingService {

  private url: string = this.config.apiEndpoint;
  private buildingsUrl: string = this.url + "/buildings";
  private buildingUpdate: string = this.buildingsUrl + "/"

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http){  }

  getAllBuildings(){
    return this.http.get(this.buildingsUrl)
      .map(res => res.json());
  }

  searchBuilding(buildingId) {
    return this.http.get(this.buildingsUrl+"/code/"+ buildingId)
      .map(res => res.json());
  }

  updateBuilding(building) {
    let body = JSON.stringify(building);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.buildingUpdate+building.Id, body, options)
      .map(res => res.json());
  }

}
