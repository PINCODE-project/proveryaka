import { useParams } from 'react-router-dom';

export function useIssueId() {
    const { issueId } = useParams();
    return issueId;
}
