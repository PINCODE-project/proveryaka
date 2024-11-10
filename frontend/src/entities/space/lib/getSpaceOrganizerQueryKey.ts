import { SpaceUsersParams } from '../model/SpaceUsersParams';

export const getSpaceOrganizerQueryKey = (spaceId?: string, filters?: SpaceUsersParams) => ['space-organizer/get', filters, spaceId].filter(Boolean) as string[];
