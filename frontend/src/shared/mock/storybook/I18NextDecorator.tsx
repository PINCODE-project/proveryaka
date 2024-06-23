import { type Decorator } from '@storybook/react';
import React from 'react';

import { I18NextWrapper } from '@shared/mock/jest/I18NextWrapper';

export const I18NextDecorator: Decorator = Story => {
    return I18NextWrapper(<Story />);
};
