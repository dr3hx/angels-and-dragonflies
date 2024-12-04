'use client';

import React from "react";
import { useAuth } from "@payloadcms/ui";
import { Bell, Search, Globe, ChevronDown } from "lucide-react";
import { cn } from "src/utilities/cn";
import { useNav } from "src/providers/admin/NavProvider";
import "./index.scss";

const Header: React.FC = () => {
  const { user } = useAuth();
  const { toggleCollapsed } = useNav();

  return (
    <header className="admin-header">
      {/* Search */}
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      {/* Right side actions */}
      <div className="header-right">
        {/* Language Selector */}
        <button className="language-selector">
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="English"
            className="flag"
          />
          <span>En</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>

        {/* Notifications */}
        <button className="action-button" aria-label="View notifications">
          <Bell className="h-5 w-5" />
          <span className="badge" />
        </button>

        {/* Settings */}
        <button className="action-button" aria-label="Settings">
          <Globe className="h-5 w-5" />
        </button>

        <div className="divider" />

        {/* Profile */}
        <a href="/admin/account" className="profile">
          <div className="avatar">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <span className="name">
              {user?.email?.split('@')[0] || 'User'}
            </span>
            <span className="email">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
