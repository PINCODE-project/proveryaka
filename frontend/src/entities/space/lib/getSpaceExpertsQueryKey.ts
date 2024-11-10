import { SpaceUsersParams } from '../model/SpaceUsersParams';

export const getSpaceExpertsQueryKey = (spaceId: string, filters?: SpaceUsersParams) => ['space-experts/get', filters, spaceId].filter(Boolean);
