import { SpaceUsersParams } from '../model/SpaceUsersParams';

export const getSpaceStudentsQueryKey = (spaceId?: string, filters?: SpaceUsersParams) => ['space-students/get', filters, spaceId].filter(Boolean);
