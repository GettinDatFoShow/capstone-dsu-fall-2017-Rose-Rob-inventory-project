import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item-service';
import { Item } from '../../provider/item';
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
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
  providers: [ItemService]
})

export class ItemListPage {

  public items: any;
  public observe: Observable<any>;
  public error: any;
  public item: Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemService: ItemService) {
    this.getAllItems();
    console.log(this.observe);
  }

  getAllItems() {
    this.itemService.getAllItems()
        .subscribe(
          // data => console.log(data),
          data => this.items = data,
          error => alert(error),
          () => {
            console.log(this.items);
            console.log("finished")
          }            
        );
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

  itemTapped(event, item) {
    var itemSC = item.specialCode;
    this.itemService.searchItem(itemSC)
    .subscribe(
      // data => console.log(data),
      data => this.item = data,
      error => alert(error),
      () => {
        console.log(this.item);
        console.log("finished")
      }            
    );
    };

  }
