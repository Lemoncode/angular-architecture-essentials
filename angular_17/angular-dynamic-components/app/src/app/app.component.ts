import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdBannerComponent } from './ad-banner/ad-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AdBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
