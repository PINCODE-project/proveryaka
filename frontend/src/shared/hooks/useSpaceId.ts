import { useParams } from 'react-router-dom';

export function useSpaceId() {
    const { spaceId } = useParams();

    if (spaceId === undefined || Number.isNaN(+spaceId)) {
        return undefined;
    }
    return +spaceId;
}
