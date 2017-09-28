import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListItem } from '../../provider/item-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public Listitem: ListItem) {

     this.getItem();

  }

  getItem(){
    this.Listitem.getItems().subscribe(data=>console.log(data));
  }

}
