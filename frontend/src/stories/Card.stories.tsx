import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Card from '../components/Card/Card';
import { CardProps } from '../store/types';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Move',
  description: 'Survive moving places in the pandemic.',
  titleWeight: 'bold', // 제목 두께 설정
};