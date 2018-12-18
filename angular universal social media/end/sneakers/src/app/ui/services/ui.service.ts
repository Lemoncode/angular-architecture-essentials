import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private appColor = '#343a40';
  private appImage = 'logo'; //TODO: Save log in assets
  private appTitle = 'Sneakers';
  private appDescription = 'Online sneakers';

  constructor(private meta: Meta, private title: Title) { }

  setMetaData(config) {
    const description = config.description || this.appDescription;
    const image = config.image || this.appImage;
    const title = config.title ? `${config.title} - ${this.appTitle}` : this.appTitle;

    this.title.setTitle(title);

    const tags = [
      { name: 'description', content: description },
      { name: 'theme-color', content: this.appColor },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: image },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: title },
      { name: 'apple-touch-startup-image', content: image },
      { poperty: 'og:title', content: title},
      { poperty: 'og:description', content: description},
      { poperty: 'og:image', content: image},
    ];

    tags.forEach(tag => this.meta.updateTag(tag));
  }
}
