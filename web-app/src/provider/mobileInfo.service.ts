import { Injectable } from '@angular/core';

@Injectable()
export class MobileInfoService {
    
   private mobileFlag: boolean;

   constructor() {
    this.mobileFlag = false;
   }
 
   setFlag(mobileFlag): void {
        this.mobileFlag = mobileFlag;
   }      
 
   getFlag(): boolean {
       return this.mobileFlag;
   }  
}