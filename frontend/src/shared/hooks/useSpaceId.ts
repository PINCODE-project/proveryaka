import { useParams } from 'react-router-dom';

export function useSpaceId() {
    const { spaceId } = useParams();
    return spaceId;
}
