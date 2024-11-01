import { Typography } from 'antd';
import { Component, type ErrorInfo, type PropsWithChildren } from 'react';

type ErrorBoundaryProps = PropsWithChildren;

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        // eslint-disable-next-line max-len
        const formLink = 'https://docs.google.com/forms/d/e/1FAIpQLSc0bhr6uMUgHcM3COjc4LpBJ8fDG8qzvpx_rw188ot4UR7jKA/viewform?embedded=true';

        if (hasError) {
            return (
                <>
                    <Typography.Title level={3} style={{ textAlign: 'center', marginTop: '50px' }}>
                        Упс, произошла ошибка 🤯 <br />
                    </Typography.Title>
                    <Typography.Paragraph style={{ textAlign: 'center' }}>
                        Обновите страницу или оставьте сообщение, чтобы мы могли разобраться:{' '}
                        <a
                            href={formLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontWeight: 600 }}
                        >
                            форма обратной связи
                        </a>
                    </Typography.Paragraph>
                </>
            );
        }

        return children;
    }
}
