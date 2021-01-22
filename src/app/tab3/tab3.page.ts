import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as localDb from './../../db/db.json';
import { File } from '@ionic-native/file/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { McuService } from '../api/mcu.service';
import { Platform } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Settings } from 'http2';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  myIp: any;
  phone: string;
  private database: SQLiteObject;
  config: any;

  constructor(private mcuService: McuService, private db: DatabaseService) {
    this.getMyIpAndContact();
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getConfig().subscribe(configs => {
          this.config = configs;
        })
      }
    });
  }

  addConfig(name_1, name_2, ip) {
    this.db.addConfig(name_1, name_2, ip).then(res => {
      console.log('added', res)
    });
  }

  getMyIpAndContact() {
    this.myIp = environment.ip;
    this.phone = environment.number;
  }

}
