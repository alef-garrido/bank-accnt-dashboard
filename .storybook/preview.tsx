import React from 'react'
import type { Preview } from '@storybook/react-vite'
import './preview.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => {
      React.useLayoutEffect(() => {
        document.documentElement.style.colorScheme = 'light'
      }, [])
      
      return (
        <div className="w-full h-screen bg-background text-foreground">
          <Story />
        </div>
      )
    },
  ],
};

export default preview;