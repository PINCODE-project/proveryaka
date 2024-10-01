import { Space } from '@entities/space';

export type EditSpaceRequest = Pick<Space, 'iconFileId' | 'description' | 'name' | 'id' | 'accessType'>;
