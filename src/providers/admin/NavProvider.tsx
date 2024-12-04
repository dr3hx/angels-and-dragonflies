'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePreferences } from '@payloadcms/ui';
import { usePathname } from 'next/navigation';
import canUseDOM from 'src/utilities/canUseDOM';

interface NavContextType {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

const NAV_COLLAPSED_KEY = 'nav-collapsed-state';

export const NavProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { getPreference, setPreference } = usePreferences();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(() => {
    if (!canUseDOM) return null;
    const isMobile = window.innerWidth <= 1023;
    return isMobile ? true : false;
  });

  // Initialize state from Payload preferences
  useEffect(() => {
    const initializeState = async () => {
      if (!canUseDOM) return;
      
      try {
        const savedPreference = await getPreference(NAV_COLLAPSED_KEY);
        const isMobile = window.innerWidth <= 1023;
        setIsCollapsed(isMobile ? true : (savedPreference ?? false));
      } catch (error) {
        console.error('Failed to fetch nav preference:', error);
        setIsCollapsed(window.innerWidth <= 1023);
      }
    };

    initializeState();
  }, [getPreference]);

  // Handle window resize with debounce
  useEffect(() => {
    if (!canUseDOM) return;

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMobile = window.innerWidth <= 1023;
        if (isMobile && !isCollapsed) {
          setIsCollapsed(true);
        }
        updateDataAttributes(isCollapsed ?? false, isMobile);
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isCollapsed]);

  // Update data attributes
  const updateDataAttributes = useCallback((collapsed: boolean, isMobile = window.innerWidth <= 1023) => {
    if (!canUseDOM) return;

    requestAnimationFrame(() => {
      const selectors = [
        '.template-default',
        '.template-default__nav',
        '.template-default__wrap',
        '.admin-header',
        '.nav__toggle'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (el instanceof HTMLElement) {
            // Always set collapsed state
            el.setAttribute('data-nav-collapsed', collapsed.toString());
            
            // Handle mobile open state
            if (isMobile) {
              el.setAttribute('data-nav-open', (!collapsed).toString());
            } else {
              el.removeAttribute('data-nav-open');
            }
          }
        });
      });
    });
  }, []);

  // Toggle nav state
  const toggleCollapsed = useCallback(async () => {
    if (!canUseDOM || isCollapsed === null) return;

    try {
      const isMobile = window.innerWidth <= 1023;
      const newState = !isCollapsed;
      
      setIsCollapsed(newState);
      if (!isMobile) {
        await setPreference(NAV_COLLAPSED_KEY, newState);
      }
      updateDataAttributes(newState, isMobile);
    } catch (error) {
      console.error('Failed to update nav state:', error);
    }
  }, [isCollapsed, setPreference, updateDataAttributes]);

  // Update attributes on mount and state change
  useEffect(() => {
    if (!canUseDOM || isCollapsed === null) return;
    const isMobile = window.innerWidth <= 1023;
    updateDataAttributes(isCollapsed, isMobile);
  }, [isCollapsed, updateDataAttributes]);

  // Close mobile menu on navigation
  useEffect(() => {
    if (!canUseDOM || isCollapsed === null) return;
    const isMobile = window.innerWidth <= 1023;
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
      updateDataAttributes(true, true);
    }
  }, [pathname, updateDataAttributes]);

  // Handle backdrop clicks for mobile
  useEffect(() => {
    if (!canUseDOM || isCollapsed === null) return;

    const handleBackdropClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains('template-default') && 
        target.hasAttribute('data-nav-open') &&
        target.getAttribute('data-nav-open') === 'true'
      ) {
        toggleCollapsed();
      }
    };

    window.addEventListener('click', handleBackdropClick);
    return () => window.removeEventListener('click', handleBackdropClick);
  }, [isCollapsed, toggleCollapsed]);

  // Handle touch gestures for mobile
  useEffect(() => {
    if (!canUseDOM || isCollapsed === null) return;

    let touchStartX = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;
      const isMobile = window.innerWidth <= 1023;

      if (isMobile) {
        if (swipeDistance > minSwipeDistance && isCollapsed) {
          toggleCollapsed();
        } else if (swipeDistance < -minSwipeDistance && !isCollapsed) {
          toggleCollapsed();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isCollapsed, toggleCollapsed]);

  // Don't render until hydrated
  if (isCollapsed === null) {
    return <>{children}</>;
  }

  return (
    <NavContext.Provider value={{ isCollapsed, toggleCollapsed }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = (): NavContextType => {
  const context = useContext(NavContext);
  
  if (!canUseDOM) {
    return {
      isCollapsed: false,
      toggleCollapsed: () => {},
    };
  }

  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }

  return context;
};
