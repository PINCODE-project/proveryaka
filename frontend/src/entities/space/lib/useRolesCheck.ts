import { useMemo } from 'react';

import { useGetSpaceRoles } from '@entities/space/lib/useGetSpaceRoles';
import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';

import { useSpaceId } from '@shared/hooks/useSpaceId';

export function useRolesCheck() {
    const spaceId = useSpaceId();
    const { data: roles } = useGetSpaceRoles(spaceId ?? '');

    return useMemo(() => ({
        isStudent: roles?.roleList?.includes(SpaceRoleType.Student) ?? false,
        isExpert: roles?.roleList?.includes(SpaceRoleType.Expert) ?? false,
        isOrganizer: roles?.roleList?.includes(SpaceRoleType.Organizer) ?? false,
    }), [roles]);
}
