import { Component } from '@angular/core';
import { McuService } from '../api/mcu.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  value: any;
  r_1: boolean;
  r_2: boolean;

  constructor(private mcuService: McuService) { }

  relay_1($event) {
    this.r_1 = !this.r_1;
    this.mcuService.controlAppliances(1, this.r_1)
  }

  relay_2($event) {
    this.r_2 = !this.r_2;
    this.mcuService.controlAppliances(2, this.r_2);
  }
}
