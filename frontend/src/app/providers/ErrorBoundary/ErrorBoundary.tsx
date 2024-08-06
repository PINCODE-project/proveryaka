import { Typography } from 'antd';
import { Component, type ErrorInfo, type PropsWithChildren, Suspense } from 'react';

import { Link } from '@shared/ui';

type ErrorBoundaryProps = PropsWithChildren;

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <Suspense fallback="">
                    <div>
                        <Typography.Title level={2}>Упс, произошла ошибка 🥲</Typography.Title>
                        <Typography>Мы сожалеем, что вы столкнулись с проблемой</Typography>
                        <Link to={'https://docs.google.com/forms/d/e/1FAIpQLSc0bhr6uMUgHcM3COjc4LpBJ8fDG8qzvpx_rw188ot4UR7jKA/viewform?embedded=true'}>
                            Оставьте сообщение, чтобы мы могли разобраться
                        </Link>
                    </div>
                </Suspense>
            );
        }

        return children;
    }
}
