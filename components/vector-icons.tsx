"use client";

import * as React from "react";

interface VectorIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  isActive?: boolean;
}

/**
 * 1. Vector Layers Icon (All Components)
 * Exploded isometric vector stack where top, middle, and bottom planes
 * separate dynamically with spring dampening on hover.
 */
export function VectorLayersIcon({ className = "h-4 w-4", isActive = false, ...props }: VectorIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible transition-colors`}
      {...props}
    >
      {/* Top Floating Diamond Layer */}
      <path
        d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] fill-[var(--accent-green-subtle)] -translate-y-1"
            : "group-hover:-translate-y-1.5 group-hover:stroke-[var(--accent-green)]"
        }`}
      />

      {/* Middle Chevron Layer */}
      <path
        d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] opacity-90"
            : "group-hover:opacity-100 group-hover:stroke-[var(--text-primary)]"
        }`}
      />

      {/* Bottom Chevron Layer */}
      <path
        d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] opacity-70 translate-y-0.5"
            : "group-hover:translate-y-1.5 group-hover:opacity-90"
        }`}
      />
    </svg>
  );
}

/**
 * 1b. Vector Cube Icon (Icons section)
 * Isometric 3D package/cube with facet lighting matching Image 1.
 */
export function VectorCubeIcon({ className = "h-4 w-4", isActive = false, ...props }: VectorIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible transition-colors`}
      {...props}
    >
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        className={isActive ? "stroke-[var(--accent-green)] fill-[var(--accent-green)]/10" : "group-hover:stroke-[var(--accent-green)]"}
      />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

/**
 * 2. Vector Folder & Blueprint Icon (Overview)
 * Interactive project deck folder: on hover, the front pocket flexes open
 * and an interior blueprint document sheet smoothly rises upward with spring physics.
 */
export function VectorFolderIcon({ className = "h-4 w-4", isActive = false, ...props }: VectorIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible transition-colors`}
      {...props}
    >
      {/* Back Folder Shell & Tab */}
      <path
        d="M4 6h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        className={`transition-all duration-300 ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--text-primary)]"
        }`}
      />

      {/* Emerging Blueprint Document Sheet */}
      <g
        className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive ? "-translate-y-2.5" : "group-hover:-translate-y-2.5"
        }`}
      >
        <rect
          x="6.5"
          y="7"
          width="11"
          height="10"
          rx="1"
          className={`transition-colors duration-300 ${
            isActive
              ? "stroke-[var(--accent-green)] fill-[var(--surface-secondary)]"
              : "stroke-[var(--text-secondary)] fill-[var(--bg-main)] group-hover:stroke-[var(--accent-green)]"
          }`}
          strokeWidth="1.5"
        />
        {/* Code / Text Lines on the Document */}
        <line
          x1="8.5"
          y1="10"
          x2="15.5"
          y2="10"
          strokeWidth="1.25"
          className={`transition-colors duration-300 ${
            isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)] stroke-[var(--text-muted)]"
          }`}
        />
        <line
          x1="8.5"
          y1="13"
          x2="13.5"
          y2="13"
          strokeWidth="1.25"
          className={`transition-colors duration-300 ${
            isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)] stroke-[var(--text-muted)]"
          }`}
        />
      </g>

      {/* Front Folder Pocket */}
      <path
        d="M2 11h20l-2 8.5a1.5 1.5 0 0 1-1.5 1.5H5.5a1.5 1.5 0 0 1-1.5-1.5L2 11Z"
        className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom ${
          isActive
            ? "stroke-[var(--accent-green)] fill-[var(--bg-sidebar)]"
            : "group-hover:scale-y-90 group-hover:stroke-[var(--text-primary)] fill-[var(--bg-sidebar)]"
        }`}
      />
    </svg>
  );
}

// Alias for backwards compatibility
export const VectorFolderTreeIcon = VectorFolderIcon;

/**
 * 3. Vector API & Endpoints Icon (Registry API)
 * Crisp, developer-grade code/endpoint brackets:
 * On hover, the `<` and `>` chevrons step apart dynamically while the central
 * slash tilts with spring physics and glows in accent green.
 */
export function VectorApiIcon({ className = "h-4 w-4", isActive = false, ...props }: VectorIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible transition-colors`}
      {...props}
    >
      {/* Left Chevron `<` */}
      <polyline
        points="7 8 3 12 7 16"
        className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] -translate-x-1"
            : "group-hover:-translate-x-1 group-hover:stroke-[var(--text-primary)]"
        }`}
      />

      {/* Right Chevron `>` */}
      <polyline
        points="17 8 21 12 17 16"
        className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] translate-x-1"
            : "group-hover:translate-x-1 group-hover:stroke-[var(--text-primary)]"
        }`}
      />

      {/* Center Slash `/` */}
      <line
        x1="14"
        y1="5"
        x2="10"
        y2="19"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
          isActive
            ? "stroke-[var(--accent-green)] -rotate-6"
            : "group-hover:stroke-[var(--accent-green)] group-hover:-rotate-12"
        }`}
      />
    </svg>
  );
}


// Alias for backwards compatibility
export const VectorBookOpenIcon = VectorApiIcon;

/**
 * Vector Motion Icon (Motion Engine / Physics)
 * Represents kinetic physics, spring oscillation, and smooth momentum.
 */
export function VectorMotionIcon({ className = "h-4 w-4", isActive = false, ...props }: VectorIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible transition-colors`}
      {...props}
    >
      {/* Kinetic harmonic spring wave */}
      <path
        d="M2 13c2-5 4-5 6 0s4 5 6 0 3.5-4 5.5-1"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)]"
            : "group-hover:stroke-[var(--accent-green)]"
        }`}
      />
      {/* Trajectory speed streak */}
      <path
        d="M5 8c2-2 5-2 7 0"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] opacity-80"
            : "opacity-40 group-hover:opacity-90 group-hover:stroke-[var(--accent-green)]"
        }`}
      />
      {/* Moving kinetic node / particle */}
      <circle
        cx="19.5"
        cy="12"
        r="1.5"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "fill-[var(--accent-green)] stroke-[var(--accent-green)]"
            : "fill-current group-hover:fill-[var(--accent-green)]"
        }`}
      />
      {/* Bottom dampening trail */}
      <path
        d="M8 17c2 1.5 4 1.5 6 0"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "stroke-[var(--accent-green)] opacity-60"
            : "opacity-30 group-hover:opacity-75 group-hover:stroke-[var(--accent-green)]"
        }`}
      />
    </svg>
  );
}


/**
 * 4. Vector PanelLeft Icon (Collapse / Expand Sidebar)
 * Window frame with an interactive interior divider bar that physically
 * slides across the canvas to visually convey collapsing or expanding.
 */
export function VectorPanelLeftIcon({
  className = "h-4 w-4",
  isCollapsed = false,
  ...props
}: VectorIconProps & { isCollapsed?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible transition-colors`}
      {...props}
    >
      {/* Outer Display Frame */}
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="2"
        className="transition-colors duration-200 group-hover:stroke-[var(--text-primary)]"
      />

      {/* Sliding Divider Bar */}
      <line
        x1="9"
        y1="3"
        x2="9"
        y2="21"
        className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCollapsed
            ? "group-hover:translate-x-1.5 stroke-[var(--accent-green)]"
            : "group-hover:-translate-x-1.5 group-hover:stroke-[var(--accent-red)]"
        }`}
      />

      {/* Mini Rail Dots */}
      <circle cx="6" cy="8" r="0.75" fill="currentColor" className="opacity-40" />
      <circle cx="6" cy="12" r="0.75" fill="currentColor" className="opacity-40" />
      <circle cx="6" cy="16" r="0.75" fill="currentColor" className="opacity-40" />

      {/* Right Canvas Placeholder Lineart */}
      <line
        x1="12.5"
        y1="8"
        x2="17.5"
        y2="8"
        strokeWidth="1.5"
        className="transition-all duration-300 opacity-40 group-hover:translate-x-0.5 group-hover:opacity-75"
      />
      <line
        x1="12.5"
        y1="12"
        x2="15.5"
        y2="12"
        strokeWidth="1.5"
        className="transition-all duration-300 opacity-40 group-hover:translate-x-0.5 group-hover:opacity-75"
      />
    </svg>
  );
}

/**
 * 5. Vector Animated Kilo Logo
 * Exact official vector geometry of Kilo UI with physical kinetic spring
 * recoil on the green slash '/' element.
 */
export function VectorKiloLogo({
  className = "h-7 w-7",
  theme = "dark",
}: {
  className?: string;
  theme?: "dark" | "light" | "system";
}) {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={`${className} overflow-visible group/logo select-none`}
    >
      {/* The K glyph - uses var(--text-primary) for dark/light mode, no hover color change */}
      <path
        d="m144.4 264.7l-5.6 12.1v106.2h-79.6v-251.1h79.6v110.6l56.8-110.6h92.9l-72 120.4 72 130.7h-92.9z"
        fill="var(--text-primary)"
        className="transition-colors duration-200"
      />

      {/* The slash '/' - Always green, animated on hover with kinetic spring recoil, no color change */}
      <path
        d="m385.2 127.1h85.2l-73.8 261.1h-79.6z"
        fill="var(--accent-green)"
        className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/logo:-translate-y-4 group-hover/logo:translate-x-2 group-hover/brand:-translate-y-4 group-hover/brand:translate-x-2 group-hover:-translate-y-4 group-hover:translate-x-2"
      />
    </svg>
  );
}

/**
 * 6. Vector Category Bullet Icons
 * Dedicated, animated lineart vector icons for each component category.
 */
export function VectorCategoryIcon({
  category,
  isActive = false,
  className = "h-3.5 w-3.5",
}: {
  category: string;
  isActive?: boolean;
  className?: string;
}) {
  const norm = category.toLowerCase();

  // 0. All Categories / Category Overview -> 4-Square Category Modules
  if (norm.includes("categor") || norm === "all") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        <rect
          x="3"
          y="3"
          width="7.5"
          height="7.5"
          rx="2"
          className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <rect
          x="13.5"
          y="3"
          width="7.5"
          height="7.5"
          rx="2"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <rect
          x="3"
          y="13.5"
          width="7.5"
          height="7.5"
          rx="2"
          className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
        />
        <rect
          x="13.5"
          y="13.5"
          width="7.5"
          height="7.5"
          rx="2"
          className={`transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${
            isActive ? "stroke-[var(--accent-green)] fill-[var(--accent-green-subtle)]" : ""
          }`}
        />
      </svg>
    );
  }

  // 1. Actions (Button, triggers) -> Kinetic Spark / Lightning
  if (norm.includes("action")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        <path
          d="M13 2 4 14h7l-1 8 10-12h-8l1-8Z"
          className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-0.5 origin-center"
        />
      </svg>
    );
  }

  // 2. Forms & Inputs -> Input Field with Typing Cursor & Text Caret
  if (norm.includes("form") || norm.includes("input")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        <rect
          x="2.5"
          y="5.5"
          width="19"
          height="13"
          rx="3.5"
          className="transition-colors duration-200"
        />
        <line
          x1="6.5"
          y1="9.5"
          x2="6.5"
          y2="14.5"
          className="stroke-[var(--accent-green)] animate-pulse"
        />
        <line
          x1="10"
          y1="12"
          x2="17"
          y2="12"
          strokeDasharray="2 2"
          className="opacity-60 transition-transform duration-300 group-hover:translate-x-1"
        />
      </svg>
    );
  }

  // 3. Overlays -> Dual Floating Modal Panels with Depth
  if (norm.includes("overlay") || norm.includes("modal") || norm.includes("dialog")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        {/* Rear Panel */}
        <rect
          x="7"
          y="3"
          width="14"
          height="13"
          rx="2.5"
          className="opacity-40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
        {/* Front Elevated Panel */}
        <rect
          x="3"
          y="8"
          width="14"
          height="13"
          rx="2.5"
          className="transition-transform duration-300 group-hover:translate-y-0.5 group-hover:-translate-x-0.5 fill-[var(--bg-main)]/80"
        />
        <line x1="6.5" y1="12.5" x2="11.5" y2="12.5" />
        <circle cx="14" cy="11.5" r="0.75" fill="currentColor" />
      </svg>
    );
  }

  // 4. Data Display -> Metric Bar Graph with Dynamic Heights
  if (norm.includes("data") || norm.includes("display")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        <path d="M3 20.5h18" />
        <rect
          x="5"
          y="11"
          width="3.5"
          height="7.5"
          rx="1"
          className="transition-all duration-300 group-hover:-translate-y-1"
        />
        <rect
          x="10.25"
          y="5.5"
          width="3.5"
          height="13"
          rx="1"
          className={`transition-all duration-300 ${
            isActive ? "stroke-[var(--accent-green)] fill-[var(--accent-green-subtle)]" : "group-hover:stroke-[var(--accent-green)]"
          }`}
        />
        <rect
          x="15.5"
          y="8.5"
          width="3.5"
          height="10"
          rx="1"
          className="transition-all duration-300 group-hover:-translate-y-0.5"
        />
      </svg>
    );
  }

  // 5. Navigation -> Compass Rose & Route Waypoint
  if (norm.includes("nav")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        <circle cx="12" cy="12" r="9" />
        <polygon
          points="12,7 15,12 12,17 9,12"
          className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center ${
            isActive ? "rotate-45 fill-[var(--accent-green-subtle)] stroke-[var(--accent-green)]" : "group-hover:rotate-90"
          }`}
        />
      </svg>
    );
  }

  // 6. Media & Layout -> Asymmetric 4-Squircle Moments Bento Grid
  if (norm.includes("media") || norm.includes("layout") || norm.includes("bento")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        {/* Top-Left Tall Capsule */}
        <rect
          x="3"
          y="3"
          width="7"
          height="9"
          rx="2.5"
          className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        />
        {/* Top-Right Large Squircle */}
        <rect
          x="12"
          y="3"
          width="9"
          height="10"
          rx="3"
          className={`transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isActive ? "stroke-[var(--accent-green)] fill-[var(--accent-green-subtle)]" : ""
          }`}
        />
        {/* Bottom-Left Horizontal Card */}
        <rect
          x="3"
          y="14"
          width="9"
          height="7"
          rx="2.5"
          className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
        />
        {/* Bottom-Right Small Card */}
        <rect
          x="14"
          y="15"
          width="7"
          height="6"
          rx="2"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />
      </svg>
    );
  }

  // 7. Backgrounds & Shaders -> Prismatic diagonal slat icon
  if (norm.includes("background") || norm.includes("shader") || norm.includes("slat") || norm.includes("slate") || norm.includes("prismatic")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        {/* Diagonal slats at ~35deg */}
        <path d="M3 3 L10 21" strokeDasharray="0" />
        <path d="M8 3 L15 21" className={isActive ? "stroke-[var(--accent-green)]" : ""} />
        <path d="M13 3 L20 21" />
        <path d="M18 3 L24 16" />
        {/* Colour shimmer bars */}
        <path d="M3 9 L21 9" strokeOpacity="0.3" strokeWidth="1" />
        <path d="M3 15 L21 15" strokeOpacity="0.3" strokeWidth="1" />
      </svg>
    );
  }

  // 8. Cursors -> Fluid Liquid Pointer
  if (norm.includes("cursor") || norm.includes("pointer") || norm.includes("firefly")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} transition-colors ${
          isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
        }`}
      >
        <path d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4z" />
        <path d="M14 14l6 6" />
        <circle cx="19" cy="19" r="1.5" className={isActive ? "fill-[var(--accent-green)]" : ""} />
      </svg>
    );
  }

  // Fallback / Foundation
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} transition-colors ${
        isActive ? "stroke-[var(--accent-green)]" : "group-hover:stroke-[var(--accent-green)]"
      }`}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

/**
 * 7. Vector Component Logos (For each component in the sidebar)
 */
export function VectorComponentIcon({
  name,
  isActive = false,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  isActive?: boolean;
  className?: string;
}) {
  const norm = name.toLowerCase();

  // Firefly Cursor
  if (norm.includes("cursor") || norm.includes("firefly")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <path d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4z" />
        <path d="M14 14l6 6" />
        <circle cx="19" cy="19" r="1.5" className={isActive ? "fill-[var(--accent-green)]" : ""} />
      </svg>
    );
  }

  // Button
  if (norm.includes("button")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <circle cx="8" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }

  // Minimalist Login
  if (norm.includes("login") || norm.includes("portal") || norm.includes("minimalist-login")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <circle cx="9" cy="12" r="6" />
        <ellipse cx="9" cy="12" rx="6" ry="2.5" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <path d="M16 8h5v8h-5" />
        <line x1="13" y1="12" x2="19" y2="12" className="stroke-[var(--accent-green)]" />
      </svg>
    );
  }

  // Input
  if (norm.includes("input")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <line x1="7" y1="9" x2="7" y2="15" className="stroke-[var(--accent-green)]" />
        <line x1="10" y1="12" x2="15" y2="12" strokeDasharray="1.5 1.5" />
      </svg>
    );
  }

  // Checkbox
  if (norm.includes("checkbox") || norm.includes("check")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path
          d="m8 12 3 3 6-6"
          className={isActive ? "stroke-[var(--accent-green)]" : "stroke-current"}
          strokeWidth="2"
        />
      </svg>
    );
  }

  // Switch
  if (norm.includes("switch")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="2" y="6" width="20" height="12" rx="6" />
        <circle
          cx="16"
          cy="12"
          r="3.5"
          className={isActive ? "fill-[var(--accent-green)] stroke-[var(--accent-green)]" : "fill-current"}
        />
      </svg>
    );
  }

  // Dialog
  if (norm.includes("dialog")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <circle cx="6" cy="6.5" r="0.75" fill="currentColor" />
        <circle cx="8.5" cy="6.5" r="0.75" fill="currentColor" />
        <line x1="17" y1="6" x2="19" y2="7" />
      </svg>
    );
  }

  // Badge
  if (norm.includes("badge")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <path d="M12 2l7 4v6c0 5.5-3.8 10.7-7 12-3.2-1.3-7-6.5-7-12V6l7-4z" />
        <circle cx="12" cy="11" r="2" fill="currentColor" />
      </svg>
    );
  }

  // Expanding Image Card
  if (norm.includes("expanding") || norm === "expanding-card") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="3" width="8" height="8" rx="2" className="stroke-[var(--accent-green)]" />
        <rect x="13" y="3" width="8" height="8" rx="2" strokeDasharray="2 2" opacity="0.6" />
        <rect x="3" y="13" width="8" height="8" rx="2" strokeDasharray="2 2" opacity="0.6" />
        <polyline points="15 19 19 19 19 15" className="stroke-[var(--accent-green)]" />
        <line x1="19" y1="19" x2="14" y2="14" className="stroke-[var(--accent-green)]" />
      </svg>
    );
  }

  // Concave 3D Carousel
  if (norm.includes("concave")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        {/* Left card tilting inward */}
        <path d="M4 6 L8 7.5 L8 16.5 L4 18 Z" className={isActive ? "stroke-[var(--accent-green)]" : "opacity-60"} />
        {/* Center card */}
        <rect x="9" y="5" width="6" height="14" rx="1.5" className={isActive ? "stroke-[var(--accent-green)] fill-[var(--accent-green)]/15" : ""} />
        {/* Right card tilting inward */}
        <path d="M20 6 L16 7.5 L16 16.5 L20 18 Z" className={isActive ? "stroke-[var(--accent-green)]" : "opacity-60"} />
      </svg>
    );
  }

  // Blurred Edge Carousel
  if (norm.includes("carousel")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="6" y="4" width="12" height="16" rx="2.5" />
        <path d="M2 7v10" strokeDasharray="1.5 1.5" opacity="0.5" />
        <path d="M22 7v10" strokeDasharray="1.5 1.5" opacity="0.5" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
        <polyline points="9 10 12 7 15 10" />
      </svg>
    );
  }

  // TOC Content Slider
  if (norm.includes("slider") || norm.includes("content-slider") || norm.includes("toc")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <line x1="4" y1="4" x2="4" y2="20" strokeWidth="1.5" />
        <line x1="4" y1="9" x2="4" y2="15" strokeWidth="3" className="stroke-[var(--accent-green)]" />
        <line x1="9" y1="6" x2="20" y2="6" />
        <line x1="9" y1="12" x2="18" y2="12" className="stroke-[var(--text-primary)]" />
        <line x1="12" y1="18" x2="19" y2="18" opacity="0.6" />
      </svg>
    );
  }

  // Card
  if (norm.includes("card")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="7" y1="15" x2="13" y2="15" />
      </svg>
    );
  }

  // Tabs
  if (norm.includes("tab")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="9.5" y1="5" x2="9.5" y2="10" />
        <line x1="16" y1="5" x2="16" y2="10" />
      </svg>
    );
  }

  // Gooey Nav & Notched Navbar
  if (norm.includes("gooey") || norm.includes("nav") || norm.includes("notch")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <path d="M3 8V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-2c-1 0-1.5 2-2.5 2h-5C7.5 7 7 5 6 5H4a3 3 0 0 0-1 3z" />
        <line x1="9" y1="5" x2="15" y2="5" className={isActive ? "stroke-[var(--accent-green)]" : "stroke-current"} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="14" r="1.5" className={isActive ? "fill-[var(--accent-green)]" : "fill-current"} />
      </svg>
    );
  }

  // Accordion
  if (norm.includes("accordion")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="4" width="18" height="5" rx="1.5" />
        <rect x="3" y="11" width="18" height="5" rx="1.5" />
        <rect x="3" y="18" width="18" height="3" rx="1.5" />
        <path d="m17 6.5-1.5 1-1.5-1" />
      </svg>
    );
  }

  // Bento Cluster / Moments
  if (norm.includes("bento") || norm.includes("cluster") || norm.includes("moment")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="3" width="7" height="9" rx="2.5" />
        <rect x="12" y="3" width="9" height="10" rx="3" className="fill-[var(--accent-green-subtle)]" />
        <rect x="3" y="14" width="9" height="7" rx="2.5" />
        <rect x="14" y="15" width="7" height="6" rx="2" />
      </svg>
    );
  }

  // Stat Card / Metrics
  if (norm.includes("stat") || norm.includes("metric")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <polyline points="6 15 10 11 14 14 18 9" />
        <circle cx="18" cy="9" r="1" fill="currentColor" />
      </svg>
    );
  }

  // Footer
  if (norm.includes("footer")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="3" y1="14" x2="21" y2="14" />
        <path d="M7 18h10" className="stroke-[var(--accent-green)]" />
        <circle cx="7" cy="8" r="1" fill="currentColor" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
        <circle cx="17" cy="8" r="1" fill="currentColor" />
      </svg>
    );
  }

  // Scroll Marquee
  if (norm.includes("scroll-marquee") || (norm.includes("marquee") && !norm.includes("directional"))) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <polyline points="10 10 7 12 10 14" className="stroke-[var(--accent-green)]" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    );
  }

  // Directional Marquee
  if (norm.includes("directional") || norm.includes("directional-marquee")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="2" y="4" width="20" height="7" rx="2" />
        <polyline points="15 6 18 7.5 15 9" className="stroke-[var(--accent-green)]" />
        <line x1="6" y1="7.5" x2="18" y2="7.5" />
        <rect x="2" y="13" width="20" height="7" rx="2" />
        <polyline points="9 15 6 16.5 9 18" className="stroke-[var(--accent-green)]" />
        <line x1="6" y1="16.5" x2="18" y2="16.5" />
      </svg>
    );
  }

  // Kinetic Text
  if (norm.includes("kinetic") || norm.includes("text")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
        <path d="M18 10c1.5 1 2 2.5 1 4" className="stroke-[var(--accent-green)]" />
        <path d="M6 14c-1.5-1-2-2.5-1-4" className="stroke-[var(--accent-green)]" />
      </svg>
    );
  }

  // Prismatic Slats Background
  if (norm.includes("prismatic") || norm.includes("slat") || norm.includes("slate") || norm.includes("reactive-slat") || norm.includes("reactive-slate")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <line x1="3" y1="3" x2="9" y2="21" />
        <line x1="8" y1="3" x2="14" y2="21" className="stroke-[var(--accent-green)] opacity-80" />
        <line x1="13" y1="3" x2="19" y2="21" />
        <line x1="3" y1="10" x2="21" y2="10" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="3" y1="16" x2="21" y2="16" strokeOpacity="0.25" strokeWidth="1" />
      </svg>
    );
  }

  // Liquid Glass Search Bar
  if (norm.includes("liquid") || norm.includes("search")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[#3478F6]" : ""}`}
      >
        <circle cx="11" cy="11" r="7" className="stroke-current" />
        <path d="m21 21-4.35-4.35" className={isActive ? "stroke-[#3478F6]" : "stroke-current"} strokeWidth="2" />
        <path d="M8 8.5a3.5 3.5 0 0 1 3.5-3.5" className="stroke-[#3478F6] opacity-80" strokeWidth="1.5" />
      </svg>
    );
  }

  // Grainy Grid Shader (2x2 morphing grid)
  if (norm.includes("grainy-grid") || norm.includes("grid-shader")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[var(--accent-green)]" : ""}`}
      >
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" />
      </svg>
    );
  }

  // Grainy Horizon Shader (curved luminous horizon)
  if (norm.includes("horizon") || norm.includes("grainy-horizon") || norm.includes("grainy-glow")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[#7c3aed]" : ""}`}
      >
        <path d="M2 9c4 4 16 4 20 0" className={isActive ? "stroke-[#c084fc]" : "stroke-current"} />
        <path d="M4 14c3.5 3 12.5 3 16 0" className="stroke-[#7c3aed] opacity-80" />
        <circle cx="12" cy="18" r="1.5" fill="#c084fc" />
      </svg>
    );
  }

  // Ethereal Smoke Shader (wispy swirling smoke plumes)
  if (norm.includes("smoke") || norm.includes("ethereal-smoke")) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} ${isActive ? "stroke-[#38bdf8]" : ""}`}
      >
        <path d="M18 10c0-3.3-2.7-6-6-6-2.6 0-4.8 1.7-5.6 4C3.8 8.4 2 10.5 2 13c0 2.8 2.2 5 5 5h11c2.2 0 4-1.8 4-4 0-1.8-1.2-3.3-2.8-3.8-.1-.1-.1-.1-.2-.2z" />
        <path d="M8 15c1-1 2.5-1 3.5 0" strokeDasharray="1 1" opacity="0.6" />
        <circle cx="17" cy="13" r="1.5" fill="#38bdf8" />
      </svg>
    );
  }

  // Generic fallback
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/**
 * 8. Vector Micro-Tag Icon (Version and Status Tags)
 */
export function VectorTagIcon({
  className = "h-3 w-3",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8z" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 9. Vector GitHub Icon
 */
export function VectorGithubIcon({
  className = "h-4 w-4",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}


