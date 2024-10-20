import { useParams } from 'react-router-dom';

export function useCreateIssueId() {
    const { createIssueId } = useParams();
    return createIssueId;
}
