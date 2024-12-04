'use client';

import React, { useMemo, useState, useEffect } from "react";
import { useConfig, useTranslation, useAuth } from "@payloadcms/ui";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "src/utilities/cn";
import { useNav } from "src/providers/admin/NavProvider";
import Icon from "../Graphics/Icon";
import AfterNavLinks from "../AfterNavLinks";
import { 
    ChevronLeft, 
    ChevronRight,
    ChevronDown,
    X,
    LayoutDashboard,
    Users,
    Files,
    FolderOpen,
    Globe,
    BarChart3,
    Settings,
    type LucideIcon
} from "lucide-react";
import "./index.scss";

// Types
type AdminGroup = 'Menu' | 'Content Management' | 'Programs & Events' | 'Assets' | 'Configuration';

interface NavItemProps {
    href: string;
    label: string;
    collapsed?: boolean;
}

interface NavSectionProps {
    title: AdminGroup | string;
    icon: LucideIcon;
    items: NavItemProps[];
    collapsed?: boolean;
}

// Group icon mapping
const groupIconMap: Record<string, LucideIcon> = {
    'Menu': LayoutDashboard,
    'Content Management': Files,
    'Programs & Events': Globe,
    'Assets': FolderOpen,
    'Configuration': Settings,
};

const staticNavItems: NavItemProps[] = [
    {
        href: '/admin',
        label: 'Dashboard'
    }
];

const resolveLabel = (label: any): string => {
    if (!label) return '';
    if (typeof label === 'function') return label({});
    if (typeof label === 'string') return label;
    return label.en || Object.values(label)[0] || '';
};

const NavItem: React.FC<NavItemProps> = ({ href, label, collapsed }): React.ReactElement => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted/50",
                isActive && "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
            )}
        >
            <span className="text-sm font-medium truncate">
                {label}
            </span>
        </Link>
    );
};

const NavSection: React.FC<NavSectionProps> = ({ title, icon: SectionIcon, items, collapsed }): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    const hasActiveItem = items.some(item => pathname === item.href);
    const { isCollapsed, toggleCollapsed } = useNav();

    // Auto collapse sections when nav is collapsed
    useEffect(() => {
        if (isCollapsed) {
            setIsOpen(false);
        }
    }, [isCollapsed]);

    const handleSectionClick = () => {
        if (isCollapsed) {
            // If nav is collapsed, expand it and open this section
            toggleCollapsed();
            setIsOpen(true);
        } else {
            // If nav is expanded, just toggle the section
            setIsOpen(!isOpen);
        }
    };

    if (!items?.length) return <></>;

    return (
        <div className="mb-6">
            <button
                onClick={handleSectionClick}
                className={cn(
                    "w-full flex items-center gap-3 px-4 py-2",
                    "text-sm font-semibold",
                    "text-muted-foreground hover:text-foreground",
                    "rounded-lg transition-all duration-200",
                    "hover:bg-muted/50",
                    hasActiveItem && "text-foreground",
                    collapsed && "justify-center"
                )}
                title={collapsed ? title : undefined}
            >
                <SectionIcon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                    <>
                        <span className="flex-1 text-left">{title}</span>
                        <ChevronDown 
                            className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-200",
                                !isOpen && "-rotate-90"
                            )}
                        />
                    </>
                )}
            </button>
            {!collapsed && (
                <div 
                    className={cn(
                        "pl-11 mt-1 space-y-1 overflow-hidden transition-all duration-200",
                        !isOpen && "h-0 opacity-0"
                    )}
                >
                    {items.map((item, i) => (
                        <NavItem key={i} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CollapsibleNav = (): React.ReactElement => {
    const { user } = useAuth();
    const { i18n } = useTranslation();
    const { config } = useConfig();
    const { isCollapsed, toggleCollapsed } = useNav();

    const groupedNavItems = useMemo(() => {
        const allGroups = new Map<AdminGroup | string, NavItemProps[]>();

        // Add static items
        allGroups.set('Menu', staticNavItems);

        // Add collections
        if (config?.collections) {
            config.collections.forEach(collection => {
                const groupName = (collection.admin?.group || 'Content Management') as AdminGroup;
                if (!allGroups.has(groupName)) {
                    allGroups.set(groupName, []);
                }

                const items = allGroups.get(groupName);
                if (items) {
                    items.push({
                        href: `/admin/collections/${collection.slug}`,
                        label: resolveLabel(collection.labels?.plural) || collection.slug
                    });
                }
            });
        }

        // Add globals
        if (config?.globals) {
            config.globals.forEach(global => {
                const groupName = (global.admin?.group || 'Configuration') as AdminGroup;
                if (!allGroups.has(groupName)) {
                    allGroups.set(groupName, []);
                }

                const items = allGroups.get(groupName);
                if (items) {
                    items.push({
                        href: `/admin/globals/${global.slug}`,
                        label: resolveLabel(global.label) || global.slug
                    });
                }
            });
        }

        return Array.from(allGroups.entries())
            .filter(([_, items]) => items.length > 0)
            .map(([title, items]) => ({
                title,
                icon: groupIconMap[title] || FolderOpen,
                items
            }));
    }, [config]);

    return (
        <>
            {/* Desktop Nav Toggle */}
            <button
                className={cn(
                    "nav__toggle",
                    "hidden lg:flex items-center justify-center",
                    "w-8 h-8",
                    "bg-background border border-border rounded-lg",
                    "hover:bg-muted/80 hover:scale-105",
                    "transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
                onClick={toggleCollapsed}
                data-nav-collapsed={isCollapsed}
                aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            >
                {!isCollapsed ? (
                    <ChevronLeft className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </button>

            <nav 
                className={cn(
                    "template-default__nav",
                    "flex flex-col h-full",
                    "bg-background border-r border-border"
                )}
                data-nav-collapsed={isCollapsed}
            >
                {/* Header */}
                <header className="h-16 px-6 flex items-center justify-between border-b border-border">
                    <div className="flex items-center gap-2">
                        <Icon />
                        {!isCollapsed && (
                            <span className="font-semibold text-foreground">
                                Dashboard
                            </span>
                        )}
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        className={cn(
                            "lg:hidden p-2 rounded-lg",
                            "hover:bg-muted/80 focus:bg-muted",
                            "transition-colors duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-primary/20"
                        )}
                        onClick={toggleCollapsed}
                        aria-label="Close mobile menu"
                    >
                        <X className="h-5 w-5 text-foreground" />
                    </button>
                </header>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {groupedNavItems.map((section) => (
                        <NavSection 
                            key={section.title}
                            title={section.title} 
                            icon={section.icon}
                            items={section.items}
                            collapsed={isCollapsed}
                        />
                    ))}
                </div>

                {/* Storage Info */}
                {!isCollapsed && (
                    <div className="m-4 p-4 bg-muted/50 border border-border rounded-lg">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-foreground">
                                    Storage capacity
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Used 40% of your storage
                                </p>
                            </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                            <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: '40%' }}
                            />
                        </div>
                        <button className={cn(
                            "w-full px-4 py-2",
                            "bg-primary text-primary-foreground",
                            "rounded-lg text-sm font-medium",
                            "hover:bg-primary/90 hover:-translate-y-0.5",
                            "transition-all duration-300"
                        )}>
                            Upgrade Now →
                        </button>
                    </div>
                )}

                {/* After Nav Links */}
                <AfterNavLinks />
            </nav>
        </>
    );
};

export default CollapsibleNav;
