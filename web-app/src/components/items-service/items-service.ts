import { Component } from '@angular/core';

/**
 * Generated class for the ItemsServiceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'items-service',
  templateUrl: 'items-service.html'
})
export class ItemsServiceComponent {

  text: string;

  constructor() {
    console.log('Hello ItemsServiceComponent Component');
    this.text = 'Hello World';
  }

}
