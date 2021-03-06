import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MobileInfoService } from '../../provider/mobileInfo.service';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private mobileInfoService: MobileInfoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
