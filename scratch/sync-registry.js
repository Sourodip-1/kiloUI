const fs = require("fs");
const path = require("path");

const PROPS_MAP = {
  button: [
    { name: "variant", type: "'default' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive' | 'link'", defaultValue: "'default'", description: "Visual hierarchy and semantic color styling." },
    { name: "size", type: "'sm' | 'default' | 'lg' | 'icon'", defaultValue: "'default'", description: "Controls button dimensions and padding." },
    { name: "isLoading", type: "boolean", defaultValue: "false", description: "Replaces text with an animated SVG spinner and disables interaction." },
    { name: "leftIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered before the button label." },
    { name: "rightIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon rendered after the button label." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and reduces opacity." },
    { name: "children", type: "React.ReactNode", required: true, description: "Content rendered inside the button element." }
  ],
  input: [
    { name: "label", type: "string", defaultValue: "undefined", description: "Field label rendered above the input." },
    { name: "error", type: "string", defaultValue: "undefined", description: "Validation error message that triggers error state styling." },
    { name: "helperText", type: "string", defaultValue: "undefined", description: "Supplementary context or instructions below the input." },
    { name: "startIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon slot positioned inside the left edge." },
    { name: "endIcon", type: "React.ReactNode", defaultValue: "undefined", description: "Icon slot positioned inside the right edge." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and dims the field." },
    { name: "placeholder", type: "string", defaultValue: "undefined", description: "Placeholder text rendered when empty." }
  ],
  switch: [
    { name: "checked", type: "boolean", required: true, description: "Controlled toggle switch state." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", required: true, description: "Callback invoked when toggle state changes." },
    { name: "label", type: "string", defaultValue: "undefined", description: "Primary title rendered next to the switch." },
    { name: "description", type: "string", defaultValue: "undefined", description: "Optional description caption beneath the label." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables toggle interaction." }
  ],
  dialog: [
    { name: "open", type: "boolean", defaultValue: "undefined", description: "Controlled open state of the modal dialog." },
    { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback invoked when modal opens or closes." },
    { name: "children", type: "React.ReactNode", required: true, description: "DialogTrigger, DialogContent, and sub-elements." }
  ],
  badge: [
    { name: "variant", type: "'default' | 'secondary' | 'outline' | 'accent' | 'destructive' | 'pill'", defaultValue: "'default'", description: "Semantic color treatment and shape." },
    { name: "dot", type: "boolean", defaultValue: "false", description: "Displays a pulsating real-time status indicator." },
    { name: "children", type: "React.ReactNode", required: true, description: "Text or badge content." }
  ],
  card: [
    { name: "hoverEffect", type: "boolean", defaultValue: "false", description: "Enables subtle vertical elevation and border hover highlight." },
    { name: "className", type: "string", defaultValue: "undefined", description: "Additional Tailwind CSS classes." },
    { name: "children", type: "React.ReactNode", required: true, description: "CardHeader, CardTitle, CardContent, CardFooter." }
  ],
  tabs: [
    { name: "defaultValue", type: "string", defaultValue: "undefined", description: "Default active tab for uncontrolled usage." },
    { name: "value", type: "string", defaultValue: "undefined", description: "Controlled active tab key." },
    { name: "onValueChange", type: "(value: string) => void", defaultValue: "undefined", description: "Event fired on tab selection change." },
    { name: "children", type: "React.ReactNode", required: true, description: "TabsList, TabsTrigger, and TabsContent components." }
  ],
  accordion: [
    { name: "type", type: "'single' | 'multiple'", defaultValue: "'single'", description: "Determines whether one or multiple sections can be open simultaneously." },
    { name: "collapsible", type: "boolean", defaultValue: "true", description: "Allows closing an active section by clicking it again." },
    { name: "defaultValue", type: "string | string[]", defaultValue: "undefined", description: "Initially expanded item value(s)." },
    { name: "children", type: "React.ReactNode", required: true, description: "AccordionItem, AccordionTrigger, AccordionContent." }
  ],
  "stat-card": [
    { name: "title", type: "string", defaultValue: "'Metric'", description: "Label describing the statistical metric." },
    { name: "value", type: "string | number", required: true, description: "Primary numerical metric value." },
    { name: "change", type: "string", defaultValue: "undefined", description: "Percentage or delta text (e.g. '+14.2%')." },
    { name: "trend", type: "'up' | 'down' | 'neutral'", defaultValue: "'up'", description: "Trend direction controlling status accent colors." },
    { name: "caption", type: "string", defaultValue: "undefined", description: "Supplementary caption (e.g. 'vs last month')." },
    { name: "chartData", type: "number[]", defaultValue: "undefined", description: "Array of numeric values rendered as an SVG sparkline." }
  ],
  sidebar: [
    { name: "collapsed", type: "boolean", defaultValue: "false", description: "Controls whether the sidebar is collapsed (64px) or expanded (256px)." },
    { name: "onCollapsedChange", type: "(collapsed: boolean) => void", defaultValue: "undefined", description: "Callback fired when the user toggles the sidebar (also supports ⌘B)." },
    { name: "mobileOpen", type: "boolean", defaultValue: "false", description: "Controls visibility of the mobile overlay navigation drawer." },
    { name: "onMobileOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback invoked to dismiss the mobile drawer." },
    { name: "activeComponent", type: "string", defaultValue: "undefined", description: "Name of the component currently active in documentation." },
    { name: "activeCategory", type: "string", defaultValue: "undefined", description: "Category currently active or filtered." },
    { name: "theme", type: "'dark' | 'light' | 'system'", defaultValue: "'dark'", description: "Controls logo and icon theme rendering." }
  ]
};

const USAGE_MAP = {
  button: `import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="default">Deploy</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="accent" isLoading>Syncing</Button>
    </div>
  );
}`,
  input: `import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function InputDemo() {
  return (
    <Input
      label="Project File"
      placeholder="e.g. package.json"
      startIcon={<Search className="h-4 w-4" />}
      helperText="Specify relative path to file"
    />
  );
}`,
  switch: `import { Switch } from "@/components/ui/switch";
import * as React from "react";

export function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <Switch
      label="Turbo Cache"
      description="Store compiled assets in local disk"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}`,
  dialog: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="accent">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deploy Revision #104</DialogTitle>
          <DialogDescription>
            Are you sure you want to promote this build to production?
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-xs text-muted">
          Active connections will receive the updated worker bundle.
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="accent">Confirm Deploy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
  badge: `import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="accent" dot>Operational</Badge>
      <Badge variant="secondary">v0.1.0</Badge>
      <Badge variant="destructive">Failed</Badge>
    </div>
  );
}`,
  card: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CardDemo() {
  return (
    <Card hoverEffect className="w-80">
      <CardHeader>
        <CardTitle>Edge Worker</CardTitle>
        <CardDescription>Serverless runtime node</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-[var(--text-secondary)]">
          99.99% uptime recorded across 24 regions.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Inspect Logs</Button>
      </CardFooter>
    </Card>
  );
}`,
  tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-xs p-3 text-[var(--text-secondary)]">Cluster healthy</p>
      </TabsContent>
      <TabsContent value="metrics">
        <p className="text-xs p-3 text-[var(--text-secondary)]">CPU: 14%</p>
      </TabsContent>
      <TabsContent value="logs">
        <p className="text-xs p-3 text-[var(--text-secondary)]">Listening on 0.0.0.0:3000</p>
      </TabsContent>
    </Tabs>
  );
}`,
  accordion: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does component distribution work?</AccordionTrigger>
        <AccordionContent>
          kiloUI provides standard shadcn-compatible JSON metadata endpoints.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I customize colors?</AccordionTrigger>
        <AccordionContent>
          Yes, all styles rely on CSS design variables like --accent-green and --bg-main.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  "stat-card": `import { StatCard } from "@/components/ui/stat-card";

export function StatCardDemo() {
  return (
    <StatCard
      title="Active Registry Installs"
      value="128,400"
      change="+14.2%"
      trend="up"
      caption="vs last 30 days"
      chartData={[20, 35, 45, 40, 60, 75, 85, 95]}
    />
  );
}`,
  sidebar: `import { Sidebar } from "@/components/ui/sidebar";
import * as React from "react";

export function SidebarDemo() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex h-96 border border-[var(--border)] rounded-lg overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        activeComponent="button"
      />
      <div className="flex-1 p-6 bg-[var(--bg-main)]">
        <p className="text-sm text-white">Press ⌘B or click toggle icon to collapse.</p>
      </div>
    </div>
  );
}`
};

const METADATA_MAP = {
  button: {
    category: "Actions",
    title: "Button",
    description: "Interactive button control supporting 7 semantic variants, 4 sizes, loading spinner, and icon slots.",
    variants: ["default", "secondary", "outline", "ghost", "accent", "destructive", "link"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  input: {
    category: "Forms & Inputs",
    title: "Input",
    description: "Text field with start and end icon slots, labels, helper text, and error validation states.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  switch: {
    category: "Forms & Inputs",
    title: "Switch",
    description: "Accessible toggle switch with green accent active state, labels, and description.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  dialog: {
    category: "Overlays",
    title: "Dialog",
    description: "Modal dialog primitive with accessible focus management, portal rendering, backdrop blur, and escape key handling.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  badge: {
    category: "Data Display",
    title: "Badge",
    description: "Compact status indicator with pulsating dot option, pill variants, and semantic color treatments.",
    variants: ["default", "secondary", "outline", "accent", "destructive", "pill"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  card: {
    category: "Data Display",
    title: "Card",
    description: "Container primitive with structured header, content, and footer slots, plus hover elevation physics.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  tabs: {
    category: "Navigation",
    title: "Tabs",
    description: "Segmented tab controls with keyboard arrow navigation and responsive layout.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  accordion: {
    category: "Navigation",
    title: "Accordion",
    description: "Collapsible disclosure items with animated height expansion and single or multiple mode support.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "stat-card": {
    category: "Data Display",
    title: "Stat Card",
    description: "Metric card displaying quantitative value, percentage delta, trend indicator, and live SVG sparkline.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  sidebar: {
    category: "Navigation",
    title: "Sidebar",
    description: "Production-grade navigation sidebar with collapse physics (⌘B), white-by-default icons, and mobile drawer.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils", "vector-icons"]
  }
};

const uiDir = path.join(__dirname, "../registry/ui");
const items = {};

for (const [key, meta] of Object.entries(METADATA_MAP)) {
  const filePath = path.join(uiDir, `${key}.tsx`);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, "utf-8");
  items[key] = {
    name: key,
    category: meta.category,
    title: meta.title,
    description: meta.description,
    ...(meta.variants ? { variants: meta.variants } : {}),
    dependencies: meta.dependencies,
    registryDependencies: meta.registryDependencies,
    usage: USAGE_MAP[key] || "",
    props: PROPS_MAP[key] || [],
    files: [
      {
        name: `${key}.tsx`,
        type: "components:ui",
        content: content
      }
    ]
  };
}

const outContent = `export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface RegistryItem {
  name: string;
  type?: "components:ui" | "components:lib";
  category: "Actions" | "Forms & Inputs" | "Overlays" | "Data Display" | "Navigation" | "Media & Layout";
  title: string;
  description: string;
  variants?: string[];
  dependencies?: string[];
  registryDependencies?: string[];
  aiPrompt?: string;
  usage?: string;
  props?: PropDefinition[];
  files: {
    name: string;
    content: string;
    type: "components:ui" | "components:lib";
  }[];
}

export const REGISTRY_DATA: Record<string, RegistryItem> = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, "../registry/registry-data.ts"), outContent, "utf-8");
console.log("Successfully synchronized registry-data.ts with all 11 components and exact source code!");
