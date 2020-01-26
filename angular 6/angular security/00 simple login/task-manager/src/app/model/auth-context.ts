import { UserProfile } from './user-profile';
import { SimpleClaim } from './simple-claim';

export interface AuthContext {
  userProfile: UserProfile;
  claims: SimpleClaim[];
}

