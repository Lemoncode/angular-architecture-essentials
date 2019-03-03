import { UserPermission } from './user-permission';

export class UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userPermissions: UserPermission[];
}


