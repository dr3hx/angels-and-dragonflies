'use client';

import React from 'react';
import { PreferencesProvider } from '@payloadcms/ui';
import { NavProvider } from './admin/NavProvider';
import { ThemeProvider } from './Theme';
import { HeaderThemeProvider } from './HeaderTheme';

// Export the Component that Payload will use to wrap the admin panel
export const Component: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <PreferencesProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          <NavProvider>
            {children}
          </NavProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </PreferencesProvider>
  );
};

// Also export as default for direct imports if needed
export default Component;
