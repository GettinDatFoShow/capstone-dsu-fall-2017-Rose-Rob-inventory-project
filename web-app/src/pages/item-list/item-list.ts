import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../provider/item-service';
import { Item } from '../../provider/item';
import { Observable } from 'rxjs/Observable';
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
  public item: Item = {
    id: 999999999,
    specialCode : "99l",
    type : "electronic",
    addedToRoom : "2017-09-29T02:57:24.665+0000",
    created : "2017-09-29T02:57:24.665+0000",
    lastUpdated : "2017-09-29T02:57:24.665+0000",
    active : true,
    cost : 167.0,
    itemPicture : null,
    paid : true
    }

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
    // do something here when we figure out what to do 
    // when an item is clicked
    };

  }
