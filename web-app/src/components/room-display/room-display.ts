import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Room } from '../../models/room';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { RoomUpdatePage } from '../../pages/room-update/room-update';
import { RoomService } from '../../provider/room.service';
import { Building } from '../../models/building';
import { BuildingService } from '../../provider/building.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { GoogleMaps, 
  GoogleMap,
  CameraPosition,
  LatLng,
  GoogleMapsEvent,
  Marker,
  MarkerOptions } from '@ionic-native/google-maps';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { RoomLocation } from '../../models/RoomLocation';

@Component({
  selector: 'room-display',
  templateUrl: 'room-display.html'
})
export class RoomDisplayComponent implements OnInit{
  options: GeolocationOptions;
  currentPos: Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  @Input("displayRoom") room: Room;
  @Input("total") total: number = 0;
  //google: GoogleMap;
  private building: Building = new Building;
  constructor(private navCtrl: NavController, private roomService: RoomService,
      private buildingService: BuildingService, private toastCtrl: ToastController,
      private google: GoogleMaps, private geolocation: Geolocation
  ) {         
  }

  ngOnInit() {
   this.getBuilding(); 
   this.getUserPosition();
  }

  getUserPosition(){
    this.options = {
        enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
  }

  addMap(la,lo){
        let mapOptions = {
        camera: {
          target: {
            lat: la,
            lng: lo
          }
        },
        zoom: 15,
        tilt: 30,
        }
    
        // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.map = this.google.create("map_canvas", mapOptions);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
          if(this.room.latitude !== undefined && this.room.longitude !== undefined){
            this.map.addMarker({
              title: this.room.name,
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: this.room.latitude,
                lng: this.room.longitude
              }
            });
            }})
          
  }

  // addMarker(){

  //       let marker = new google.maps.Marker({
  //       map: this.map,
  //       animation: google.maps.Animation.DROP,
  //       position: this.map.getCenter()
  //       });
    
  //       let content = "<p>This is your current position !</p>";          
  //       let infoWindow = new google.maps.InfoWindow({
  //       content: content
  //       });
    
  //       google.maps.event.addListener(marker, 'click', () => {
  //       infoWindow.open(this.map, marker);
  //       });
    
  // }

  updateClicked(event: Event) {
    this.navCtrl.push(RoomUpdatePage, {
      room: this.room
    });
  };

  getBuilding() {
    this.buildingService.findBuildingByRoom(this.room.id).subscribe(
      res => {
        this.building = res;
      },
      err => {
        this.presentToast("Building not found.")
      }
    )
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
