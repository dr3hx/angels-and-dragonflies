'use client';

import React from "react";
import { useAuth } from '@payloadcms/ui';
import { Settings, LogOut } from 'lucide-react';
import { cn } from "src/utilities/cn";
import { useNav } from "src/providers/admin/NavProvider";

const AfterNavLinks: React.FC = () => {
    const { user, logOut, permissions } = useAuth();
    const { isCollapsed } = useNav();

    // Only render if user is authenticated
    if (!user) return null;

    if (isCollapsed) {
        return (
            <div className="border-t border-border p-2">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-semibold text-primary">
                            {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <a 
                            href="/admin/account"
                            className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-md",
                                "text-muted-foreground",
                                "transition-all duration-200",
                                "hover:bg-accent hover:text-accent-foreground",
                                "focus:outline-none focus:ring-2 focus:ring-primary/20"
                            )}
                        >
                            <Settings className="h-4 w-4" />
                        </a>
                        <button
                            onClick={() => logOut()}
                            className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-md",
                                "text-muted-foreground",
                                "transition-all duration-200",
                                "hover:bg-destructive/10 hover:text-destructive",
                                "focus:outline-none focus:ring-2 focus:ring-destructive/20"
                            )}
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border-t border-border p-4">
            {/* User Profile Section */}
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-base font-semibold text-primary">
                        {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                        {user?.name || user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {permissions?.canAccessAdmin ? 'Administrator' : 'User'}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1">
                <a 
                    href="/admin/account"
                    className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2",
                        "text-sm font-medium text-muted-foreground",
                        "transition-all duration-200",
                        "hover:bg-accent hover:text-accent-foreground hover:translate-x-1",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                >
                    <Settings className="h-4 w-4" />
                    Account Settings
                </a>
                <button
                    onClick={() => logOut()}
                    className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2",
                        "text-sm font-medium text-muted-foreground",
                        "transition-all duration-200",
                        "hover:bg-destructive/10 hover:text-destructive hover:translate-x-1",
                        "focus:outline-none focus:ring-2 focus:ring-destructive/20"
                    )}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AfterNavLinks;
