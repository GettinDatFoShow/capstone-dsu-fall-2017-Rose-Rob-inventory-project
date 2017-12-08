import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<IAppConfig>("app.config");

export interface IAppConfig {
    apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
  //apiEndpoint: "http://192.168.117.35:8080"
  // apiEndpoint: "http://192.168.43.242:8080"
  apiEndpoint: "http://192.168.1.7:8080"
};
