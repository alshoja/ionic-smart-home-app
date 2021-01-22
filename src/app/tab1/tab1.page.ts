import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { McuService } from '../api/mcu.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  status: any;
  online:boolean;
  backcolor:string;

  constructor(private mcuService: McuService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.getOnlineStatus();
    });
  }

  getOnlineStatus() {
    this.mcuService.getOnlineStatus().subscribe(
      res => {
        this.status = "Online"
        this.backcolor = "green"
        this.online =true;
      }, err => {
        this.online =false;
        this.backcolor = "red"
        this.status = "Offline"
      })
  }

}
