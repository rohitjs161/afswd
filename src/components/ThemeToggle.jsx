import React from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Light
      </span>
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        className={`${
          isDark ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span className="sr-only">Toggle dark mode</span>
        <span
          className={`${
            isDark ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Dark
      </span>
    </div>
  );
};

export default ThemeToggle;
