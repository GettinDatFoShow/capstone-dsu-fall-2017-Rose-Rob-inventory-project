import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class BuildingService {

  private url: string = "http://localhost:8080";
  private buildingsUrl: string = this.url + "/buildings";

  constructor(private http: Http){
    console.log("Building Service Started");
  }

  getAllBuildings(){
    return this.http.get(this.buildingsUrl)
      .map(res => res.json());
  }

  searchBuilding(buildingSC) {
    return this.http.get(this.buildingsUrl+"/code/"+ buildingSC)
      .map(res => res.json());
  }

  updateBuilding(building) {
    //TO DO: code for updating and item => including changing properties or rooms
  }

}
