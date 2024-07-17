import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Form from '../components/Form/Form';

export default {
  title: 'Components/Form',
  component: Form,
} as Meta;

const Template: StoryFn = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {};