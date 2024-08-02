import { SpaceRoleType } from '@entities/space/model/SpaceRoleType';

import { SelectItem } from '@shared/ui';

export const roles: SelectItem<number>[] = [
    { value: SpaceRoleType.Student, label: 'Студент' },
    { value: SpaceRoleType.Expert, label: 'Эксперт' },
    { value: SpaceRoleType.Organizer, label: 'Организатор' },
];
