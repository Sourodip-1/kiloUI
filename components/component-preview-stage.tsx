"use client";

import * as React from "react";
import { RotateCcw, Check, Copy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Switch } from "@/registry/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/registry/ui/dialog";
import { Badge } from "@/registry/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion";
import { StatCard } from "@/registry/ui/stat-card";
import { RegistryItem } from "@/registry/registry-data";
import {
  VectorKiloLogo,
  VectorPanelLeftIcon,
  VectorFolderIcon,
  VectorLayersIcon,
  VectorApiIcon,
  VectorCategoryIcon,
} from "@/components/vector-icons";

export interface ComponentPreviewStageProps {
  item: RegistryItem;
  interactive?: boolean;
  viewport?: "desktop" | "tablet" | "mobile";
  className?: string;
  onReset?: () => void;
  showKnobs?: boolean;
  showGrid?: boolean;
  onConfiguredCodeChange?: (code: string) => void;
}

/** Tile container for individual controls matching photo 2 */
function CustomizeTile({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between h-10 px-3.5 rounded-lg bg-[var(--surface-secondary)]/75 hover:bg-[var(--surface-secondary)] border border-[var(--border)]/70 transition-colors",
        className
      )}
    >
      <span className="text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap pr-2 select-none">
        {label}
      </span>
      <div className="flex items-center justify-end flex-1 min-w-0">{children}</div>
    </div>
  );
}

/** Dropdown select matching photo 2 */
function CustomizeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[] | string[];
}) {
  const normOptions = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  return (
    <div className="relative flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-4 text-xs text-[var(--text-primary)] font-medium text-right focus:outline-none cursor-pointer truncate max-w-[130px]"
      >
        {normOptions.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[var(--surface-elevated)] text-[var(--text-primary)]"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="h-3 w-3 text-[var(--text-muted)] pointer-events-none shrink-0 ml-0.5" />
    </div>
  );
}

/** Rounded iOS-style pill switch matching photo 2 */
function CustomizeSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
        checked
          ? "bg-[var(--accent-green)]"
          : "bg-[var(--surface-tertiary)] border border-[var(--border)]"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5",
          checked ? "translate-x-4.5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

/** Transparent text input matching photo 2 */
function CustomizeInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-transparent text-right text-xs text-[var(--text-primary)] font-mono focus:outline-none placeholder:text-[var(--text-muted)] w-28 sm:w-36 px-1 truncate"
    />
  );
}

export function ComponentPreviewStage({
  item,
  interactive = true,
  viewport = "desktop",
  className,
  onReset,
  showKnobs = true,
  showGrid = false,
  onConfiguredCodeChange,
}: ComponentPreviewStageProps) {
  // 1. Button state
  const [btnVariant, setBtnVariant] = React.useState<any>("default");
  const [btnSize, setBtnSize] = React.useState<any>("default");
  const [btnLabel, setBtnLabel] = React.useState("Action Button");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  // 2. Input state
  const [inputVal, setInputVal] = React.useState("production.env");
  const [inputLabel, setInputLabel] = React.useState("Target Filename");
  const [inputPlaceholder, setInputPlaceholder] = React.useState("e.g. .env");
  const [inputHelper, setInputHelper] = React.useState("Relative to workspace root");
  const [inputError, setInputError] = React.useState("");
  const [inputDisabled, setInputDisabled] = React.useState(false);

  // 3. Switch state
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [switchLabel, setSwitchLabel] = React.useState("Cache Turbo Output");
  const [switchDesc, setSwitchDesc] = React.useState("Store compiled assets in local disk");
  const [switchDisabled, setSwitchDisabled] = React.useState(false);

  // 4. Dialog state
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("Deploy Revision #104");
  const [dialogDesc, setDialogDesc] = React.useState(
    "Are you sure you want to promote this build to production? Active connections will receive the updated worker bundle."
  );
  const [dialogTriggerLabel, setDialogTriggerLabel] = React.useState("Open Deploy Modal");

  // 5. Badge state
  const [badgeVariant, setBadgeVariant] = React.useState<any>("success");
  const [badgeDot, setBadgeDot] = React.useState(true);
  const [badgeText, setBadgeText] = React.useState("Operational");

  // 6. Card state
  const [cardTitle, setCardTitle] = React.useState("Edge Runtime Worker");
  const [cardDesc, setCardDesc] = React.useState("Distributed edge node instance");
  const [cardHover, setCardHover] = React.useState(true);

  // 7. Tabs state
  const [tabValue, setTabValue] = React.useState("overview");

  // 8. StatCard state
  const [statTitle, setStatTitle] = React.useState("Active Registry Users");
  const [statValue, setStatValue] = React.useState("12,840");
  const [statChange, setStatChange] = React.useState("+14.2%");
  const [statTrend, setStatTrend] = React.useState<"up" | "down" | "neutral">("up");
  const [statCaption, setStatCaption] = React.useState("vs last 30 days");
  const [statBadge, setStatBadge] = React.useState(true);

  // 9. Sidebar state
  const [sidebarDemoCollapsed, setSidebarDemoCollapsed] = React.useState(false);

  const handleResetAll = () => {
    setBtnVariant("default");
    setBtnSize("default");
    setBtnLabel("Action Button");
    setBtnLoading(false);
    setBtnDisabled(false);

    setInputVal("production.env");
    setInputLabel("Target Filename");
    setInputHelper("Relative to workspace root");
    setInputError("");
    setInputDisabled(false);

    setSwitchChecked(true);
    setSwitchLabel("Cache Turbo Output");
    setSwitchDesc("Store compiled assets in local disk");
    setSwitchDisabled(false);

    setDialogTitle("Deploy Revision #104");
    setDialogTriggerLabel("Open Deploy Modal");

    setBadgeVariant("accent");
    setBadgeDot(true);
    setBadgeText("Operational");

    setCardTitle("Edge Runtime Worker");
    setCardHover(true);

    setTabValue("overview");

    setStatTitle("Active Registry Users");
    setStatValue("12,840");
    setStatChange("+14.2%");
    setStatTrend("up");
    setStatBadge(true);

    setSidebarDemoCollapsed(false);
    onReset?.();
  };

  // Sync configured JSX code back to parent toolbar
  React.useEffect(() => {
    if (!onConfiguredCodeChange) return;

    let code = item.usage || item.files[0]?.content || "";
    if (item.name === "button") {
      code = `<Button variant="${btnVariant}" size="${btnSize}"${btnLoading ? " isLoading" : ""}${btnDisabled ? " disabled" : ""}>\n  ${btnLabel}\n</Button>`;
    } else if (item.name === "input") {
      code = `<Input\n  label="${inputLabel}"\n  value="${inputVal}"\n  placeholder="${inputPlaceholder}"\n  helperText="${inputHelper}"\n  ${inputError ? `error="${inputError}"\n  ` : ""}${inputDisabled ? "disabled\n" : ""}/>`;
    } else if (item.name === "switch") {
      code = `<Switch\n  checked={${switchChecked}}\n  label="${switchLabel}"\n  description="${switchDesc}"\n  ${switchDisabled ? "disabled\n" : ""}/>`;
    } else if (item.name === "badge") {
      code = `<Badge variant="${badgeVariant}"${badgeDot ? " dot" : ""}>${badgeText}</Badge>`;
    } else if (item.name === "card") {
      code = `<Card hover={${cardHover}} className="max-w-md">\n  <CardHeader>\n    <CardTitle>${cardTitle}</CardTitle>\n    <CardDescription>${cardDesc}</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-xs text-[var(--text-secondary)]">Edge network node operational</p>\n  </CardContent>\n</Card>`;
    } else if (item.name === "stat-card") {
      code = `<StatCard\n  title="${statTitle}"\n  value="${statValue}"\n  change="${statChange}"\n  trend="${statTrend}"\n  caption="${statCaption}"\n/>`;
    }
    onConfiguredCodeChange(code);
  }, [
    item,
    btnVariant,
    btnSize,
    btnLabel,
    btnLoading,
    btnDisabled,
    inputVal,
    inputLabel,
    inputPlaceholder,
    inputHelper,
    inputError,
    inputDisabled,
    switchChecked,
    switchLabel,
    switchDesc,
    switchDisabled,
    badgeVariant,
    badgeDot,
    badgeText,
    cardTitle,
    cardDesc,
    cardHover,
    statTitle,
    statValue,
    statChange,
    statTrend,
    statCaption,
    onConfiguredCodeChange,
  ]);

  const viewportWidth =
    viewport === "mobile"
      ? "max-w-[375px]"
      : viewport === "tablet"
      ? "max-w-[768px]"
      : "w-full max-w-full";

  return (
    <div className={cn("space-y-4", className)}>
      {/* 1. Canvas Viewport */}
      <div
        className={cn(
          "relative mx-auto transition-all duration-300 ease-out",
          showKnobs
            ? "p-6 sm:p-10 flex flex-col items-center justify-center min-h-[260px] rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--text-primary)] overflow-visible shadow-xs"
            : "p-0 flex items-center justify-center h-full w-full border-none bg-transparent shadow-none",
          viewportWidth,
          showGrid && "bg-[radial-gradient(var(--canvas-grid-dot)_1px,transparent_1px)] [background-size:16px_16px]",
          viewport === "mobile" && "border-[var(--border-hover)] ring-1 ring-black/5 dark:ring-white/5 shadow-2xl rounded-2xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Viewport size indicator badge */}
        {interactive && showKnobs && viewport !== "desktop" && (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xs font-mono text-[10px] text-[var(--text-muted)] pointer-events-none select-none">
            {viewport === "mobile" ? "375px • Mobile" : "768px • Tablet"}
          </div>
        )}
        {/* Reset Action (Top right) */}
        {interactive && showKnobs && (
          <button
            type="button"
            onClick={handleResetAll}
            className="absolute top-3 right-3 p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            title="Reset component to default properties"
            aria-label="Reset to default"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}

        {/* --- ACTUAL LIVE COMPONENT PREVIEW --- */}
        <div className="w-full flex items-center justify-center">
          {/* Button */}
          {item.name === "button" && (
            <div className="flex flex-col items-center gap-3">
              <Button
                variant={btnVariant}
                size={btnSize}
                isLoading={btnLoading}
                disabled={btnDisabled}
              >
                {btnLabel}
              </Button>
            </div>
          )}

          {/* Input */}
          {item.name === "input" && (
            <div className="w-full max-w-sm">
              <Input
                label={inputLabel}
                value={inputVal}
                placeholder={inputPlaceholder}
                helperText={inputHelper}
                error={inputError}
                disabled={inputDisabled}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </div>
          )}

          {/* Switch */}
          {item.name === "switch" && (
            <div className="w-full max-w-sm p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/60">
              <Switch
                label={switchLabel}
                description={switchDesc}
                checked={switchChecked}
                disabled={switchDisabled}
                onCheckedChange={setSwitchChecked}
              />
            </div>
          )}

          {/* Dialog */}
          {item.name === "dialog" && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="accent">{dialogTriggerLabel}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDesc}</DialogDescription>
                  </DialogHeader>
                  <div className="py-2 space-y-2">
                    <div className="p-2.5 rounded bg-[var(--surface-secondary)] border border-[var(--border)] font-mono text-xs text-[var(--text-secondary)]">
                      SHA: 02bc9fa • Branch: main
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="accent" onClick={() => setDialogOpen(false)}>
                      Confirm Deploy
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {showKnobs && (
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Click button to test accessible modal dialog with backdrop & portal
                </span>
              )}
            </div>
          )}

          {/* Badge */}
          {item.name === "badge" && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant={badgeVariant} dot={badgeDot}>
                {badgeText}
              </Badge>
              {showKnobs && (
                <>
                  <Badge variant="outline">v0.1.0</Badge>
                  <Badge variant="secondary">Turbopack</Badge>
                </>
              )}
            </div>
          )}

          {/* Card */}
          {item.name === "card" && (
            showKnobs ? (
              <Card variant={cardHover ? "interactive" : "default"} className="w-full max-w-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{cardTitle}</CardTitle>
                    <Badge variant="success" dot>
                      Active
                    </Badge>
                  </div>
                  <CardDescription>{cardDesc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    High-performance edge compute node running with sub-millisecond cold start times.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">us-east-1</span>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card variant="default" className="w-full max-w-[245px] shadow-xs">
                <CardHeader className="p-2.5 pb-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-semibold leading-none truncate max-w-[150px]">
                      {cardTitle}
                    </CardTitle>
                    <Badge variant="success" dot className="text-[9px] px-1 py-0 h-4">
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="text-[10px] truncate">{cardDesc}</CardDescription>
                </CardHeader>
                <CardFooter className="p-2.5 pt-1 flex justify-between items-center border-t border-[var(--border)]/50 text-[10px] mt-1">
                  <span className="font-mono text-[9px] text-[var(--text-muted)]">us-east-1</span>
                  <span className="font-mono text-[10px] text-[var(--accent-green)] font-medium">99.9% uptime</span>
                </CardFooter>
              </Card>
            )
          )}

          {/* Tabs */}
          {item.name === "tabs" && (
            showKnobs ? (
              <div className="w-full max-w-md">
                <Tabs value={tabValue} onValueChange={setTabValue}>
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/50 mt-2 text-xs text-[var(--text-secondary)]"
                  >
                    All cluster nodes operational across 8 global availability zones.
                  </TabsContent>
                  <TabsContent
                    value="metrics"
                    className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/50 mt-2 text-xs text-[var(--text-secondary)]"
                  >
                    CPU: 12% • Memory: 1.4GB / 4GB • Network: 280MB/s
                  </TabsContent>
                  <TabsContent
                    value="logs"
                    className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/50 mt-2 text-xs font-mono text-[var(--text-muted)]"
                  >
                    [14:22:04] Worker #104 ready on 0.0.0.0:3000
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="w-full max-w-[245px]">
                <Tabs value={tabValue} onValueChange={setTabValue}>
                  <TabsList className="w-full grid grid-cols-3 h-7 p-0.5">
                    <TabsTrigger value="overview" className="text-[11px] py-1">Overview</TabsTrigger>
                    <TabsTrigger value="metrics" className="text-[11px] py-1">Metrics</TabsTrigger>
                    <TabsTrigger value="logs" className="text-[11px] py-1">Logs</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="overview"
                    className="p-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]/50 mt-1.5 text-[11px] text-[var(--text-secondary)] truncate"
                  >
                    Operational across 8 zones.
                  </TabsContent>
                  <TabsContent
                    value="metrics"
                    className="p-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]/50 mt-1.5 text-[11px] text-[var(--text-secondary)] truncate"
                  >
                    CPU: 12% • Memory: 1.4GB
                  </TabsContent>
                  <TabsContent
                    value="logs"
                    className="p-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]/50 mt-1.5 text-[10px] font-mono text-[var(--text-muted)] truncate"
                  >
                    Worker #104 ready
                  </TabsContent>
                </Tabs>
              </div>
            )
          )}

          {/* Accordion */}
          {item.name === "accordion" && (
            showKnobs ? (
              <div className="w-full max-w-md">
                <Accordion type="single" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does component distribution work?</AccordionTrigger>
                    <AccordionContent>
                      kiloUI provides shadcn-compatible JSON metadata endpoints for zero-dependency CLI installations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is SSR and App Router supported?</AccordionTrigger>
                    <AccordionContent>
                      Yes, fully compatible with Next.js App Router and React Server Components.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <div className="w-full max-w-[245px]">
                <Accordion type="single">
                  <AccordionItem value="item-1" className="border-[var(--border)]">
                    <AccordionTrigger className="py-2 text-xs hover:no-underline font-medium">
                      <span className="truncate pr-2">Distribution & CLI</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-[11px] text-[var(--text-secondary)]">
                      shadcn-compatible JSON CLI endpoints.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="py-2 text-xs hover:no-underline font-medium">
                      <span className="truncate pr-2">App Router & SSR</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-[11px] text-[var(--text-secondary)]">
                      React Server Components ready.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )
          )}

          {/* Stat Card */}
          {item.name === "stat-card" && (
            showKnobs ? (
              <div className="w-full max-w-sm space-y-3">
                <StatCard
                  title={statTitle}
                  value={statValue}
                  change={statChange}
                  trend={statTrend}
                  caption={statCaption}
                  badge={statBadge ? "Live" : undefined}
                  sparkline={[4, 6, 8, 7, 12, 11, 15, 14, 19]}
                />
              </div>
            ) : (
              <div className="w-full max-w-[245px]">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-2.5 text-[var(--text-primary)]">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] truncate">
                      {statTitle}
                    </span>
                    {statBadge && (
                      <span className="rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1 py-0 font-mono text-[9px] text-[var(--text-muted)]">
                        Live
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <div className="text-lg font-mono font-semibold tracking-tight text-[var(--text-primary)]">
                        {statValue}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--accent-green)]">
                        <span>{statChange}</span>
                        {statCaption && <span className="text-[var(--text-muted)]">{statCaption}</span>}
                      </div>
                    </div>
                    <div className="w-20 h-6 shrink-0">
                      <svg viewBox="0 0 120 32" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="var(--accent-green)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points="0,26 15,22 30,25 45,18 60,14 75,16 90,9 105,11 120,4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {/* Sidebar - ACTUAL functioning mini interactive Sidebar */}
          {item.name === "sidebar" && (
            showKnobs ? (
              <div className="w-full max-w-2xl h-[340px] rounded-xl border border-[var(--border)] overflow-hidden shadow-xl flex bg-[var(--bg-main)]">
                {/* Miniature interactive Sidebar */}
                <div
                  className={cn(
                    "flex flex-col h-full border-r border-[var(--border)] bg-[var(--bg-sidebar)] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none shrink-0",
                    sidebarDemoCollapsed ? "w-14" : "w-52"
                  )}
                >
                  {/* Brand Header */}
                  <div className="flex h-11 items-center justify-between px-3 border-b border-[var(--border)] shrink-0">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="h-5 w-5 shrink-0 flex items-center justify-center">
                        <VectorKiloLogo className="h-5 w-5" />
                      </div>
                      {!sidebarDemoCollapsed && (
                        <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                          kilo<span className="text-[var(--accent-green)]">/</span>ui
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSidebarDemoCollapsed(!sidebarDemoCollapsed)}
                      className="p-1 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
                      title={sidebarDemoCollapsed ? "Expand (⌘B)" : "Collapse (⌘B)"}
                    >
                      <VectorPanelLeftIcon isCollapsed={sidebarDemoCollapsed} className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Nav Items */}
                  <div className="flex-1 p-2 space-y-1 overflow-hidden">
                    <div className="flex items-center gap-2 p-1.5 rounded bg-[var(--surface-secondary)] text-[var(--text-primary)] font-medium text-[11px]">
                      <VectorFolderIcon isActive={true} className="h-3.5 w-3.5 text-[var(--accent-green)] shrink-0" />
                      {!sidebarDemoCollapsed && <span>Overview</span>}
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] text-[11px] transition-colors cursor-pointer">
                      <VectorLayersIcon className="h-3.5 w-3.5 text-[var(--text-primary)] shrink-0" />
                      {!sidebarDemoCollapsed && (
                        <div className="flex items-center justify-between flex-1">
                          <span>Components</span>
                          <span className="font-mono text-[9px] text-[var(--text-muted)]">10</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] text-[11px] transition-colors cursor-pointer">
                      <VectorApiIcon className="h-3.5 w-3.5 text-[var(--text-primary)] shrink-0" />
                      {!sidebarDemoCollapsed && <span>Registry API</span>}
                    </div>

                    {!sidebarDemoCollapsed && (
                      <div className="pt-2">
                        <div className="px-1 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider pb-1">
                          Categories
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 px-1.5 py-1 rounded text-[11px] text-[var(--accent-green)] bg-[var(--surface-secondary)]/50 font-medium">
                            <VectorCategoryIcon category="Actions" isActive={true} className="h-3 w-3 text-[var(--accent-green)]" />
                            <span>Actions</span>
                          </div>
                          <div className="flex items-center gap-2 px-1.5 py-1 rounded text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            <VectorCategoryIcon category="Forms & Inputs" className="h-3 w-3 text-[var(--text-primary)]" />
                            <span>Forms & Inputs</span>
                          </div>
                          <div className="flex items-center gap-2 px-1.5 py-1 rounded text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            <VectorCategoryIcon category="Overlays" className="h-3 w-3 text-[var(--text-primary)]" />
                            <span>Overlays</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-2 border-t border-[var(--border)] shrink-0 text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
                      {!sidebarDemoCollapsed && <span>Registry Active</span>}
                    </div>
                    {!sidebarDemoCollapsed && <span className="text-[9px]">v0.1.0</span>}
                  </div>
                </div>

                {/* Main Content Pane inside Mock App */}
                <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                      <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                        Application Content
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSidebarDemoCollapsed(!sidebarDemoCollapsed)}
                        className="h-7 text-xs"
                      >
                        {sidebarDemoCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                      </Button>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      The sidebar smoothly toggles between full 208px navigation and compact 56px mini-bar icon mode.
                    </p>
                  </div>
                  <div className="rounded border border-[var(--border)] bg-[var(--surface-secondary)]/30 p-2.5 font-mono text-[11px] text-[var(--text-muted)] flex items-center justify-between">
                    <span>State: {sidebarDemoCollapsed ? "collapsed (56px)" : "expanded (208px)"}</span>
                    <span className="text-[var(--accent-green)]">⌘B shortcut supported</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[210px] h-20 rounded-md border border-[var(--border)] overflow-hidden flex bg-[var(--bg-sidebar)] select-none">
                <div className="w-8 border-r border-[var(--border)] flex flex-col items-center py-2 gap-1 shrink-0 bg-[var(--bg-main)]">
                  <VectorKiloLogo className="h-3 w-3" />
                  <div className="h-px w-4 bg-[var(--border)] my-0.5" />
                  <div className="w-5 h-4.5 rounded bg-[var(--surface-secondary)] flex items-center justify-center">
                    <VectorFolderIcon isActive className="h-2.5 w-2.5 text-[var(--accent-green)]" />
                  </div>
                  <div className="w-5 h-4.5 rounded flex items-center justify-center">
                    <VectorLayersIcon className="h-2.5 w-2.5 text-[var(--text-secondary)]" />
                  </div>
                </div>
                <div className="flex-1 p-2.5 flex flex-col justify-center gap-1.5 bg-[var(--surface-elevated)]/30">
                  <div className="h-2 w-16 rounded bg-[var(--surface-secondary)]" />
                  <div className="h-1.5 w-24 rounded bg-[var(--surface-secondary)]/50" />
                  <div className="h-1.5 w-12 rounded bg-[var(--accent-green)]/30 mt-0.5" />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* 2. Customize Controls Panel matching photo 2 */}
      {showKnobs && (
        <div
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-5 space-y-3.5 shadow-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-1">
            <h3 className="font-sans text-sm font-semibold tracking-tight text-[var(--text-primary)]">
              Customize
            </h3>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Live reactive properties
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {/* Button Controls */}
            {item.name === "button" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={btnVariant}
                    onChange={setBtnVariant}
                    options={item.variants || ["default", "secondary", "outline", "ghost", "accent", "destructive", "link"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Size">
                  <CustomizeSelect
                    value={btnSize}
                    onChange={setBtnSize}
                    options={["sm", "default", "lg", "icon"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={btnLabel}
                    onChange={setBtnLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Loading State">
                  <CustomizeSwitch
                    checked={btnLoading}
                    onChange={setBtnLoading}
                    label="Toggle loading"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={btnDisabled}
                    onChange={setBtnDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Input Controls */}
            {item.name === "input" && (
              <>
                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={inputLabel}
                    onChange={setInputLabel}
                    placeholder="Field label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Value">
                  <CustomizeInput
                    value={inputVal}
                    onChange={setInputVal}
                    placeholder="Input text"
                  />
                </CustomizeTile>

                <CustomizeTile label="Helper Text">
                  <CustomizeInput
                    value={inputHelper}
                    onChange={setInputHelper}
                    placeholder="Helper instructions"
                  />
                </CustomizeTile>

                <CustomizeTile label="Placeholder">
                  <CustomizeInput
                    value={inputPlaceholder}
                    onChange={setInputPlaceholder}
                    placeholder="Placeholder"
                  />
                </CustomizeTile>

                <CustomizeTile label="Simulate Error">
                  <CustomizeSwitch
                    checked={!!inputError}
                    onChange={(checked) =>
                      setInputError(checked ? "Invalid file extension (.env required)" : "")
                    }
                    label="Simulate input error state"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={inputDisabled}
                    onChange={setInputDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Switch Controls */}
            {item.name === "switch" && (
              <>
                <CustomizeTile label="Label">
                  <CustomizeInput
                    value={switchLabel}
                    onChange={setSwitchLabel}
                    placeholder="Switch label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={switchDesc}
                    onChange={setSwitchDesc}
                    placeholder="Switch description"
                  />
                </CustomizeTile>

                <CustomizeTile label="Checked State">
                  <CustomizeSwitch
                    checked={switchChecked}
                    onChange={setSwitchChecked}
                    label="Toggle switch"
                  />
                </CustomizeTile>

                <CustomizeTile label="Disabled">
                  <CustomizeSwitch
                    checked={switchDisabled}
                    onChange={setSwitchDisabled}
                    label="Toggle disabled"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Dialog Controls */}
            {item.name === "dialog" && (
              <>
                <CustomizeTile label="Trigger Label">
                  <CustomizeInput
                    value={dialogTriggerLabel}
                    onChange={setDialogTriggerLabel}
                    placeholder="Button label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Dialog Title">
                  <CustomizeInput
                    value={dialogTitle}
                    onChange={setDialogTitle}
                    placeholder="Dialog title"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={dialogDesc}
                    onChange={setDialogDesc}
                    placeholder="Dialog description"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Badge Controls */}
            {item.name === "badge" && (
              <>
                <CustomizeTile label="Variant">
                  <CustomizeSelect
                    value={badgeVariant}
                    onChange={setBadgeVariant}
                    options={item.variants || ["default", "secondary", "outline", "accent", "destructive", "pill"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Badge Text">
                  <CustomizeInput
                    value={badgeText}
                    onChange={setBadgeText}
                    placeholder="Badge label"
                  />
                </CustomizeTile>

                <CustomizeTile label="Status Dot">
                  <CustomizeSwitch
                    checked={badgeDot}
                    onChange={setBadgeDot}
                    label="Toggle status indicator dot"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Card Controls */}
            {item.name === "card" && (
              <>
                <CustomizeTile label="Title">
                  <CustomizeInput
                    value={cardTitle}
                    onChange={setCardTitle}
                    placeholder="Card title"
                  />
                </CustomizeTile>

                <CustomizeTile label="Description">
                  <CustomizeInput
                    value={cardDesc}
                    onChange={setCardDesc}
                    placeholder="Card description"
                  />
                </CustomizeTile>

                <CustomizeTile label="Hover Effect">
                  <CustomizeSwitch
                    checked={cardHover}
                    onChange={setCardHover}
                    label="Toggle hover glow effect"
                  />
                </CustomizeTile>
              </>
            )}

            {/* StatCard Controls */}
            {item.name === "stat-card" && (
              <>
                <CustomizeTile label="Title">
                  <CustomizeInput
                    value={statTitle}
                    onChange={setStatTitle}
                    placeholder="Metric name"
                  />
                </CustomizeTile>

                <CustomizeTile label="Value">
                  <CustomizeInput
                    value={statValue}
                    onChange={setStatValue}
                    placeholder="12,840"
                  />
                </CustomizeTile>

                <CustomizeTile label="Change">
                  <CustomizeInput
                    value={statChange}
                    onChange={setStatChange}
                    placeholder="+14.2%"
                  />
                </CustomizeTile>

                <CustomizeTile label="Trend">
                  <CustomizeSelect
                    value={statTrend}
                    onChange={(v) => setStatTrend(v as any)}
                    options={["up", "down", "neutral"]}
                  />
                </CustomizeTile>

                <CustomizeTile label="Caption">
                  <CustomizeInput
                    value={statCaption}
                    onChange={setStatCaption}
                    placeholder="vs last month"
                  />
                </CustomizeTile>

                <CustomizeTile label="Trend Badge">
                  <CustomizeSwitch
                    checked={statBadge}
                    onChange={setStatBadge}
                    label="Show trend badge"
                  />
                </CustomizeTile>
              </>
            )}

            {/* Sidebar Controls */}
            {item.name === "sidebar" && (
              <CustomizeTile label="Collapsed Mode">
                <CustomizeSwitch
                  checked={sidebarDemoCollapsed}
                  onChange={setSidebarDemoCollapsed}
                  label="Toggle sidebar collapse"
                />
              </CustomizeTile>
            )}

            {/* Tabs Controls */}
            {item.name === "tabs" && (
              <CustomizeTile label="Active Tab">
                <CustomizeSelect
                  value={tabValue}
                  onChange={setTabValue}
                  options={["overview", "analytics", "reports", "settings"]}
                />
              </CustomizeTile>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
