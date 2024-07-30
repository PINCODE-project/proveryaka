import { useParams } from 'react-router-dom';

export function useSolutionId() {
    const { solutionId } = useParams();
    return solutionId;
}
