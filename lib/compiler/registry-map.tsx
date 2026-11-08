"use client";

/**
 * Authoritative Primitive Component Registry Map
 *
 * Maps AST primitive names to React component implementations with interactive
 * adapters, slot unwrappers, and icon resolution.
 */

import * as React from "react";
import { useState } from "react";
import {
  Archive,
  Trash2,
  Bookmark,
  Check,
  Plus,
  Search,
  Bell,
  Settings,
  User,
  Heart,
  Share2,
  Send,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  Compass,
  Home,
  Layers,
  Grid,
  Filter,
  Download,
  Edit,
  Copy,
  Sparkles,
  Smartphone,
  Zap,
  X,
  Menu,
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Existing Primitives
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/ui/card";
import { Badge } from "@/registry/ui/badge";
import { Input } from "@/registry/ui/input";
import { Switch } from "@/registry/ui/switch";
import { Checkbox } from "@/registry/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/registry/ui/dialog";
import { DrawerDialog } from "@/registry/ui/drawer-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion";
import { StatCard } from "@/registry/ui/stat-card";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonBadge,
  SkeletonCard,
} from "@/registry/ui/skeleton";
import { CommandPalette } from "@/registry/ui/command-palette";
import { PopoverDialog } from "@/registry/ui/popover-dialog";
import { SpotlightModal } from "@/registry/ui/spotlight-modal";
import { ToastStack } from "@/registry/ui/toast-stack";
import { TickerNotification } from "@/registry/ui/ticker-notification";
import { DynamicIslandBanner } from "@/registry/ui/dynamic-island-banner";
import { StackCards } from "@/registry/ui/stack-cards";

// Mobile Primitives
import { MobileBottomSheet } from "@/registry/ui/mobile-bottom-sheet";
import { SwipeActionCard } from "@/registry/ui/swipe-action-card";
import { ThumbSegmentController } from "@/registry/ui/thumb-segment-controller";
import { PullToRefresh } from "@/registry/ui/pull-to-refresh";
import { FloatingActionDock } from "@/registry/ui/floating-action-dock";

/**
 * Lucide icon lookup dictionary for string icons passed in AST props
 */
export const LUCIDE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Archive,
  Trash2,
  Trash: Trash2,
  Delete: Trash2,
  Bookmark,
  Check,
  Plus,
  Add: Plus,
  Search,
  Bell,
  Settings,
  User,
  Heart,
  Share2,
  Share: Share2,
  Send,
  RefreshCw,
  Refresh: RefreshCw,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  Compass,
  Home,
  Layers,
  Grid,
  Filter,
  Download,
  Edit,
  Copy,
  Sparkles,
  Smartphone,
  Zap,
  X,
  Close: X,
  Menu,
  Info,
  AlertCircle,
  CheckCircle,
};

/**
 * Resolves a string icon name into a React component instance
 */
export function resolveIcon(icon: unknown, className: string = "h-4 w-4"): React.ReactNode {
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === "string") {
    const IconComponent = LUCIDE_ICON_MAP[icon];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
  }
  return null;
}

// ---------------- Interactive Component Adapters ----------------

/**
 * Interactive Switch with local state fallback when uncontrolled
 */
function InteractiveSwitch(props: React.ComponentProps<typeof Switch>) {
  const [checked, setChecked] = useState<boolean>(props.checked ?? props.defaultChecked ?? false);

  return (
    <Switch
      {...props}
      checked={props.checked !== undefined ? props.checked : checked}
      onCheckedChange={(c) => {
        setChecked(c);
        props.onCheckedChange?.(c);
      }}
    />
  );
}

/**
 * Interactive ThumbSegmentController with local active state fallback
 */
function InteractiveThumbSegmentController(
  props: React.ComponentProps<typeof ThumbSegmentController>
) {
  const firstId = props.items?.[0]?.id ?? "";
  const [value, setValue] = useState<string>(props.value ?? props.defaultValue ?? firstId);

  // Map icon strings to icon components in items
  const mappedItems = React.useMemo(() => {
    return (props.items || []).map((item) => ({
      ...item,
      icon: typeof item.icon === "string" ? resolveIcon(item.icon) : item.icon,
    }));
  }, [props.items]);

  return (
    <ThumbSegmentController
      {...props}
      items={mappedItems}
      value={props.value !== undefined ? props.value : value}
      onChange={(v) => {
        setValue(v);
        props.onChange?.(v);
      }}
    />
  );
}

/**
 * Interactive PullToRefresh with simulated refresh delay if no handler provided
 */
function InteractivePullToRefresh({
  children,
  onRefresh,
  ...props
}: React.ComponentProps<typeof PullToRefresh>) {
  const handleRefresh = React.useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
    } else {
      // Default 1000ms simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }, [onRefresh]);

  return (
    <PullToRefresh {...props} onRefresh={handleRefresh}>
      {children}
    </PullToRefresh>
  );
}

/**
 * Interactive SwipeActionCard with icon resolution
 */
function InteractiveSwipeActionCard({
  leftActions,
  rightActions,
  children,
  ...props
}: React.ComponentProps<typeof SwipeActionCard>) {
  const mappedLeft = React.useMemo(() => {
    return leftActions?.map((act) => ({
      ...act,
      icon: typeof act.icon === "string" ? resolveIcon(act.icon) : act.icon,
    }));
  }, [leftActions]);

  const mappedRight = React.useMemo(() => {
    return rightActions?.map((act) => ({
      ...act,
      icon: typeof act.icon === "string" ? resolveIcon(act.icon) : act.icon,
    }));
  }, [rightActions]);

  return (
    <SwipeActionCard
      {...props}
      leftActions={mappedLeft}
      rightActions={mappedRight}
    >
      {children}
    </SwipeActionCard>
  );
}

/**
 * Interactive FloatingActionDock with icon resolution
 */
function InteractiveFloatingActionDock({
  primaryAction,
  items,
  ...props
}: React.ComponentProps<typeof FloatingActionDock>) {
  const mappedPrimary = React.useMemo(() => {
    if (!primaryAction) return undefined;
    return {
      ...primaryAction,
      icon:
        typeof primaryAction.icon === "string"
          ? resolveIcon(primaryAction.icon)
          : primaryAction.icon,
    };
  }, [primaryAction]);

  const mappedItems = React.useMemo(() => {
    return (items || []).map((item) => ({
      ...item,
      icon: typeof item.icon === "string" ? resolveIcon(item.icon) : item.icon,
    }));
  }, [items]);

  return (
    <FloatingActionDock
      {...props}
      primaryAction={mappedPrimary}
      items={mappedItems}
    />
  );
}

/**
 * Interactive MobileBottomSheet with trigger fallback
 */
function InteractiveMobileBottomSheet({
  trigger,
  children,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof MobileBottomSheet>) {
  const [open, setOpen] = useState<boolean>(defaultOpen ?? false);
  const isControlled = controlledOpen !== undefined;
  const currentOpen = isControlled ? controlledOpen : open;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  // If no trigger is provided in AST and it is uncontrolled, supply a subtle button trigger
  const effectiveTrigger =
    trigger ||
    (!isControlled && (
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenChange(true)}
      >
        Open Bottom Sheet
      </Button>
    ));

  return (
    <MobileBottomSheet
      {...props}
      open={currentOpen}
      onOpenChange={handleOpenChange}
      trigger={effectiveTrigger}
    >
      {children}
    </MobileBottomSheet>
  );
}

// ---------------- Authoritative Primitive Registry Map ----------------

export const COMPONENT_REGISTRY_MAP: Record<string, React.ComponentType<any>> = {
  // Mobile Primitives (New)
  "mobile-bottom-sheet": InteractiveMobileBottomSheet,
  "bottom-sheet": InteractiveMobileBottomSheet,
  "swipe-action-card": InteractiveSwipeActionCard,
  "swipe-card": InteractiveSwipeActionCard,
  "thumb-segment-controller": InteractiveThumbSegmentController,
  "segment-controller": InteractiveThumbSegmentController,
  "segmented-control": InteractiveThumbSegmentController,
  "pull-to-refresh": InteractivePullToRefresh,
  "floating-action-dock": InteractiveFloatingActionDock,
  "action-dock": InteractiveFloatingActionDock,
  "dock": InteractiveFloatingActionDock,

  // Existing Kilo UI Primitives
  "button": Button,
  "btn": Button,
  "card": Card,
  "badge": Badge,
  "tag": Badge,
  "input": Input,
  "text-input": Input,
  "switch": InteractiveSwitch,
  "toggle": InteractiveSwitch,
  "checkbox": Checkbox,
  "dialog": Dialog,
  "modal": Dialog,
  "drawer-dialog": DrawerDialog,
  "drawer": DrawerDialog,
  "tabs": Tabs,
  "accordion": Accordion,
  "stat-card": StatCard,
  "skeleton": Skeleton,
  "command-palette": CommandPalette,
  "popover-dialog": PopoverDialog,
  "spotlight-modal": SpotlightModal,
  "toast-stack": ToastStack,
  "ticker-notification": TickerNotification,
  "dynamic-island-banner": DynamicIslandBanner,
  "stack-cards": StackCards,

  // Subcomponents
  "card-header": CardHeader,
  "card-title": CardTitle,
  "card-description": CardDescription,
  "card-content": CardContent,
  "card-footer": CardFooter,
  "dialog-trigger": DialogTrigger,
  "dialog-content": DialogContent,
  "dialog-header": DialogHeader,
  "dialog-title": DialogTitle,
  "dialog-description": DialogDescription,
  "dialog-footer": DialogFooter,
  "tabs-list": TabsList,
  "tabs-trigger": TabsTrigger,
  "tabs-content": TabsContent,
  "accordion-item": AccordionItem,
  "accordion-trigger": AccordionTrigger,
  "accordion-content": AccordionContent,
  "skeleton-text": SkeletonText,
  "skeleton-avatar": SkeletonAvatar,
  "skeleton-button": SkeletonButton,
  "skeleton-badge": SkeletonBadge,
  "skeleton-card": SkeletonCard,
};
