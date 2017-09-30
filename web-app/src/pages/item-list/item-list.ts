import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item-service';

/**
 * Generated class for the ItemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})

export class ItemListPage {

  public items: any;
  public error: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
    this.items = this.itemService.getItems();
    this.error = this.itemService.getStatusCode();
    console.log(this.itemService.getAllItems());
    console.log(this.error);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

}
