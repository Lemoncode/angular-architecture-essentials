import { Component, inject } from '@angular/core';
import { AdService } from '../ad.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './ad-banner.component.html',
  styles: ``
})
export class AdBannerComponent {
  private adList = inject(AdService).getAds();

  private currentAdIndex = 0;

  get currentAd() {
    return this.adList[this.currentAdIndex];
  }

  displayNextAd() {
    this.currentAdIndex++;
    // Reset the current ad index back to `0` when we reach the end of an array.
    if (this.currentAdIndex === this.adList.length) {
      this.currentAdIndex = 0;
    }
  }
}
