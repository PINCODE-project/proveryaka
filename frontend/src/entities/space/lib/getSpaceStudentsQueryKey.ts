export const getSpaceStudentsQueryKey = (spaceId?: string): (string)[] => ['space-students/get', spaceId].filter(Boolean) as string[];
