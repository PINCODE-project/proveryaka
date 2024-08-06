import { Typography } from 'antd';
import { Component, type ErrorInfo, type PropsWithChildren, Suspense } from 'react';

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
                    <Typography.Title level={3} style={{ textAlign: 'center', marginTop: '50px' }}>
                        Упс, произошла ошибка 🥲 <br />
                    </Typography.Title >
                    <Typography.Paragraph style={{ textAlign: 'center' }}>
                        Обновите страницу или оставьте сообщение, чтобы мы могли разобраться:{' '}
                        {/* <a */}
                        {/*    href={'https://docs.google.com/forms/d/e/1FAIpQLSc0bhr6uMUgHcM3COjc4LpBJ8fDG8qzvpx_rw188ot4UR7jKA/viewform?embedded=true'} */}
                        {/*    target="_blank" */}
                        {/*    rel="noreferrer" */}
                        {/*    style={{ fontWeight: 600 }} */}
                        {/* > */}
                        {/*    форма обратной связи */}
                        {/* </a > */}
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSc0bhr6uMUgHcM3COjc4LpBJ8fDG8qzvpx_rw188ot4UR7jKA/viewform?embedded=true"
                            width="640" height="439" frameBorder="0"
                            marginHeight="0" marginWidth="0"
                        >
                            Загрузка…
                        </iframe >
                    </Typography.Paragraph >
                </Suspense >
            );
        }

        return children;
    }
}
