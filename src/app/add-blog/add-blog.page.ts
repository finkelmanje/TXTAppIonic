import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.page.html',
  styleUrls: ['./add-blog.page.scss'],
})
export class AddBlogPage implements OnInit {

  title: any;
  content: any;
  location: any;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: string;

  constructor(public viewCtrl: ModalController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) { }
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  save(): void {

    let blog = {
      title: this.title,
      content: this.content,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.viewCtrl.dismiss(blog);

  }

  close(): void {
    this.viewCtrl.dismiss();
  }  

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  // get address using coordinates
  getAddress(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.pretifyAddress(res[0]);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  // address
  pretifyAddress(address){
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    return address.slice(0, -2);
  }
  ngOnInit() {
  }

}
