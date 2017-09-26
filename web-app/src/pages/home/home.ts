import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListItem } from '../../provider/list-page';

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
