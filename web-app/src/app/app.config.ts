import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<IAppConfig>("app.config");

export interface IAppConfig {
    apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
    apiEndpoint: "http://192.168.117.186:8080"
    // apiEndpoint: "http://localhost:8080"
//   apiEndpoint: "http://192.168.200.148:8080"

};
