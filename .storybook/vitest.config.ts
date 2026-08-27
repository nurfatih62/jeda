import type { Preview } from '@storybook/nextjs-vite';
import '../app/global.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'jeda',
      values: [{ name: 'jeda', value: '#FBF8F2' }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
