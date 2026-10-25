export interface IconItem {
  id: string;
  name: string;
  category: "Navigation" | "Actions" | "Interface" | "Media" | "Status";
  tags: string[];
  render: (props: { strokeWidth?: number; isSolid?: boolean; className?: string }) => React.ReactNode;
}

export const ICONS_LIST: IconItem[] = [
  // ── Navigation (12) ──
  {
    id: "arrow-left",
    name: "Arrow Left",
    category: "Navigation",
    tags: ["arrow", "left", "back", "previous"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    ),
  },
  {
    id: "arrow-right",
    name: "Arrow Right",
    category: "Navigation",
    tags: ["arrow", "right", "forward", "next"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  },
  {
    id: "arrow-up",
    name: "Arrow Up",
    category: "Navigation",
    tags: ["arrow", "up", "top"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    ),
  },
  {
    id: "arrow-down",
    name: "Arrow Down",
    category: "Navigation",
    tags: ["arrow", "down", "bottom"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    ),
  },
  {
    id: "chevron-left",
    name: "Chevron Left",
    category: "Navigation",
    tags: ["chevron", "left", "back"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
  },
  {
    id: "chevron-right",
    name: "Chevron Right",
    category: "Navigation",
    tags: ["chevron", "right", "next"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  },
  {
    id: "chevron-up",
    name: "Chevron Up",
    category: "Navigation",
    tags: ["chevron", "up"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="18 15 12 9 6 15" />
      </svg>
    ),
  },
  {
    id: "chevron-down",
    name: "Chevron Down",
    category: "Navigation",
    tags: ["chevron", "down"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
  },
  {
    id: "menu",
    name: "Menu",
    category: "Navigation",
    tags: ["menu", "hamburger", "nav"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="4" y1="16" x2="20" y2="16" />
      </svg>
    ),
  },
  {
    id: "external-link",
    name: "External Link",
    category: "Navigation",
    tags: ["external", "link", "share", "open"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
  {
    id: "compass",
    name: "Compass",
    category: "Navigation",
    tags: ["compass", "direction", "explore"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={isSolid ? "currentColor" : "none"} />
      </svg>
    ),
  },
  {
    id: "more",
    name: "More",
    category: "Navigation",
    tags: ["more", "dots", "menu", "horizontal"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },

  // ── Actions (10) ──
  {
    id: "search",
    name: "Search",
    category: "Actions",
    tags: ["search", "find", "magnifier"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "settings",
    name: "Settings",
    category: "Actions",
    tags: ["settings", "gear", "cog", "preferences"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "copy",
    name: "Copy",
    category: "Actions",
    tags: ["copy", "clipboard", "duplicate"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
  },
  {
    id: "refresh",
    name: "Refresh",
    category: "Actions",
    tags: ["refresh", "reload", "sync"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    id: "trash",
    name: "Trash",
    category: "Actions",
    tags: ["trash", "delete", "remove"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    ),
  },
  {
    id: "edit",
    name: "Edit",
    category: "Actions",
    tags: ["edit", "pencil", "modify", "write"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    id: "download",
    name: "Download",
    category: "Actions",
    tags: ["download", "save", "arrow"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    id: "upload",
    name: "Upload",
    category: "Actions",
    tags: ["upload", "cloud", "arrow"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    id: "plus",
    name: "Plus",
    category: "Actions",
    tags: ["plus", "add", "new", "create"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X",
    category: "Actions",
    tags: ["x", "close", "cancel", "cross"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },

  // ── Interface (14) ──
  {
    id: "heart",
    name: "Heart",
    category: "Interface",
    tags: ["heart", "like", "favorite"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "star",
    name: "Star",
    category: "Interface",
    tags: ["star", "favorite", "bookmark", "rate"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "bell",
    name: "Bell",
    category: "Interface",
    tags: ["bell", "notification", "alert"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: "home",
    name: "Home",
    category: "Interface",
    tags: ["home", "house", "main"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" fill={isSolid ? "var(--surface-elevated)" : "none"} />
      </svg>
    ),
  },
  {
    id: "grid",
    name: "Grid",
    category: "Interface",
    tags: ["grid", "layout", "apps", "dashboard"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "check",
    name: "Check",
    category: "Interface",
    tags: ["check", "done", "success", "tick"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    id: "info",
    name: "Info",
    category: "Interface",
    tags: ["info", "help", "circle"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <line x1="12" y1="16" x2="12" y2="12" strokeWidth={strokeWidth + 0.5} />
        <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth={strokeWidth + 0.5} />
      </svg>
    ),
  },
  {
    id: "alert",
    name: "Alert",
    category: "Interface",
    tags: ["alert", "warning", "triangle"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: "minus",
    name: "Minus",
    category: "Interface",
    tags: ["minus", "subtract", "remove"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    id: "lock",
    name: "Lock",
    category: "Interface",
    tags: ["lock", "security", "private"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: "eye",
    name: "Eye",
    category: "Interface",
    tags: ["eye", "visible", "show"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <circle cx="12" cy="12" r="3" fill={isSolid ? "currentColor" : "none"} />
      </svg>
    ),
  },
  {
    id: "filter",
    name: "Filter",
    category: "Interface",
    tags: ["filter", "funnel", "sort"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
      </svg>
    ),
  },
  {
    id: "user",
    name: "User",
    category: "Interface",
    tags: ["user", "profile", "account", "person"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
      </svg>
    ),
  },
  {
    id: "mail",
    name: "Mail",
    category: "Interface",
    tags: ["mail", "email", "message", "inbox"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },

  // ── Media (6) ──
  {
    id: "play",
    name: "Play",
    category: "Media",
    tags: ["play", "video", "start"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id: "pause",
    name: "Pause",
    category: "Media",
    tags: ["pause", "video", "stop"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
      </svg>
    ),
  },
  {
    id: "stop",
    name: "Stop",
    category: "Media",
    tags: ["stop", "video", "square"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
    ),
  },
  {
    id: "volume",
    name: "Volume",
    category: "Media",
    tags: ["volume", "audio", "sound", "speaker"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
  },
  {
    id: "mute",
    name: "Mute",
    category: "Media",
    tags: ["mute", "silence", "audio", "off"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    ),
  },
  {
    id: "fullscreen",
    name: "Fullscreen",
    category: "Media",
    tags: ["fullscreen", "expand", "screen"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    ),
  },

  // ── Status (6) ──
  {
    id: "check-circle",
    name: "Check Circle",
    category: "Status",
    tags: ["check", "success", "circle", "verified"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <polyline points="16 9 10 15 7 12" />
      </svg>
    ),
  },
  {
    id: "alert-circle",
    name: "Alert Circle",
    category: "Status",
    tags: ["alert", "error", "circle", "issue"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    id: "clock",
    name: "Clock",
    category: "Status",
    tags: ["clock", "time", "history", "recent"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "shield",
    name: "Shield",
    category: "Status",
    tags: ["shield", "security", "protect", "safe"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={isSolid ? "currentColor" : "none"} fillOpacity={isSolid ? 0.15 : 0} />
      </svg>
    ),
  },
  {
    id: "sparkles",
    name: "Sparkles",
    category: "Status",
    tags: ["sparkles", "ai", "magic", "clean"],
    render: ({ strokeWidth = 1.5, isSolid, className }) => (
      <svg viewBox="0 0 24 24" fill={isSolid ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
      </svg>
    ),
  },
  {
    id: "loader",
    name: "Loader",
    category: "Status",
    tags: ["loader", "spinner", "loading", "progress"],
    render: ({ strokeWidth = 1.5, className }) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={`${className} animate-spin [animation-duration:3s]`}>
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    ),
  },
];
