export const getSpaceOrganizerQueryKey = (spaceId?: string): (string)[] => ['space-organizer/get', spaceId].filter(Boolean) as string[];
