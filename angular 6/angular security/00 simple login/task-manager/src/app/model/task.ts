import { Milestone } from './milestone';
import { UserPermission } from './user-permission';

export interface Task {
  id: number;
  name: string;
  milestones: Milestone[];
  userPermissions: UserPermission[];
}



