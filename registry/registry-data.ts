export interface PropDefinition {
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

export const REGISTRY_DATA: Record<string, RegistryItem> = {
  "button": {
    "name": "button",
    "category": "Actions",
    "title": "Button",
    "description": "Interactive button control supporting 7 semantic variants, 4 sizes, loading spinner, and icon slots.",
    "variants": [
      "default",
      "secondary",
      "outline",
      "ghost",
      "accent",
      "destructive",
      "link"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Button } from \"@/components/ui/button\";\n\nexport function ButtonDemo() {\n  return (\n    <div className=\"flex items-center gap-3\">\n      <Button variant=\"default\">Deploy</Button>\n      <Button variant=\"secondary\">Cancel</Button>\n      <Button variant=\"accent\" isLoading>Syncing</Button>\n    </div>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'default' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive' | 'link'",
        "defaultValue": "'default'",
        "description": "Visual hierarchy and semantic color styling."
      },
      {
        "name": "size",
        "type": "'sm' | 'default' | 'lg' | 'icon'",
        "defaultValue": "'default'",
        "description": "Controls button dimensions and padding."
      },
      {
        "name": "isLoading",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Replaces text with an animated SVG spinner and disables interaction."
      },
      {
        "name": "leftIcon",
        "type": "React.ReactNode",
        "defaultValue": "undefined",
        "description": "Icon rendered before the button label."
      },
      {
        "name": "rightIcon",
        "type": "React.ReactNode",
        "defaultValue": "undefined",
        "description": "Icon rendered after the button label."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Disables interaction and reduces opacity."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Content rendered inside the button element."
      }
    ],
    "files": [
      {
        "name": "button.tsx",
        "type": "components:ui",
        "content": "import * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport interface ButtonProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?:\n    | \"default\"\n    | \"secondary\"\n    | \"outline\"\n    | \"ghost\"\n    | \"accent\"\n    | \"destructive\"\n    | \"link\";\n  size?: \"sm\" | \"default\" | \"lg\" | \"icon\";\n  isLoading?: boolean;\n  leftIcon?: React.ReactNode;\n  rightIcon?: React.ReactNode;\n}\n\nconst variantStyles: Record<NonNullable<ButtonProps[\"variant\"]>, string> = {\n  default:\n    \"bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 active:scale-[0.99] border border-transparent font-medium shadow-none\",\n  secondary:\n    \"bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] active:scale-[0.99] border border-[var(--border)]\",\n  outline:\n    \"bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-[0.99] border border-[var(--border)]\",\n  ghost:\n    \"bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] active:scale-[0.99] border border-transparent\",\n  accent:\n    \"bg-[var(--accent-green-deep)] text-[var(--accent-green)] hover:brightness-110 active:scale-[0.99] border border-[var(--accent-green)]/30 font-medium\",\n  destructive:\n    \"bg-[var(--accent-red-deep)] text-[var(--accent-red)] hover:brightness-110 active:scale-[0.99] border border-[var(--accent-red)]/30 font-medium\",\n  link:\n    \"bg-transparent text-[var(--accent-green)] hover:underline border-none p-0 h-auto font-normal\",\n};\n\nconst sizeStyles: Record<NonNullable<ButtonProps[\"size\"]>, string> = {\n  sm: \"h-7 px-2.5 text-xs rounded gap-1.5\",\n  default: \"h-9 px-3.5 text-xs rounded-md gap-2\",\n  lg: \"h-10 px-4 text-sm rounded-md gap-2.5\",\n  icon: \"h-9 w-9 p-0 rounded-md justify-center\",\n};\n\nexport const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\n  (\n    {\n      className,\n      variant = \"default\",\n      size = \"default\",\n      isLoading = false,\n      leftIcon,\n      rightIcon,\n      children,\n      disabled,\n      ...props\n    },\n    ref\n  ) => {\n    return (\n      <button\n        ref={ref}\n        disabled={disabled || isLoading}\n        className={cn(\n          \"inline-flex items-center justify-center font-normal transition-colors select-none tracking-tight\",\n          \"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-main)]\",\n          \"disabled:opacity-40 disabled:pointer-events-none cursor-pointer\",\n          variantStyles[variant],\n          sizeStyles[size],\n          className\n        )}\n        {...props}\n      >\n        {isLoading ? (\n          <>\n            <svg\n              className=\"animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 text-current\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n              fill=\"none\"\n              viewBox=\"0 0 24 24\"\n              aria-hidden=\"true\"\n            >\n              <circle\n                className=\"opacity-25\"\n                cx=\"12\"\n                cy=\"12\"\n                r=\"10\"\n                stroke=\"currentColor\"\n                strokeWidth=\"3\"\n              />\n              <path\n                className=\"opacity-75\"\n                fill=\"currentColor\"\n                d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"\n              />\n            </svg>\n            <span>Processing</span>\n          </>\n        ) : (\n          <>\n            {leftIcon && <span className=\"inline-flex shrink-0 opacity-80\">{leftIcon}</span>}\n            {children}\n            {rightIcon && <span className=\"inline-flex shrink-0 opacity-80\">{rightIcon}</span>}\n          </>\n        )}\n      </button>\n    );\n  }\n);\n\nButton.displayName = \"Button\";\n"
      }
    ]
  },
  "input": {
    "name": "input",
    "category": "Forms & Inputs",
    "title": "Input",
    "description": "Text field with start and end icon slots, labels, helper text, and error validation states.",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Input } from \"@/components/ui/input\";\nimport { Search } from \"lucide-react\";\n\nexport function InputDemo() {\n  return (\n    <Input\n      label=\"Project File\"\n      placeholder=\"e.g. package.json\"\n      startIcon={<Search className=\"h-4 w-4\" />}\n      helperText=\"Specify relative path to file\"\n    />\n  );\n}",
    "props": [
      {
        "name": "label",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Field label rendered above the input."
      },
      {
        "name": "error",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Validation error message that triggers error state styling."
      },
      {
        "name": "helperText",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Supplementary context or instructions below the input."
      },
      {
        "name": "startIcon",
        "type": "React.ReactNode",
        "defaultValue": "undefined",
        "description": "Icon slot positioned inside the left edge."
      },
      {
        "name": "endIcon",
        "type": "React.ReactNode",
        "defaultValue": "undefined",
        "description": "Icon slot positioned inside the right edge."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Disables interaction and dims the field."
      },
      {
        "name": "placeholder",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Placeholder text rendered when empty."
      }
    ],
    "files": [
      {
        "name": "input.tsx",
        "type": "components:ui",
        "content": "import * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport interface InputProps\n  extends React.InputHTMLAttributes<HTMLInputElement> {\n  label?: string;\n  helperText?: string;\n  error?: string;\n  startIcon?: React.ReactNode;\n  endIcon?: React.ReactNode;\n}\n\nexport const Input = React.forwardRef<HTMLInputElement, InputProps>(\n  (\n    {\n      className,\n      type = \"text\",\n      label,\n      helperText,\n      error,\n      startIcon,\n      endIcon,\n      disabled,\n      id,\n      ...props\n    },\n    ref\n  ) => {\n    const generatedId = React.useId();\n    const inputId = id || generatedId;\n\n    return (\n      <div className=\"w-full space-y-1 text-left\">\n        {label && (\n          <label\n            htmlFor={inputId}\n            className=\"block text-xs font-medium text-[var(--text-secondary)]\"\n          >\n            {label}\n          </label>\n        )}\n        <div className=\"relative flex items-center\">\n          {startIcon && (\n            <div className=\"pointer-events-none absolute left-2.5 flex items-center justify-center text-[var(--text-muted)]\">\n              {startIcon}\n            </div>\n          )}\n          <input\n            id={inputId}\n            type={type}\n            ref={ref}\n            disabled={disabled}\n            className={cn(\n              \"flex h-8 w-full rounded border border-[var(--border)] bg-[var(--bg-main)] px-2.5 py-1 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors\",\n              \"focus-visible:outline-none focus-visible:border-[var(--accent-green)] focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]\",\n              \"disabled:cursor-not-allowed disabled:opacity-40\",\n              startIcon && \"pl-8\",\n              endIcon && \"pr-8\",\n              error &&\n                \"border-[var(--accent-red)] focus-visible:border-[var(--accent-red)] focus-visible:ring-[var(--accent-red)]\",\n              className\n            )}\n            {...props}\n          />\n          {endIcon && (\n            <div className=\"absolute right-2.5 flex items-center justify-center text-[var(--text-muted)]\">\n              {endIcon}\n            </div>\n          )}\n        </div>\n        {error ? (\n          <p className=\"text-[11px] text-[var(--accent-red)]\">{error}</p>\n        ) : helperText ? (\n          <p className=\"text-[11px] text-[var(--text-muted)]\">{helperText}</p>\n        ) : null}\n      </div>\n    );\n  }\n);\nInput.displayName = \"Input\";\n"
      }
    ]
  },
  "switch": {
    "name": "switch",
    "category": "Forms & Inputs",
    "title": "Switch",
    "description": "Accessible toggle switch with green accent active state, labels, and description.",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Switch } from \"@/components/ui/switch\";\nimport * as React from \"react\";\n\nexport function SwitchDemo() {\n  const [enabled, setEnabled] = React.useState(true);\n\n  return (\n    <Switch\n      label=\"Turbo Cache\"\n      description=\"Store compiled assets in local disk\"\n      checked={enabled}\n      onCheckedChange={setEnabled}\n    />\n  );\n}",
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": true,
        "description": "Controlled toggle switch state."
      },
      {
        "name": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": true,
        "description": "Callback invoked when toggle state changes."
      },
      {
        "name": "label",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Primary title rendered next to the switch."
      },
      {
        "name": "description",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Optional description caption beneath the label."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Disables toggle interaction."
      }
    ],
    "files": [
      {
        "name": "switch.tsx",
        "type": "components:ui",
        "content": "import * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport interface SwitchProps\n  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"onChange\"> {\n  checked?: boolean;\n  defaultChecked?: boolean;\n  onCheckedChange?: (checked: boolean) => void;\n  label?: string;\n  description?: string;\n}\n\nexport const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(\n  (\n    {\n      checked: controlledChecked,\n      defaultChecked = false,\n      onCheckedChange,\n      label,\n      description,\n      disabled = false,\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    const [uncontrolledChecked, setUncontrolledChecked] =\n      React.useState(defaultChecked);\n    const isControlled = controlledChecked !== undefined;\n    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;\n\n    const toggle = () => {\n      if (disabled) return;\n      const next = !isChecked;\n      if (!isControlled) {\n        setUncontrolledChecked(next);\n      }\n      onCheckedChange?.(next);\n    };\n\n    return (\n      <div className=\"flex items-center justify-between gap-3 select-none\">\n        {(label || description) && (\n          <div className=\"flex flex-col text-left\">\n            {label && (\n              <span\n                onClick={toggle}\n                className={cn(\n                  \"text-xs font-medium text-[var(--text-primary)] cursor-pointer\",\n                  disabled && \"opacity-40 cursor-not-allowed\"\n                )}\n              >\n                {label}\n              </span>\n            )}\n            {description && (\n              <span className=\"text-[11px] text-[var(--text-muted)]\">\n                {description}\n              </span>\n            )}\n          </div>\n        )}\n        <button\n          type=\"button\"\n          role=\"switch\"\n          aria-checked={isChecked}\n          ref={ref}\n          disabled={disabled}\n          onClick={toggle}\n          className={cn(\n            \"relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-150 ease-in-out\",\n            \"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]\",\n            \"disabled:cursor-not-allowed disabled:opacity-40\",\n            isChecked\n              ? \"bg-[var(--accent-green)]\"\n              : \"bg-[var(--surface-secondary)] border-[var(--border)]\",\n            className\n          )}\n          {...props}\n        >\n          <span\n            className={cn(\n              \"pointer-events-none inline-block h-4 w-4 transform rounded-full shadow transition duration-150 ease-in-out\",\n              isChecked\n                ? \"translate-x-4 bg-[var(--bg-main)]\"\n                : \"translate-x-0.5 bg-[var(--text-muted)]\"\n            )}\n          />\n        </button>\n      </div>\n    );\n  }\n);\n\nSwitch.displayName = \"Switch\";\n"
      }
    ]
  },
  "dialog": {
    "name": "dialog",
    "category": "Overlays",
    "title": "Dialog",
    "description": "Modal dialog primitive with accessible focus management, portal rendering, backdrop blur, and escape key handling.",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import {\n  Dialog,\n  DialogTrigger,\n  DialogContent,\n  DialogHeader,\n  DialogTitle,\n  DialogDescription,\n  DialogFooter,\n} from \"@/components/ui/dialog\";\nimport { Button } from \"@/components/ui/button\";\n\nexport function DialogDemo() {\n  return (\n    <Dialog>\n      <DialogTrigger asChild>\n        <Button variant=\"accent\">Open Dialog</Button>\n      </DialogTrigger>\n      <DialogContent>\n        <DialogHeader>\n          <DialogTitle>Deploy Revision #104</DialogTitle>\n          <DialogDescription>\n            Are you sure you want to promote this build to production?\n          </DialogDescription>\n        </DialogHeader>\n        <div className=\"py-2 text-xs text-muted\">\n          Active connections will receive the updated worker bundle.\n        </div>\n        <DialogFooter>\n          <Button variant=\"secondary\">Cancel</Button>\n          <Button variant=\"accent\">Confirm Deploy</Button>\n        </DialogFooter>\n      </DialogContent>\n    </Dialog>\n  );\n}",
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "defaultValue": "undefined",
        "description": "Controlled open state of the modal dialog."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "defaultValue": "undefined",
        "description": "Callback invoked when modal opens or closes."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "DialogTrigger, DialogContent, and sub-elements."
      }
    ],
    "files": [
      {
        "name": "dialog.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { cn } from \"../lib/utils\";\n\nexport interface DialogProps {\n  open?: boolean;\n  onOpenChange?: (open: boolean) => void;\n  children: React.ReactNode;\n}\n\ninterface DialogContextType {\n  open: boolean;\n  setOpen: (open: boolean) => void;\n}\n\nconst DialogContext = React.createContext<DialogContextType | null>(null);\n\nexport function useDialog() {\n  const context = React.useContext(DialogContext);\n  if (!context) {\n    throw new Error(\"Dialog components must be used within a <Dialog />\");\n  }\n  return context;\n}\n\nexport function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {\n  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);\n  const isControlled = controlledOpen !== undefined;\n  const open = isControlled ? controlledOpen : uncontrolledOpen;\n\n  const setOpen = React.useCallback(\n    (newOpen: boolean) => {\n      if (!isControlled) {\n        setUncontrolledOpen(newOpen);\n      }\n      onOpenChange?.(newOpen);\n    },\n    [isControlled, onOpenChange]\n  );\n\n  return (\n    <DialogContext.Provider value={{ open, setOpen }}>\n      {children}\n    </DialogContext.Provider>\n  );\n}\n\nexport function DialogTrigger({\n  children,\n  className,\n  asChild = false,\n  ...props\n}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {\n  const { setOpen } = useDialog();\n\n  if (asChild && React.isValidElement(children)) {\n    const child = children as React.ReactElement<{\n      onClick?: (e: React.MouseEvent) => void;\n      className?: string;\n    }>;\n    return React.cloneElement(child, {\n      onClick: (e: React.MouseEvent) => {\n        e.stopPropagation();\n        child.props?.onClick?.(e);\n        setOpen(true);\n      },\n    });\n  }\n\n  return (\n    <button\n      type=\"button\"\n      onClick={(e) => {\n        e.stopPropagation();\n        setOpen(true);\n      }}\n      className={className}\n      {...props}\n    >\n      {children}\n    </button>\n  );\n}\n\nexport function DialogContent({\n  children,\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  const { open, setOpen } = useDialog();\n  const [mounted, setMounted] = React.useState(false);\n  const contentRef = React.useRef<HTMLDivElement>(null);\n\n  React.useEffect(() => {\n    setMounted(true);\n  }, []);\n\n  // Close on Escape key\n  React.useEffect(() => {\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\" && open) {\n        setOpen(false);\n      }\n    };\n    if (open) {\n      window.addEventListener(\"keydown\", handleKeyDown);\n      document.body.style.overflow = \"hidden\";\n    }\n    return () => {\n      window.removeEventListener(\"keydown\", handleKeyDown);\n      document.body.style.overflow = \"unset\";\n    };\n  }, [open, setOpen]);\n\n  if (!open || !mounted) return null;\n\n  return createPortal(\n    <div\n      role=\"dialog\"\n      aria-modal=\"true\"\n      className=\"fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200\"\n      onClick={(e) => e.stopPropagation()}\n    >\n      {/* Backdrop */}\n      <div\n        onClick={() => setOpen(false)}\n        className=\"fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity\"\n      />\n\n      {/* Modal Dialog Content - Dark, neutral, precise border */}\n      <div\n        ref={contentRef}\n        onClick={(e) => e.stopPropagation()}\n        className={cn(\n          \"relative z-[10000] w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-[var(--text-primary)] shadow-2xl transition-all animate-in zoom-in-95 duration-200\",\n          className\n        )}\n        {...props}\n      >\n        {children}\n        <button\n          type=\"button\"\n          onClick={() => setOpen(false)}\n          className=\"absolute right-4 top-4 rounded p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer\"\n          aria-label=\"Close dialog\"\n        >\n          <svg\n            className=\"h-4 w-4\"\n            fill=\"none\"\n            viewBox=\"0 0 24 24\"\n            stroke=\"currentColor\"\n            strokeWidth={1.5}\n          >\n            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\" />\n          </svg>\n        </button>\n      </div>\n    </div>,\n    document.body\n  );\n}\n\nexport function DialogHeader({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  return (\n    <div\n      className={cn(\"flex flex-col space-y-1.5 text-left mb-4\", className)}\n      {...props}\n    />\n  );\n}\n\nexport function DialogTitle({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLHeadingElement>) {\n  return (\n    <h2\n      className={cn(\n        \"text-base font-semibold tracking-tight text-[var(--text-primary)]\",\n        className\n      )}\n      {...props}\n    />\n  );\n}\n\nexport function DialogDescription({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLParagraphElement>) {\n  return (\n    <p\n      className={cn(\"text-xs text-[var(--text-secondary)] mt-1 leading-relaxed\", className)}\n      {...props}\n    />\n  );\n}\n\nexport function DialogFooter({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  return (\n    <div\n      className={cn(\n        \"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0 pt-4 border-t border-[var(--border)]\",\n        className\n      )}\n      {...props}\n    />\n  );\n}\n"
      }
    ]
  },
  "badge": {
    "name": "badge",
    "category": "Data Display",
    "title": "Badge",
    "description": "Compact status indicator with pulsating dot option, pill variants, and semantic color treatments.",
    "variants": [
      "default",
      "secondary",
      "outline",
      "success",
      "destructive",
      "muted"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Badge } from \"@/components/ui/badge\";\n\nexport function BadgeDemo() {\n  return (\n    <div className=\"flex items-center gap-2\">\n      <Badge variant=\"accent\" dot>Operational</Badge>\n      <Badge variant=\"secondary\">v0.1.0</Badge>\n      <Badge variant=\"destructive\">Failed</Badge>\n    </div>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'default' | 'secondary' | 'outline' | 'success' | 'destructive' | 'muted'",
        "defaultValue": "'default'",
        "description": "Semantic color treatment and shape."
      },
      {
        "name": "dot",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Displays a pulsating real-time status indicator."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Text or badge content."
      }
    ],
    "files": [
      {
        "name": "badge.tsx",
        "type": "components:ui",
        "content": "import * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {\n  variant?: \"default\" | \"secondary\" | \"outline\" | \"success\" | \"destructive\" | \"muted\";\n  size?: \"sm\" | \"default\";\n  dot?: boolean;\n}\n\nconst badgeVariants: Record<NonNullable<BadgeProps[\"variant\"]>, string> = {\n  default:\n    \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border-[var(--border)]\",\n  secondary:\n    \"bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border)]\",\n  outline:\n    \"bg-transparent text-[var(--text-secondary)] border-[var(--border)]\",\n  success:\n    \"bg-[var(--accent-green-subtle)] text-[var(--accent-green)] border-[var(--accent-green)]/30\",\n  destructive:\n    \"bg-[var(--accent-red-subtle)] text-[var(--accent-red)] border-[var(--accent-red)]/30\",\n  muted:\n    \"bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)]\",\n};\n\nconst dotColors: Record<NonNullable<BadgeProps[\"variant\"]>, string> = {\n  default: \"bg-[var(--text-secondary)]\",\n  secondary: \"bg-[var(--text-muted)]\",\n  outline: \"bg-[var(--text-muted)]\",\n  success: \"bg-[var(--accent-green)]\",\n  destructive: \"bg-[var(--accent-red)]\",\n  muted: \"bg-[var(--text-muted)]\",\n};\n\nconst badgeSizes: Record<NonNullable<BadgeProps[\"size\"]>, string> = {\n  sm: \"px-1.5 py-0.5 text-[10px] font-mono\",\n  default: \"px-2 py-0.5 text-xs font-mono\",\n};\n\nexport function Badge({\n  className,\n  variant = \"default\",\n  size = \"default\",\n  dot = false,\n  children,\n  ...props\n}: BadgeProps) {\n  return (\n    <div\n      className={cn(\n        \"inline-flex items-center gap-1.5 rounded border select-none tracking-tight leading-none\",\n        badgeVariants[variant],\n        badgeSizes[size],\n        className\n      )}\n      {...props}\n    >\n      {dot && (\n        <span\n          className={cn(\n            \"inline-block h-1.5 w-1.5 rounded-full shrink-0\",\n            dotColors[variant]\n          )}\n        />\n      )}\n      {children}\n    </div>\n  );\n}\n"
      }
    ]
  },
  "card": {
    "name": "card",
    "category": "Data Display",
    "title": "Card",
    "description": "Container primitive with structured header, content, and footer slots, plus hover elevation physics.",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n} from \"@/components/ui/card\";\nimport { Button } from \"@/components/ui/button\";\n\nexport function CardDemo() {\n  return (\n    <Card hoverEffect className=\"w-80\">\n      <CardHeader>\n        <CardTitle>Edge Worker</CardTitle>\n        <CardDescription>Serverless runtime node</CardDescription>\n      </CardHeader>\n      <CardContent>\n        <p className=\"text-xs text-[var(--text-secondary)]\">\n          99.99% uptime recorded across 24 regions.\n        </p>\n      </CardContent>\n      <CardFooter>\n        <Button variant=\"outline\" size=\"sm\">Inspect Logs</Button>\n      </CardFooter>\n    </Card>\n  );\n}",
    "props": [
      {
        "name": "hoverEffect",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Enables subtle vertical elevation and border hover highlight."
      },
      {
        "name": "className",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Additional Tailwind CSS classes."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "CardHeader, CardTitle, CardContent, CardFooter."
      }
    ],
    "files": [
      {
        "name": "card.tsx",
        "type": "components:ui",
        "content": "import * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport interface CardProps extends React.HTMLAttributes<HTMLDivElement> {\n  variant?: \"default\" | \"nested\" | \"interactive\";\n}\n\nexport const Card = React.forwardRef<HTMLDivElement, CardProps>(\n  ({ className, variant = \"default\", ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          \"rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] transition-colors\",\n          variant === \"nested\" && \"bg-[var(--surface-secondary)] border-[var(--border-subtle)]\",\n          variant === \"interactive\" &&\n            \"hover:border-[var(--text-muted)] cursor-pointer\",\n          className\n        )}\n        {...props}\n      />\n    );\n  }\n);\nCard.displayName = \"Card\";\n\nexport const CardHeader = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div\n    ref={ref}\n    className={cn(\"flex flex-col space-y-1 p-5\", className)}\n    {...props}\n  />\n));\nCardHeader.displayName = \"CardHeader\";\n\nexport const CardTitle = React.forwardRef<\n  HTMLHeadingElement,\n  React.HTMLAttributes<HTMLHeadingElement>\n>(({ className, ...props }, ref) => (\n  <h3\n    ref={ref}\n    className={cn(\n      \"font-medium leading-none tracking-tight text-sm text-[var(--text-primary)]\",\n      className\n    )}\n    {...props}\n  />\n));\nCardTitle.displayName = \"CardTitle\";\n\nexport const CardDescription = React.forwardRef<\n  HTMLParagraphElement,\n  React.HTMLAttributes<HTMLParagraphElement>\n>(({ className, ...props }, ref) => (\n  <p\n    ref={ref}\n    className={cn(\"text-xs text-[var(--text-secondary)] leading-relaxed mt-1\", className)}\n    {...props}\n  />\n));\nCardDescription.displayName = \"CardDescription\";\n\nexport const CardContent = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div ref={ref} className={cn(\"p-5 pt-0 text-xs\", className)} {...props} />\n));\nCardContent.displayName = \"CardContent\";\n\nexport const CardFooter = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement>\n>(({ className, ...props }, ref) => (\n  <div\n    ref={ref}\n    className={cn(\"flex items-center p-5 pt-0 border-t border-[var(--border-subtle)] mt-4\", className)}\n    {...props}\n  />\n));\nCardFooter.displayName = \"CardFooter\";\n"
      }
    ]
  },
  "tabs": {
    "name": "tabs",
    "category": "Navigation",
    "title": "Tabs",
    "description": "Segmented tab controls with keyboard arrow navigation and responsive layout.",
    "variants": [
      "default",
      "slide"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Tabs, TabsList, TabsTrigger, TabsContent } from \"@/components/ui/tabs\";\n\nexport function TabsDemo() {\n  return (\n    <Tabs defaultValue=\"overview\">\n      <TabsList>\n        <TabsTrigger value=\"overview\">Overview</TabsTrigger>\n        <TabsTrigger value=\"metrics\">Metrics</TabsTrigger>\n        <TabsTrigger value=\"logs\">Logs</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\">\n        <p className=\"text-xs p-3 text-[var(--text-secondary)]\">Cluster healthy</p>\n      </TabsContent>\n      <TabsContent value=\"metrics\">\n        <p className=\"text-xs p-3 text-[var(--text-secondary)]\">CPU: 14%</p>\n      </TabsContent>\n      <TabsContent value=\"logs\">\n        <p className=\"text-xs p-3 text-[var(--text-secondary)]\">Listening on 0.0.0.0:3000</p>\n      </TabsContent>\n    </Tabs>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "\x27default\x27 | \x27slide\x27",
        "defaultValue": "\x27default\x27",
        "description": "Visual and interaction style: \x27default\x27 standard tabs, or \x27slide\x27 with fluid spring active indicator and sliding panels."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Default active tab for uncontrolled usage."
      },
      {
        "name": "value",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Controlled active tab key."
      },
      {
        "name": "onValueChange",
        "type": "(value: string) => void",
        "defaultValue": "undefined",
        "description": "Event fired on tab selection change."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "TabsList, TabsTrigger, and TabsContent components."
      }
    ],
    "files": [
      {
        "name": "tabs.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport type TabsVariant = \"default\" | \"slide\";\n\ninterface TabsContextType {\n  value: string;\n  onValueChange: (val: string) => void;\n  variant: TabsVariant;\n  direction: number; // 1 = moving right, -1 = moving left, 0 = neutral\n  tabOrder: string[];\n  registerTab: (val: string) => void;\n  unregisterTab: (val: string) => void;\n}\n\nconst TabsContext = React.createContext<TabsContextType | null>(null);\n\nexport function useTabs() {\n  const context = React.useContext(TabsContext);\n  if (!context) {\n    throw new Error(\"Tabs components must be used within a <Tabs />\");\n  }\n  return context;\n}\n\nexport interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {\n  value?: string;\n  defaultValue?: string;\n  onValueChange?: (value: string) => void;\n  variant?: TabsVariant;\n}\n\nexport function Tabs({\n  value: controlledValue,\n  defaultValue = \"\",\n  onValueChange,\n  variant = \"default\",\n  className,\n  children,\n  ...props\n}: TabsProps) {\n  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);\n  const isControlled = controlledValue !== undefined;\n  const value = isControlled ? controlledValue : uncontrolledValue;\n\n  const [tabOrder, setTabOrder] = React.useState<string[]>([]);\n  const [direction, setDirection] = React.useState<number>(0);\n  const prevValueRef = React.useRef(value);\n\n  const registerTab = React.useCallback((tabVal: string) => {\n    setTabOrder((prev) => (prev.includes(tabVal) ? prev : [...prev, tabVal]));\n  }, []);\n\n  const unregisterTab = React.useCallback((tabVal: string) => {\n    setTabOrder((prev) => prev.filter((t) => t !== tabVal));\n  }, []);\n\n  React.useEffect(() => {\n    if (prevValueRef.current !== value) {\n      const prevIdx = tabOrder.indexOf(prevValueRef.current);\n      const curIdx = tabOrder.indexOf(value);\n      if (prevIdx !== -1 && curIdx !== -1) {\n        setDirection(curIdx > prevIdx ? 1 : -1);\n      }\n      prevValueRef.current = value;\n    }\n  }, [value, tabOrder]);\n\n  const handleValueChange = (newVal: string) => {\n    const prevIdx = tabOrder.indexOf(value);\n    const curIdx = tabOrder.indexOf(newVal);\n    if (prevIdx !== -1 && curIdx !== -1) {\n      setDirection(curIdx > prevIdx ? 1 : -1);\n    }\n    if (!isControlled) {\n      setUncontrolledValue(newVal);\n    }\n    onValueChange?.(newVal);\n  };\n\n  return (\n    <TabsContext.Provider\n      value={{\n        value,\n        onValueChange: handleValueChange,\n        variant,\n        direction,\n        tabOrder,\n        registerTab,\n        unregisterTab,\n      }}\n    >\n      <div\n        className={cn(\n          \"w-full flex flex-col\",\n          variant === \"slide\" && \"relative overflow-x-clip\",\n          className\n        )}\n        {...props}\n      >\n        {children}\n      </div>\n    </TabsContext.Provider>\n  );\n}\n\nexport interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {\n  variant?: TabsVariant;\n}\n\nexport function TabsList({\n  variant: listVariantOverride,\n  className,\n  children,\n  ...props\n}: TabsListProps) {\n  const { value, variant: contextVariant } = useTabs();\n  const variant = listVariantOverride || contextVariant;\n\n  const listRef = React.useRef<HTMLDivElement>(null);\n  const [indicatorStyle, setIndicatorStyle] = React.useState<{\n    left: number;\n    width: number;\n    height: number;\n    top: number;\n  } | null>(null);\n\n  const updateIndicator = React.useCallback(() => {\n    if (!listRef.current) return;\n    const activeTrigger = listRef.current.querySelector<HTMLElement>(\n      '[role=\"tab\"][aria-selected=\"true\"]'\n    );\n    if (activeTrigger) {\n      const listRect = listRef.current.getBoundingClientRect();\n      const triggerRect = activeTrigger.getBoundingClientRect();\n      setIndicatorStyle({\n        left: triggerRect.left - listRect.left,\n        width: triggerRect.width,\n        height: triggerRect.height,\n        top: triggerRect.top - listRect.top,\n      });\n    } else {\n      setIndicatorStyle(null);\n    }\n  }, []);\n\n  React.useEffect(() => {\n    updateIndicator();\n    const handleResize = () => updateIndicator();\n    window.addEventListener(\"resize\", handleResize);\n    return () => window.removeEventListener(\"resize\", handleResize);\n  }, [value, updateIndicator]);\n\n  return (\n    <div\n      ref={listRef}\n      role=\"tablist\"\n      className={cn(\n        \"relative inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text-muted)] select-none\",\n        className\n      )}\n      {...props}\n    >\n      {/* Sliding Active Pill Indicator */}\n      {variant === \"slide\" && indicatorStyle && (\n        <span\n          aria-hidden=\"true\"\n          className=\"absolute rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] shadow-xs pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]\"\n          style={{\n            transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,\n            width: `${indicatorStyle.width}px`,\n            height: `${indicatorStyle.height}px`,\n            left: 0,\n            top: 0,\n          }}\n        />\n      )}\n      {children}\n    </div>\n  );\n}\n\nexport interface TabsTriggerProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  value: string;\n}\n\nexport function TabsTrigger({\n  value: triggerValue,\n  className,\n  children,\n  ...props\n}: TabsTriggerProps) {\n  const { value, onValueChange, variant, registerTab, unregisterTab } = useTabs();\n  const isSelected = value === triggerValue;\n\n  React.useEffect(() => {\n    registerTab(triggerValue);\n    return () => unregisterTab(triggerValue);\n  }, [triggerValue, registerTab, unregisterTab]);\n\n  return (\n    <button\n      type=\"button\"\n      role=\"tab\"\n      aria-selected={isSelected}\n      onClick={() => onValueChange(triggerValue)}\n      className={cn(\n        \"relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 text-xs font-medium transition-colors select-none cursor-pointer\",\n        \"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)]\",\n        variant === \"slide\"\n          ? isSelected\n            ? \"text-[var(--text-primary)] font-semibold\"\n            : \"text-[var(--text-muted)] hover:text-[var(--text-primary)]\"\n          : isSelected\n          ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-xs\"\n          : \"hover:text-[var(--text-primary)]\",\n        className\n      )}\n      {...props}\n    >\n      {children}\n    </button>\n  );\n}\n\nexport interface TabsContentProps\n  extends React.HTMLAttributes<HTMLDivElement> {\n  value: string;\n}\n\nexport function TabsContent({\n  value: contentValue,\n  className,\n  children,\n  ...props\n}: TabsContentProps) {\n  const { value, variant, direction } = useTabs();\n  const isSelected = value === contentValue;\n\n  if (variant === \"slide\") {\n    return (\n      <div\n        role=\"tabpanel\"\n        tabIndex={0}\n        aria-hidden={!isSelected}\n        className={cn(\n          \"w-full focus-visible:outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity]\",\n          isSelected\n            ? \"opacity-100 translate-x-0 relative pointer-events-auto\"\n            : direction >= 0\n            ? \"opacity-0 -translate-x-6 absolute top-0 left-0 right-0 pointer-events-none invisible\"\n            : \"opacity-0 translate-x-6 absolute top-0 left-0 right-0 pointer-events-none invisible\",\n          className\n        )}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n\n  if (!isSelected) return null;\n\n  return (\n    <div\n      role=\"tabpanel\"\n      tabIndex={0}\n      className={cn(\"mt-3 focus-visible:outline-none text-xs\", className)}\n      {...props}\n    >\n      {children}\n    </div>\n  );\n}\n"
      }
    ]
  },
  "accordion": {
    "name": "accordion",
    "category": "Navigation",
    "title": "Accordion",
    "description": "Collapsible disclosure items with animated height expansion and single or multiple mode support.",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import {\n  Accordion,\n  AccordionItem,\n  AccordionTrigger,\n  AccordionContent,\n} from \"@/components/ui/accordion\";\n\nexport function AccordionDemo() {\n  return (\n    <Accordion type=\"single\" collapsible defaultValue=\"item-1\">\n      <AccordionItem value=\"item-1\">\n        <AccordionTrigger>How does component distribution work?</AccordionTrigger>\n        <AccordionContent>\n          kiloUI provides standard shadcn-compatible JSON metadata endpoints.\n        </AccordionContent>\n      </AccordionItem>\n      <AccordionItem value=\"item-2\">\n        <AccordionTrigger>Can I customize colors?</AccordionTrigger>\n        <AccordionContent>\n          Yes, all styles rely on CSS design variables like --accent-green and --bg-main.\n        </AccordionContent>\n      </AccordionItem>\n    </Accordion>\n  );\n}",
    "props": [
      {
        "name": "type",
        "type": "'single' | 'multiple'",
        "defaultValue": "'single'",
        "description": "Determines whether one or multiple sections can be open simultaneously."
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Allows closing an active section by clicking it again."
      },
      {
        "name": "defaultValue",
        "type": "string | string[]",
        "defaultValue": "undefined",
        "description": "Initially expanded item value(s)."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "AccordionItem, AccordionTrigger, AccordionContent."
      }
    ],
    "files": [
      {
        "name": "accordion.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\ninterface AccordionContextType {\n  openItems: string[];\n  toggleItem: (value: string) => void;\n}\n\nconst AccordionContext = React.createContext<AccordionContextType | null>(null);\n\nexport interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {\n  type?: \"single\" | \"multiple\";\n  defaultValue?: string | string[];\n}\n\nexport function Accordion({\n  type = \"single\",\n  defaultValue,\n  className,\n  children,\n  ...props\n}: AccordionProps) {\n  const [openItems, setOpenItems] = React.useState<string[]>(() => {\n    if (!defaultValue) return [];\n    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];\n  });\n\n  const toggleItem = React.useCallback(\n    (value: string) => {\n      setOpenItems((prev) => {\n        if (type === \"single\") {\n          return prev.includes(value) ? [] : [value];\n        }\n        return prev.includes(value)\n          ? prev.filter((item) => item !== value)\n          : [...prev, value];\n      });\n    },\n    [type]\n  );\n\n  return (\n    <AccordionContext.Provider value={{ openItems, toggleItem }}>\n      <div className={cn(\"divide-y divide-[var(--border)] border-y border-[var(--border)]\", className)} {...props}>\n        {children}\n      </div>\n    </AccordionContext.Provider>\n  );\n}\n\nconst AccordionItemContext = React.createContext<{ value: string } | null>(null);\n\nexport function AccordionItem({\n  value,\n  className,\n  children,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {\n  return (\n    <AccordionItemContext.Provider value={{ value }}>\n      <div className={cn(\"py-1\", className)} {...props}>\n        {children}\n      </div>\n    </AccordionItemContext.Provider>\n  );\n}\n\nexport function AccordionTrigger({\n  className,\n  children,\n  ...props\n}: React.ButtonHTMLAttributes<HTMLButtonElement>) {\n  const accordion = React.useContext(AccordionContext);\n  const item = React.useContext(AccordionItemContext);\n\n  if (!accordion || !item) {\n    throw new Error(\"AccordionTrigger must be used within AccordionItem\");\n  }\n\n  const isOpen = accordion.openItems.includes(item.value);\n\n  return (\n    <button\n      type=\"button\"\n      onClick={() => accordion.toggleItem(item.value)}\n      aria-expanded={isOpen}\n      className={cn(\n        \"flex w-full items-center justify-between py-2.5 text-left text-xs font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent-green)]\",\n        className\n      )}\n      {...props}\n    >\n      <span>{children}</span>\n      <svg\n        className={cn(\n          \"h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200\",\n          isOpen && \"rotate-180 text-[var(--accent-green)]\"\n        )}\n        fill=\"none\"\n        viewBox=\"0 0 24 24\"\n        stroke=\"currentColor\"\n        strokeWidth={2}\n      >\n        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M19 9l-7 7-7-7\" />\n      </svg>\n    </button>\n  );\n}\n\nexport function AccordionContent({\n  className,\n  children,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  const accordion = React.useContext(AccordionContext);\n  const item = React.useContext(AccordionItemContext);\n\n  if (!accordion || !item) {\n    throw new Error(\"AccordionContent must be used within AccordionItem\");\n  }\n\n  const isOpen = accordion.openItems.includes(item.value);\n\n  if (!isOpen) return null;\n\n  return (\n    <div\n      className={cn(\"pb-3 text-xs text-[var(--text-secondary)] leading-relaxed\", className)}\n      {...props}\n    >\n      {children}\n    </div>\n  );\n}\n"
      }
    ]
  },
  "stat-card": {
    "name": "stat-card",
    "category": "Data Display",
    "title": "Stat Card",
    "description": "Metric card displaying quantitative value, percentage delta, trend indicator, and live SVG sparkline.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { StatCard } from \"@/components/ui/stat-card\";\n\nexport function StatCardDemo() {\n  return (\n    <StatCard\n      title=\"Active Registry Installs\"\n      value=\"128,400\"\n      change=\"+14.2%\"\n      trend=\"up\"\n      caption=\"vs last 30 days\"\n      chartData={[20, 35, 45, 40, 60, 75, 85, 95]}\n    />\n  );\n}",
    "props": [
      {
        "name": "title",
        "type": "string",
        "defaultValue": "'Metric'",
        "description": "Label describing the statistical metric."
      },
      {
        "name": "value",
        "type": "string | number",
        "required": true,
        "description": "Primary numerical metric value."
      },
      {
        "name": "change",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Percentage or delta text (e.g. '+14.2%')."
      },
      {
        "name": "trend",
        "type": "'up' | 'down' | 'neutral'",
        "defaultValue": "'up'",
        "description": "Trend direction controlling status accent colors."
      },
      {
        "name": "caption",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Supplementary caption (e.g. 'vs last month')."
      },
      {
        "name": "chartData",
        "type": "number[]",
        "defaultValue": "undefined",
        "description": "Array of numeric values rendered as an SVG sparkline."
      }
    ],
    "files": [
      {
        "name": "stat-card.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { TrendingUp, TrendingDown, ArrowUpRight } from \"lucide-react\";\nimport { cn } from \"../lib/utils\";\n\nexport interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {\n  title: string;\n  value: string | number;\n  change?: string;\n  trend?: \"up\" | \"down\" | \"neutral\";\n  caption?: string;\n  sparkline?: number[];\n  badge?: string;\n}\n\nexport function StatCard({\n  title,\n  value,\n  change,\n  trend = \"neutral\",\n  caption,\n  sparkline = [4, 7, 5, 8, 12, 10, 15, 14, 18],\n  badge,\n  className,\n  ...props\n}: StatCardProps) {\n  const minVal = Math.min(...sparkline);\n  const maxVal = Math.max(...sparkline);\n  const range = maxVal - minVal || 1;\n\n  // Build clean SVG polyline points\n  const points = sparkline\n    .map((val, idx) => {\n      const x = (idx / (sparkline.length - 1)) * 120;\n      const y = 32 - ((val - minVal) / range) * 24;\n      return `${x.toFixed(1)},${y.toFixed(1)}`;\n    })\n    .join(\" \");\n\n  return (\n    <div\n      className={cn(\n        \"rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--text-muted)]\",\n        className\n      )}\n      {...props}\n    >\n      <div className=\"flex items-center justify-between pb-2\">\n        <span className=\"text-xs font-medium text-[var(--text-secondary)]\">{title}</span>\n        {badge && (\n          <span className=\"rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]\">\n            {badge}\n          </span>\n        )}\n      </div>\n\n      <div className=\"flex items-baseline justify-between gap-4\">\n        <div>\n          <div className=\"text-2xl font-mono font-semibold tracking-tight text-[var(--text-primary)]\">\n            {value}\n          </div>\n          {change && (\n            <div className=\"flex items-center gap-1 pt-1 text-xs font-mono\">\n              {trend === \"up\" && <TrendingUp className=\"h-3.5 w-3.5 text-[var(--accent-green)]\" />}\n              {trend === \"down\" && <TrendingDown className=\"h-3.5 w-3.5 text-rose-500\" />}\n              <span\n                className={\n                  trend === \"up\"\n                    ? \"text-[var(--accent-green)] font-medium\"\n                    : trend === \"down\"\n                    ? \"text-rose-500 font-medium\"\n                    : \"text-[var(--text-muted)]\"\n                }\n              >\n                {change}\n              </span>\n              {caption && <span className=\"text-[var(--text-muted)] ml-1\">{caption}</span>}\n            </div>\n          )}\n        </div>\n\n        {/* Dynamic Vector Sparkline */}\n        <div className=\"w-24 h-8 shrink-0\">\n          <svg viewBox=\"0 0 120 32\" className=\"w-full h-full overflow-visible\">\n            <polyline\n              fill=\"none\"\n              stroke={trend === \"up\" ? \"var(--accent-green)\" : \"var(--text-muted)\"}\n              strokeWidth=\"1.75\"\n              strokeLinecap=\"round\"\n              strokeLinejoin=\"round\"\n              points={points}\n            />\n          </svg>\n        </div>\n      </div>\n    </div>\n  );\n}\n"
      }
    ]
  },
  "sidebar": {
    "name": "sidebar",
    "category": "Navigation",
    "title": "Sidebar",
    "description": "Production-grade navigation sidebar with collapse physics (⌘B), white-by-default icons, and mobile drawer.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils",
      "vector-icons"
    ],
    "usage": "import { Sidebar } from \"@/components/ui/sidebar\";\nimport * as React from \"react\";\n\nexport function SidebarDemo() {\n  const [collapsed, setCollapsed] = React.useState(false);\n\n  return (\n    <div className=\"flex h-96 border border-[var(--border)] rounded-lg overflow-hidden\">\n      <Sidebar\n        collapsed={collapsed}\n        onCollapsedChange={setCollapsed}\n        activeComponent=\"button\"\n      />\n      <div className=\"flex-1 p-6 bg-[var(--bg-main)]\">\n        <p className=\"text-sm text-white\">Press ⌘B or click toggle icon to collapse.</p>\n      </div>\n    </div>\n  );\n}",
    "props": [
      {
        "name": "collapsed",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Controls whether the sidebar is collapsed (64px) or expanded (256px)."
      },
      {
        "name": "onCollapsedChange",
        "type": "(collapsed: boolean) => void",
        "defaultValue": "undefined",
        "description": "Callback fired when the user toggles the sidebar (also supports ⌘B)."
      },
      {
        "name": "mobileOpen",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Controls visibility of the mobile overlay navigation drawer."
      },
      {
        "name": "onMobileOpenChange",
        "type": "(open: boolean) => void",
        "defaultValue": "undefined",
        "description": "Callback invoked to dismiss the mobile drawer."
      },
      {
        "name": "activeComponent",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Name of the component currently active in documentation."
      },
      {
        "name": "activeCategory",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Category currently active or filtered."
      },
      {
        "name": "theme",
        "type": "'dark' | 'light' | 'system'",
        "defaultValue": "'dark'",
        "description": "Controls logo and icon theme rendering."
      }
    ],
    "files": [
      {
        "name": "sidebar.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport Link from \"next/link\";\nimport { usePathname, useSearchParams } from \"next/navigation\";\nimport { ChevronDown, X, Menu, Terminal, ChevronsUpDown, ChevronsDownUp } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\nimport {\n  VectorLayersIcon,\n  VectorFolderIcon,\n  VectorApiIcon,\n  VectorPanelLeftIcon,\n  VectorKiloLogo,\n  VectorCategoryIcon,\n  VectorComponentIcon,\n} from \"@/components/vector-icons\";\nimport { REGISTRY_DATA, RegistryItem } from \"@/registry/registry-data\";\nimport { SidebarHoverPreview, HoverState } from \"@/components/sidebar-hover-preview\";\n\nexport interface SidebarProps extends React.HTMLAttributes<HTMLElement> {\n  className?: string;\n  collapsed?: boolean;\n  onCollapsedChange?: (collapsed: boolean) => void;\n  mobileOpen?: boolean;\n  onMobileOpenChange?: (open: boolean) => void;\n  activeComponent?: string;\n  activeCategory?: string;\n  theme?: \"dark\" | \"light\" | \"system\";\n  activeVariant?: string;\n}\n\nfunction SidebarBase({\n  className,\n  collapsed = false,\n  onCollapsedChange,\n  mobileOpen = false,\n  onMobileOpenChange,\n  activeComponent,\n  activeCategory,\n  theme = \"dark\",\n  activeVariant,\n  ...props\n}: SidebarProps) {\n  const pathname = usePathname();\n  const [internalCollapsed, setInternalCollapsed] = React.useState(false);\n  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;\n\n  const handleToggleCollapse = () => {\n    const next = !isCollapsed;\n    setInternalCollapsed(next);\n    onCollapsedChange?.(next);\n  };\n\n  const registryItems = Object.values(REGISTRY_DATA);\n  const categories = Array.from(new Set(registryItems.map((item) => item.category)));\n\n  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({\n    Actions: true,\n    \"Forms & Inputs\": true,\n    Overlays: true,\n    \"Data Display\": true,\n    Navigation: true,\n    \"Media & Layout\": true,\n  });\n\n  const [expandedVariants, setExpandedVariants] = React.useState<Record<string, boolean>>({\n    button: true,\n    badge: true,\n  });\n\n  // Automatically expand variant tree when activeComponent is selected\n  React.useEffect(() => {\n    if (activeComponent) {\n      setExpandedVariants((prev) => ({\n        ...prev,\n        [activeComponent]: true,\n      }));\n    }\n  }, [activeComponent]);\n\n  const toggleComponentVariants = (compName: string) => {\n    setExpandedVariants((prev) => ({\n      ...prev,\n      [compName]: !prev[compName],\n    }));\n  };\n\n  const toggleCategory = (cat: string) => {\n    setExpandedCategories((prev) => ({\n      ...prev,\n      [cat]: !prev[cat],\n    }));\n  };\n\n  const expandAllCategories = () => {\n    const next: Record<string, boolean> = {};\n    categories.forEach((cat) => {\n      next[cat] = true;\n    });\n    setExpandedCategories(next);\n  };\n\n  const collapseAllCategories = () => {\n    const next: Record<string, boolean> = {};\n    categories.forEach((cat) => {\n      next[cat] = false;\n    });\n    setExpandedCategories(next);\n  };\n\n  const isAllCollapsed = categories.every((cat) => !expandedCategories[cat]);\n\n  const handleToggleAllCategories = () => {\n    if (isAllCollapsed) {\n      expandAllCategories();\n    } else {\n      collapseAllCategories();\n    }\n  };\n\n  // Hover preview state & smooth glide tracking\n  const [hoverState, setHoverState] = React.useState<HoverState | null>(null);\n  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);\n  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);\n  const asideRef = React.useRef<HTMLElement | null>(null);\n\n  const handleComponentMouseEnter = (\n    compItem: RegistryItem,\n    e: React.MouseEvent<HTMLElement>,\n    variant?: string\n  ) => {\n    if (closeTimeoutRef.current) {\n      clearTimeout(closeTimeoutRef.current);\n      closeTimeoutRef.current = null;\n    }\n\n    const rect = e.currentTarget.getBoundingClientRect();\n    const asideRect = asideRef.current?.getBoundingClientRect();\n    const sidebarRight = asideRect ? asideRect.right : (isCollapsed ? 56 : 256);\n    const centerY = rect.top + rect.height / 2;\n\n    if (hoverState) {\n      setHoverState({\n        item: compItem,\n        top: centerY,\n        sidebarRight,\n        variant,\n      });\n      return;\n    }\n\n    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);\n    hoverTimeoutRef.current = setTimeout(() => {\n      setHoverState({\n        item: compItem,\n        top: centerY,\n        sidebarRight,\n        variant,\n      });\n    }, 110);\n  };\n\n  const handleComponentMouseLeave = () => {\n    if (hoverTimeoutRef.current) {\n      clearTimeout(hoverTimeoutRef.current);\n      hoverTimeoutRef.current = null;\n    }\n    closeTimeoutRef.current = setTimeout(() => {\n      setHoverState(null);\n    }, 160);\n  };\n\n  const handleMouseEnterPreview = () => {\n    if (closeTimeoutRef.current) {\n      clearTimeout(closeTimeoutRef.current);\n      closeTimeoutRef.current = null;\n    }\n  };\n\n  const handleMouseLeavePreview = () => {\n    closeTimeoutRef.current = setTimeout(() => {\n      setHoverState(null);\n    }, 160);\n  };\n\n  const isOverview = pathname === \"/\";\n  const isAllComponents = pathname === \"/components\";\n  const isDocs = pathname === \"/docs\" || pathname?.startsWith(\"/docs\");\n\n  const sidebarContent = (\n    <div className=\"flex flex-col h-full w-64 shrink-0 bg-[var(--bg-sidebar)] text-[var(--text-primary)] select-none overflow-hidden\">\n      {/* 1. Header & Brand */}\n      <div className=\"flex h-14 items-center justify-between px-3 border-b border-[var(--border)] shrink-0 w-64\">\n        <Link\n          href=\"/\"\n          className=\"flex items-center gap-2.5 group/brand py-1 px-1 rounded transition-colors overflow-hidden\"\n          onClick={(e) => {\n            if (isCollapsed) {\n              e.preventDefault();\n              handleToggleCollapse();\n            } else {\n              onMobileOpenChange?.(false);\n            }\n          }}\n          title={isCollapsed ? \"Expand sidebar (⌘B)\" : \"kilo/ui\"}\n        >\n          <div className=\"h-6 w-6 shrink-0 flex items-center justify-center\">\n            <VectorKiloLogo theme={theme} className=\"h-6 w-6\" />\n          </div>\n          <span\n            className={cn(\n              \"font-mono text-sm font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap transition-opacity duration-200 select-none\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n          >\n            kilo<span className=\"text-[var(--accent-green)]\">/</span>ui\n          </span>\n        </Link>\n\n        {/* Desktop Collapse Toggle Button */}\n        <button\n          type=\"button\"\n          onClick={handleToggleCollapse}\n          className={cn(\n            \"p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-opacity duration-200 cursor-pointer hidden lg:flex items-center justify-center shrink-0\",\n            isCollapsed && \"opacity-0 pointer-events-none\"\n          )}\n          aria-label=\"Collapse sidebar\"\n          title=\"Collapse sidebar (⌘B)\"\n        >\n          <VectorPanelLeftIcon isCollapsed={false} className=\"h-3.5 w-3.5\" />\n        </button>\n\n        {/* Mobile Close Button */}\n        <button\n          type=\"button\"\n          onClick={() => onMobileOpenChange?.(false)}\n          className=\"p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-colors lg:hidden\"\n          aria-label=\"Close sidebar\"\n        >\n          <X className=\"h-4 w-4\" />\n        </button>\n      </div>\n\n      {/* 2. Primary Navigation */}\n      <div className=\"flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-4 w-64\">\n        <nav className=\"space-y-1\">\n          {/* Overview */}\n          <Link\n            href=\"/\"\n            onClick={() => onMobileOpenChange?.(false)}\n            className={cn(\n              \"group flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors active:scale-[0.98]\",\n              isOverview\n                ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                : \"text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n            )}\n            title={isCollapsed ? \"Overview\" : undefined}\n          >\n            <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n              <VectorFolderIcon\n                isActive={isOverview}\n                className={cn(\n                  \"h-4 w-4 transition-colors\",\n                  isOverview\n                    ? \"text-[var(--accent-green)]\"\n                    : \"text-[var(--text-primary)] group-hover:text-[var(--accent-green)]\"\n                )}\n              />\n            </div>\n            <span\n              className={cn(\n                \"ml-2.5 whitespace-nowrap transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              Overview\n            </span>\n          </Link>\n\n          {/* All Components */}\n          <Link\n            href=\"/components\"\n            onClick={() => onMobileOpenChange?.(false)}\n            className={cn(\n              \"group flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors active:scale-[0.98]\",\n              isAllComponents\n                ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                : \"text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n            )}\n            title={isCollapsed ? \"All Components\" : undefined}\n          >\n            <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n              <VectorLayersIcon\n                isActive={isAllComponents}\n                className={cn(\n                  \"h-4 w-4 transition-colors\",\n                  isAllComponents\n                    ? \"text-[var(--accent-green)]\"\n                    : \"text-[var(--text-primary)] group-hover:text-[var(--accent-green)]\"\n                )}\n              />\n            </div>\n            <div\n              className={cn(\n                \"flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              <span className=\"whitespace-nowrap\">All Components</span>\n              <span className=\"font-mono text-[10px] font-semibold text-[var(--text-muted)]\">\n                {registryItems.length}\n              </span>\n            </div>\n          </Link>\n\n          {/* Registry API */}\n          <Link\n            href=\"/docs\"\n            onClick={() => onMobileOpenChange?.(false)}\n            className={cn(\n              \"group flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors active:scale-[0.98]\",\n              isDocs\n                ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                : \"text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n            )}\n            title={isCollapsed ? \"Registry API\" : undefined}\n          >\n            <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n              <VectorApiIcon\n                isActive={isDocs}\n                className={cn(\n                  \"h-4 w-4 transition-colors\",\n                  isDocs\n                    ? \"text-[var(--accent-green)]\"\n                    : \"text-[var(--text-primary)] group-hover:text-[var(--accent-green)]\"\n                )}\n              />\n            </div>\n            <span\n              className={cn(\n                \"ml-2.5 whitespace-nowrap transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              Registry API\n            </span>\n          </Link>\n        </nav>\n\n        {/* Horizontal Divider before Categories */}\n        <div\n          className={cn(\n            \"border-t border-[var(--border)] my-1 transition-all duration-300\",\n            isCollapsed ? \"w-8 ml-0.5\" : \"w-full\"\n          )}\n        />\n\n        {/* 3. Categories & Components */}\n        <div className=\"space-y-1\">\n          {/* Categories Header */}\n          <div className=\"flex items-center justify-between w-full rounded p-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] select-none\">\n            <div className=\"flex items-center flex-1 min-w-0\">\n              <div\n                className=\"flex h-5 w-5 shrink-0 items-center justify-center cursor-default\"\n                title={isCollapsed ? `Categories (${categories.length})` : undefined}\n              >\n                <VectorCategoryIcon category=\"all\" className=\"h-4 w-4 text-[var(--text-muted)]\" />\n              </div>\n              <span\n                className={cn(\n                  \"ml-2.5 flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-200\",\n                  isCollapsed && \"opacity-0 pointer-events-none\"\n                )}\n              >\n                <span>Categories</span>\n                <span className=\"text-[9px] text-[var(--text-muted)] font-normal\">({categories.length})</span>\n              </span>\n            </div>\n            <button\n              type=\"button\"\n              onClick={handleToggleAllCategories}\n              className={cn(\n                \"p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-opacity duration-200 cursor-pointer shrink-0\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n              title={isAllCollapsed ? \"Expand all categories\" : \"Collapse all categories\"}\n              aria-label={isAllCollapsed ? \"Expand all categories\" : \"Collapse all categories\"}\n            >\n              {isAllCollapsed ? (\n                <ChevronsUpDown className=\"h-3.5 w-3.5\" />\n              ) : (\n                <ChevronsDownUp className=\"h-3.5 w-3.5\" />\n              )}\n            </button>\n          </div>\n\n          {/* Categories List */}\n          {categories.map((cat) => {\n            const catItems = registryItems.filter((i) => i.category === cat);\n            const isCategoryActive = activeCategory === cat;\n            const isExpanded = expandedCategories[cat] ?? true;\n\n            return (\n              <div key={cat} className=\"space-y-0.5\">\n                <div\n                  className={cn(\n                    \"group/cat flex w-full items-center justify-between rounded p-2 text-xs font-semibold tracking-tight transition-colors\",\n                    isCategoryActive\n                      ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)]\"\n                      : \"text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]\"\n                  )}\n                >\n                  <Link\n                    href={`/components?category=${encodeURIComponent(cat)}`}\n                    onClick={() => onMobileOpenChange?.(false)}\n                    onMouseEnter={(e) => {\n                      if (isCollapsed && catItems[0]) {\n                        handleComponentMouseEnter(catItems[0], e);\n                      }\n                    }}\n                    onMouseLeave={() => {\n                      if (isCollapsed) handleComponentMouseLeave();\n                    }}\n                    className=\"flex items-center flex-1 min-w-0 text-left\"\n                    title={isCollapsed ? `${cat} (${catItems.length})` : undefined}\n                  >\n                    <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n                      <VectorCategoryIcon\n                        category={cat}\n                        isActive={isCategoryActive}\n                        className={cn(\n                          \"h-4 w-4 shrink-0 transition-colors\",\n                          isCategoryActive\n                            ? \"text-[var(--accent-green)]\"\n                            : \"text-[var(--text-primary)] group-hover/cat:text-[var(--accent-green)]\"\n                        )}\n                      />\n                    </div>\n                    <span\n                      className={cn(\n                        \"ml-2.5 truncate whitespace-nowrap transition-opacity duration-200\",\n                        isCollapsed && \"opacity-0 pointer-events-none\"\n                      )}\n                    >\n                      {cat}\n                    </span>\n                  </Link>\n\n                  <div\n                    className={cn(\n                      \"flex items-center gap-1 transition-opacity duration-200 shrink-0\",\n                      isCollapsed && \"opacity-0 pointer-events-none\"\n                    )}\n                  >\n                    <span className=\"font-mono text-[10px] text-[var(--text-muted)]\">\n                      {catItems.length}\n                    </span>\n                    <button\n                      type=\"button\"\n                      onClick={(e) => {\n                        e.stopPropagation();\n                        toggleCategory(cat);\n                      }}\n                      className=\"p-0.5 rounded hover:bg-[var(--surface-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-transform cursor-pointer\"\n                      title={isExpanded ? \"Collapse\" : \"Expand\"}\n                    >\n                      <ChevronDown\n                        className={cn(\n                          \"h-3 w-3 transition-transform duration-200\",\n                          isExpanded ? \"rotate-0\" : \"-rotate-90\"\n                        )}\n                      />\n                    </button>\n                  </div>\n                </div>\n\n                {/* Sub-items with smooth expand/collapse transition */}\n                <div\n                  className={cn(\n                    \"grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]\",\n                    !isCollapsed && isExpanded\n                      ? \"grid-rows-[1fr] opacity-100\"\n                      : \"grid-rows-[0fr] opacity-0 pointer-events-none\"\n                  )}\n                >\n                  <div className=\"overflow-hidden\">\n                    <div className=\"ml-3.5 pl-2 border-l border-[var(--border)] py-0.5 space-y-1\">\n                      {catItems.map((comp) => {\n                        const isCompActive =\n                          pathname === `/components/${comp.name}` || activeComponent === comp.name;\n                        const hasVariants = Boolean(comp.variants && comp.variants.length > 0);\n                        const isVariantExpanded = Boolean(expandedVariants[comp.name]);\n\n                        return (\n                          <div key={comp.name} className=\"space-y-0.5\">\n                            <div\n                              className={cn(\n                                \"group/comp flex items-center justify-between w-full rounded text-[11px] font-semibold tracking-tight transition-colors\",\n                                isCompActive && !activeVariant\n                                  ? \"bg-[var(--surface-secondary)] text-[var(--accent-green)] border border-[var(--border)]\"\n                                  : isCompActive\n                                  ? \"bg-[var(--surface-secondary)]/60 text-[var(--text-primary)]\"\n                                  : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]\"\n                              )}\n                            >\n                              <Link\n                                href={`/components/${comp.name}`}\n                                onClick={() => onMobileOpenChange?.(false)}\n                                onMouseEnter={(e) => handleComponentMouseEnter(comp, e)}\n                                onMouseLeave={handleComponentMouseLeave}\n                                className=\"flex items-center gap-2 flex-1 min-w-0 px-2 py-1 text-left\"\n                                title={comp.title}\n                              >\n                                <VectorComponentIcon\n                                  name={comp.name}\n                                  className={cn(\n                                    \"h-3 w-3 shrink-0 transition-colors\",\n                                    isCompActive\n                                      ? \"text-[var(--accent-green)]\"\n                                      : \"text-[var(--text-primary)] group-hover/comp:text-[var(--accent-green)]\"\n                                  )}\n                                />\n                                <span className=\"truncate font-semibold\">{comp.title}</span>\n                              </Link>\n\n                              {hasVariants && (\n                                <button\n                                  type=\"button\"\n                                  onClick={(e) => {\n                                    e.preventDefault();\n                                    e.stopPropagation();\n                                    toggleComponentVariants(comp.name);\n                                  }}\n                                  className={cn(\n                                    \"flex items-center gap-0.5 px-1.5 py-0.5 mr-1 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer select-none\",\n                                    isCompActive\n                                      ? \"text-[var(--accent-green)] hover:bg-[var(--accent-green)]/15\"\n                                      : \"text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]\"\n                                  )}\n                                  title={`${isVariantExpanded ? \"Hide\" : \"Show\"} ${comp.variants?.length} variants`}\n                                  aria-label={`${isVariantExpanded ? \"Hide\" : \"Show\"} variants for ${comp.title}`}\n                                >\n                                  <span className=\"text-[9px] font-bold opacity-80\">{comp.variants?.length}</span>\n                                  <ChevronDown\n                                    className={cn(\n                                      \"h-2.5 w-2.5 transition-transform duration-200\",\n                                      isVariantExpanded ? \"rotate-0\" : \"-rotate-90\"\n                                    )}\n                                  />\n                                </button>\n                              )}\n                            </div>\n\n                            {/* Expandable Variants Tree */}\n                            {hasVariants && (\n                              <div\n                                className={cn(\n                                  \"grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]\",\n                                  !isCollapsed && isVariantExpanded\n                                    ? \"grid-rows-[1fr] opacity-100\"\n                                    : \"grid-rows-[0fr] opacity-0 pointer-events-none\"\n                                )}\n                              >\n                                <div className=\"overflow-hidden\">\n                                  <div className=\"relative ml-3.5 pl-3 py-1 space-y-1\">\n                                    {comp.variants?.map((variant, idx) => {\n                                      const isThisVariantActive =\n                                        isCompActive &&\n                                        (activeVariant === variant || (!activeVariant && variant === \"default\"));\n                                      const isLast = idx === (comp.variants?.length ?? 1) - 1;\n\n                                      return (\n                                        <div key={variant} className=\"relative flex items-center\">\n                                          {/* L-shaped curved tree connector branch */}\n                                          <span\n                                            aria-hidden=\"true\"\n                                            className={cn(\n                                              \"absolute -left-3 top-0 w-3 h-3.5 border-l border-b border-[var(--border)] rounded-bl-[5px] pointer-events-none transition-colors\",\n                                              isThisVariantActive ? \"border-[var(--accent-green)]/70\" : \"group-hover/v:border-[var(--border-hover)]\"\n                                            )}\n                                          />\n                                          {/* Vertical connecting spine to subsequent siblings */}\n                                          {!isLast && (\n                                            <span\n                                              aria-hidden=\"true\"\n                                              className=\"absolute -left-3 top-3.5 bottom-[-4px] w-px bg-[var(--border)] pointer-events-none\"\n                                            />\n                                          )}\n\n                                          <Link\n                                            href={`/components/${comp.name}?variant=${variant}`}\n                                            onClick={() => onMobileOpenChange?.(false)}\n                                            onMouseEnter={(e) => handleComponentMouseEnter(comp, e, variant)}\n                                            onMouseLeave={handleComponentMouseLeave}\n                                            className={cn(\n                                              \"group/v flex items-center gap-2 w-full px-2 py-1 rounded text-[11px] font-mono tracking-tight transition-colors text-left\",\n                                              isThisVariantActive\n                                                ? \"bg-[var(--surface-secondary)] text-[var(--accent-green)] font-bold border border-[var(--border)] shadow-xs\"\n                                                : \"text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] font-medium\"\n                                            )}\n                                            title={`${comp.title} (${variant} variant)`}\n                                          >\n                                            <span\n                                              className={cn(\n                                                \"h-1.5 w-1.5 rounded-full transition-colors shrink-0\",\n                                                isThisVariantActive\n                                                  ? \"bg-[var(--accent-green)]\"\n                                                  : \"bg-[var(--text-muted)]/50 group-hover/v:bg-[var(--text-primary)]\"\n                                              )}\n                                            />\n                                            <span className=\"truncate\">{variant}</span>\n                                          </Link>\n                                        </div>\n                                      );\n                                    })}\n                                  </div>\n                                </div>\n                              </div>\n                            )}\n                          </div>\n                        );\n                      })}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            );\n          })}\n        </div>\n      </div>\n\n      {/* 4. Minimal Clean Footer */}\n      <div className=\"border-t border-[var(--border)] p-2.5 shrink-0 w-64\">\n        <Link\n          href=\"/docs\"\n          className=\"flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-1\"\n          title=\"Registry Documentation\"\n        >\n          <span\n            className={cn(\n              \"whitespace-nowrap transition-opacity duration-200\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n          >\n            Documentation\n          </span>\n          <span\n            className={cn(\n              \"text-[10px] transition-opacity duration-200\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n          >\n            /docs\n          </span>\n        </Link>\n      </div>\n    </div>\n  );\n\n  return (\n    <>\n      {/* Desktop Persistent Sidebar */}\n      <aside\n        ref={asideRef}\n        className={cn(\n          \"hidden lg:flex flex-col shrink-0 border-r border-[var(--border)] bg-[var(--bg-sidebar)] overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] h-screen sticky top-0 z-30\",\n          isCollapsed ? \"w-14\" : \"w-64\",\n          className\n        )}\n        {...props}\n      >\n        {sidebarContent}\n      </aside>\n\n      {/* Floating Hover Preview Card with Natural Spring Physics */}\n      <SidebarHoverPreview\n        hoverState={hoverState}\n        onMouseEnterPreview={handleMouseEnterPreview}\n        onMouseLeavePreview={handleMouseLeavePreview}\n        isCollapsed={isCollapsed}\n      />\n\n      {/* Mobile Drawer Overlay */}\n      {mobileOpen && (\n        <div className=\"fixed inset-0 z-50 lg:hidden flex\">\n          <div\n            className=\"fixed inset-0 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200\"\n            onClick={() => onMobileOpenChange?.(false)}\n          />\n          <div className=\"relative w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-250\">\n            {sidebarContent}\n          </div>\n        </div>\n      )}\n    </>\n  );\n}\n\nfunction SidebarWithSearchParams(props: SidebarProps) {\n  const searchParams = useSearchParams();\n  const activeVariant = props.activeVariant || searchParams?.get(\"variant\") || undefined;\n  return <SidebarBase {...props} activeVariant={activeVariant} />;\n}\n\nexport function Sidebar(props: SidebarProps) {\n  return (\n    <React.Suspense fallback={<SidebarBase {...props} />}>\n      <SidebarWithSearchParams {...props} />\n    </React.Suspense>\n  );\n}\n"
      }
    ]
  }
};
