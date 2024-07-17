// src/components/Header.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Header from '../components/Header';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: StoryFn = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};