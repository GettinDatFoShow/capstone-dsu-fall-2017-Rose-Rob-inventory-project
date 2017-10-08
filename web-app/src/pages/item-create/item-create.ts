import { ItemService } from './../../provider/item-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html',
})
export class ItemCreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemCreatePage');
  }

}
