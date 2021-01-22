import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class McuService {
  public url = environment.ip
  constructor(private http: HttpClient, public toastController: ToastController) { }

  controlAppliances(relay: number, state: boolean) {
    let status;
    if (!state) {
      status = 0
    } else {
      status = 1
    }
    return this.http.get(this.url + '/update?relay=' + relay + '&state=' + status, {}).subscribe(res => {
      console.log(res);
    }, err => {
      this.presentToast('Device Offline or Something Went Wrong !')
    });
  }

  getOnlineStatus() {
    return this.http.get(this.url + '/status', {});
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
