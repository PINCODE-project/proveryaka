import { GetSpaceUserRole } from '../model/GetSpaceUserRole';
import { SpaceRoleType } from '../model/SpaceRoleType';

export function isOrganizer(roles: GetSpaceUserRole): boolean {
    return roles.roleList?.includes(SpaceRoleType.Organizer) ?? false;
}
