import { Injectable } from '@angular/core';
import { NFC } from '@ionic-native/nfc';

@Injectable()
export class MobileInfoService {
    
   private mobileFlag: boolean;

   constructor(private nfc: NFC) {
    this.mobileFlag = false;
   }
 
   setMobileFlag(mobileFlag): void {
        this.mobileFlag = mobileFlag;
   }      
 
   getMobileFlag(): boolean {
       return this.mobileFlag;
   }  

   listen() {
       return this.nfc.addTagDiscoveredListener();
   }
}