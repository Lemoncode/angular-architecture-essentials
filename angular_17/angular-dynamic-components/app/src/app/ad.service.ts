import { Injectable, Type } from '@angular/core';
import { PersonProfileComponent } from './person-profile/person-profile.component';
import { PersonDateAdComponent } from './person-date-ad/person-date-ad.component';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  getAds() {
    return [
      {
        component: PersonProfileComponent,
        inputs: { name: 'Jane', bio: 'Smart as they come' },
      },
      {
        component: PersonProfileComponent,
        inputs: { name: 'Joe', bio: 'Very nice dude' },
      },
      {
        component: PersonDateAdComponent,
        inputs: {
          headline: 'Date and relax!',
          body: 'Submit your resume today!',
        },
      },
      {
        component: PersonDateAdComponent,
        inputs: {
          headline: 'All kind of plans',
          body: 'Apply today',
        },
      },
    ] as { component: Type<any>; inputs: Record<string, unknown> }[];
  }
}
