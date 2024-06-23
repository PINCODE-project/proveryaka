import { Decorator } from '@storybook/react';

import { SuspenseWrapper } from '@shared/mock/jest/SuspenseWrapper';

export const SuspenseDecorator: Decorator = Story => {
    return SuspenseWrapper(<Story />);
};
