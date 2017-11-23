import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MobileInfoService } from '../../provider/mobileInfo.service';

/**
 * Generated class for the BuildingCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-building-create',
  templateUrl: 'building-create.html',
})
export class BuildingCreatePage {

  private mobileFlag: boolean = this.mobileInfoService.getMobileFlag();

  constructor(private mobileInfoService: MobileInfoService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingCreatePage');
  }

}
