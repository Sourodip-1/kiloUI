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
  category: "Actions" | "Forms & Inputs" | "Overlays" | "Data Display" | "Navigation" | "Media & Layout" | "Backgrounds & Shaders";
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
  "checkbox": {
    "name": "checkbox",
    "category": "Forms & Inputs",
    "title": "Checkbox",
    "description": "Multi-style accessible checkbox featuring physics-driven motion bounce, blueprint CAD lineart path drawing, strikethrough tasks, selectable card tiles, and interactive chips.",
    "variants": [
      "default",
      "motion",
      "lineart",
      "strike",
      "card",
      "chip"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Checkbox } from \"@/components/ui/checkbox\";\nimport * as React from \"react\";\n\nexport function CheckboxDemo() {\n  const [checked, setChecked] = React.useState(true);\n\n  return (\n    <div className=\"flex flex-col gap-4\">\n      {/* Physics bounce motion */}\n      <Checkbox\n        variant=\"motion\"\n        checked={checked}\n        onCheckedChange={setChecked}\n        label=\"Spring Motion Checkbox\"\n        description=\"Dynamic bounce with micro-spring easing\"\n        badge=\"Motion\"\n      />\n\n      {/* Blueprint CAD lineart tick animation */}\n      <Checkbox\n        variant=\"lineart\"\n        defaultChecked\n        label=\"CAD Lineart Checkbox\"\n        description=\"Calculated SVG path tracing animation\"\n        badge=\"Lineart\"\n      />\n    </div>\n  );\n}",
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Controlled checked state."
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Default initial checked state."
      },
      {
        "name": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "description": "Callback fired when checked state changes."
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Displays an indeterminate dash state."
      },
      {
        "name": "variant",
        "type": "'default' | 'motion' | 'lineart' | 'strike' | 'card' | 'chip'",
        "defaultValue": "'default'",
        "description": "Visual and interaction animation aesthetic."
      },
      {
        "name": "size",
        "type": "'sm' | 'default' | 'lg'",
        "defaultValue": "'default'",
        "description": "Dimensions of checkbox element."
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "description": "Primary text label next to the checkbox."
      },
      {
        "name": "description",
        "type": "React.ReactNode",
        "description": "Secondary helper context below the label."
      },
      {
        "name": "badge",
        "type": "string",
        "description": "Optional metadata badge tag."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Disables interaction and reduces opacity."
      },
      {
        "name": "error",
        "type": "string",
        "description": "Validation error message that tints border red."
      }
    ],
    "files": [
      {
        "name": "checkbox.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport type CheckboxVariant = \"default\" | \"motion\" | \"lineart\" | \"strike\" | \"card\" | \"chip\";\nexport type CheckboxSize = \"sm\" | \"default\" | \"lg\";\n\nexport interface CheckboxProps\n  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"onChange\"> {\n  checked?: boolean;\n  defaultChecked?: boolean;\n  onCheckedChange?: (checked: boolean) => void;\n  indeterminate?: boolean;\n  variant?: CheckboxVariant;\n  size?: CheckboxSize;\n  label?: React.ReactNode;\n  description?: React.ReactNode;\n  badge?: string;\n  error?: string;\n}\n\nexport const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(\n  (\n    {\n      checked: controlledChecked,\n      defaultChecked = false,\n      onCheckedChange,\n      indeterminate = false,\n      variant = \"default\",\n      size = \"default\",\n      label,\n      description,\n      badge,\n      error,\n      disabled = false,\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);\n    const isControlled = controlledChecked !== undefined;\n    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;\n    const [isAnimating, setIsAnimating] = React.useState(false);\n\n    const toggle = () => {\n      if (disabled) return;\n      setIsAnimating(true);\n      const next = !isChecked;\n      if (!isControlled) {\n        setUncontrolledChecked(next);\n      }\n      onCheckedChange?.(next);\n      setTimeout(() => setIsAnimating(false), 400);\n    };\n\n    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {\n      if (e.key === \" \" || e.key === \"Enter\") {\n        e.preventDefault();\n        toggle();\n      }\n    };\n\n    // Sizing maps\n    const sizeMap = {\n      sm: {\n        box: \"h-3.5 w-3.5 rounded\",\n        icon: \"h-2.5 w-2.5\",\n        text: \"text-xs\",\n        desc: \"text-[10px]\",\n        dashLen: 14,\n      },\n      default: {\n        box: \"h-4.5 w-4.5 rounded-md\",\n        icon: \"h-3 w-3\",\n        text: \"text-xs\",\n        desc: \"text-[11px]\",\n        dashLen: 18,\n      },\n      lg: {\n        box: \"h-5.5 w-5.5 rounded-lg\",\n        icon: \"h-3.5 w-3.5\",\n        text: \"text-sm\",\n        desc: \"text-xs\",\n        dashLen: 22,\n      },\n    }[size];\n\n    // =========================================================================\n    // 1. CHIP / PILL VARIANT\n    // =========================================================================\n    if (variant === \"chip\") {\n      return (\n        <button\n          type=\"button\"\n          role=\"checkbox\"\n          aria-checked={isChecked}\n          disabled={disabled}\n          ref={ref}\n          onClick={toggle}\n          onKeyDown={handleKeyDown}\n          className={cn(\n            \"group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200 select-none cursor-pointer\",\n            \"focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-[var(--accent-green)]\",\n            isChecked\n              ? \"border-[var(--accent-green)] bg-[var(--accent-green)]/15 text-[var(--accent-green)] shadow-xs\"\n              : \"border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]\",\n            disabled && \"opacity-40 cursor-not-allowed hover:border-[var(--border)]\",\n            className\n          )}\n          {...props}\n        >\n          {/* Micro animated check indicator */}\n          <span\n            className={cn(\n              \"flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]\",\n              isChecked\n                ? \"h-3.5 w-3.5 bg-[var(--accent-green)] text-black scale-100 rotate-0\"\n                : \"h-2 w-2 bg-[var(--text-muted)]/40 scale-75 -rotate-45\"\n            )}\n          >\n            {isChecked && (\n              <svg\n                viewBox=\"0 0 12 12\"\n                fill=\"none\"\n                stroke=\"currentColor\"\n                strokeWidth=\"2.5\"\n                strokeLinecap=\"round\"\n                strokeLinejoin=\"round\"\n                className=\"h-2 w-2\"\n              >\n                <polyline points=\"2.5 6 4.5 8.5 9.5 3.5\" />\n              </svg>\n            )}\n          </span>\n\n          <span className=\"font-medium tracking-tight truncate\">{label}</span>\n\n          {badge && (\n            <span\n              className={cn(\n                \"rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider transition-colors\",\n                isChecked\n                  ? \"bg-[var(--accent-green)]/20 text-[var(--accent-green)]\"\n                  : \"bg-[var(--surface-secondary)] text-[var(--text-muted)]\"\n              )}\n            >\n              {badge}\n            </span>\n          )}\n        </button>\n      );\n    }\n\n    // =========================================================================\n    // 2. CARD / TILE SELECTOR VARIANT\n    // =========================================================================\n    if (variant === \"card\") {\n      return (\n        <div\n          onClick={toggle}\n          role=\"checkbox\"\n          aria-checked={isChecked}\n          tabIndex={disabled ? -1 : 0}\n          onKeyDown={(e) => {\n            if (e.key === \" \" || e.key === \"Enter\") {\n              e.preventDefault();\n              toggle();\n            }\n          }}\n          className={cn(\n            \"group relative flex w-full max-w-md items-start justify-between gap-4 rounded-xl border p-4 transition-all duration-200 select-none cursor-pointer\",\n            \"focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-[var(--accent-green)]\",\n            isChecked\n              ? \"border-[var(--accent-green)] bg-[var(--surface-elevated)] shadow-md shadow-[var(--accent-green)]/5\"\n              : \"border-[var(--border)] bg-[var(--surface-elevated)]/60 hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)]\",\n            disabled && \"opacity-40 cursor-not-allowed hover:border-[var(--border)]\",\n            className\n          )}\n        >\n          {/* Subtle Ambient Radial Highlight on Checked */}\n          {isChecked && (\n            <div\n              className=\"pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent-green)]/5 to-transparent\"\n              aria-hidden=\"true\"\n            />\n          )}\n\n          <div className=\"flex flex-col text-left space-y-1 min-w-0 pr-2\">\n            <div className=\"flex items-center gap-2\">\n              <span\n                className={cn(\n                  \"text-xs font-semibold tracking-tight transition-colors\",\n                  isChecked\n                    ? \"text-[var(--text-primary)]\"\n                    : \"text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]\"\n                )}\n              >\n                {label}\n              </span>\n              {badge && (\n                <span className=\"rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.2 font-mono text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider\">\n                  {badge}\n                </span>\n              )}\n            </div>\n            {description && (\n              <span className=\"text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed\">\n                {description}\n              </span>\n            )}\n          </div>\n\n          {/* Interactive Checkbox Node */}\n          <div\n            className={cn(\n              \"relative flex shrink-0 items-center justify-center border transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]\",\n              sizeMap.box,\n              isChecked\n                ? \"border-[var(--accent-green)] bg-[var(--accent-green)] text-black shadow-xs scale-105\"\n                : \"border-[var(--border)] bg-[var(--surface-secondary)] group-hover:border-[var(--border-hover)]\"\n            )}\n          >\n            {isChecked && (\n              <svg\n                viewBox=\"0 0 16 16\"\n                fill=\"none\"\n                stroke=\"currentColor\"\n                strokeWidth=\"2.5\"\n                strokeLinecap=\"round\"\n                strokeLinejoin=\"round\"\n                className={cn(sizeMap.icon, \"animate-in zoom-in-50 duration-150\")}\n              >\n                <polyline points=\"3 8.5 6.5 12 13 4.5\" />\n              </svg>\n            )}\n          </div>\n        </div>\n      );\n    }\n\n    // =========================================================================\n    // 3. CORE CHECKBOX (MOTION, LINEART, STRIKE, DEFAULT)\n    // =========================================================================\n    return (\n      <div\n        className={cn(\n          \"inline-flex items-start gap-2.5 select-none\",\n          disabled && \"cursor-not-allowed opacity-40\",\n          className\n        )}\n      >\n        <button\n          type=\"button\"\n          role=\"checkbox\"\n          aria-checked={indeterminate ? \"mixed\" : isChecked}\n          disabled={disabled}\n          ref={ref}\n          onClick={toggle}\n          onKeyDown={handleKeyDown}\n          className={cn(\n            \"relative shrink-0 flex items-center justify-center transition-all cursor-pointer\",\n            sizeMap.box,\n            \"focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-[var(--accent-green)]\",\n\n            // -------------------------------------------------------------\n            // VARIANT: MOTION (Spring Bounce & Elastic Scale)\n            // -------------------------------------------------------------\n            variant === \"motion\" && [\n              \"border-2 rounded-lg transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]\",\n              isChecked\n                ? \"bg-[var(--accent-green)] border-[var(--accent-green)] text-black shadow-md scale-105\"\n                : \"border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent-green)] hover:scale-110\",\n              isAnimating && isChecked && \"scale-125\",\n              isAnimating && !isChecked && \"scale-90\",\n            ],\n\n            // -------------------------------------------------------------\n            // VARIANT: LINEART (Technical CAD / Blueprint SVG Path Draw)\n            // -------------------------------------------------------------\n            variant === \"lineart\" && [\n              \"border-2 rounded-[2px] bg-transparent font-mono transition-all duration-200\",\n              isChecked\n                ? \"border-[var(--accent-green)] text-[var(--accent-green)] bg-[var(--accent-green)]/10 shadow-[0_0_10px_rgba(34,197,94,0.25)]\"\n                : \"border-[var(--text-muted)]/60 hover:border-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/40\",\n            ],\n\n            // -------------------------------------------------------------\n            // VARIANT: STRIKE (Task completion checklist)\n            // -------------------------------------------------------------\n            variant === \"strike\" && [\n              \"border border-[var(--border)] rounded-md transition-colors\",\n              isChecked\n                ? \"bg-[var(--accent-green)] border-[var(--accent-green)] text-black shadow-xs\"\n                : \"bg-[var(--surface-elevated)] hover:border-[var(--border-hover)]\",\n            ],\n\n            // -------------------------------------------------------------\n            // VARIANT: DEFAULT (Clean Minimal Developer Aesthetic)\n            // -------------------------------------------------------------\n            variant === \"default\" && [\n              \"border border-[var(--border)] rounded-md bg-[var(--surface-elevated)] transition-colors duration-150\",\n              isChecked\n                ? \"bg-[var(--accent-green)] border-[var(--accent-green)] text-black shadow-2xs\"\n                : \"hover:border-[var(--border-hover)] hover:bg-[var(--surface-secondary)]\",\n            ],\n\n            error && \"border-[var(--accent-red)] focus-visible:ring-[var(--accent-red)]\"\n          )}\n          {...props}\n        >\n          {/* -----------------------------------------------------------\n              VARIANT-SPECIFIC CHECKMARK RENDERING\n          ----------------------------------------------------------- */}\n\n          {/* A. LINEART: Technical SVG with Path Draw Animation & CAD Reticles */}\n          {variant === \"lineart\" && (\n            <svg\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              stroke=\"currentColor\"\n              className={cn(sizeMap.icon, \"overflow-visible text-[var(--accent-green)]\")}\n            >\n              {/* Corner crosshairs / Reticles */}\n              <path\n                d=\"M1 5h3M5 1v3M23 5h-3M19 1v3M1 19h3M5 23v-3M23 19h-3M19 23v-3\"\n                strokeWidth=\"1.5\"\n                stroke=\"currentColor\"\n                opacity={isChecked ? \"0.9\" : \"0.4\"}\n              />\n\n              {/* Unchecked CAD Center Crosshair */}\n              {!isChecked && !indeterminate && (\n                <path\n                  d=\"M12 9v6M9 12h6\"\n                  strokeWidth=\"1.25\"\n                  stroke=\"currentColor\"\n                  opacity=\"0.35\"\n                />\n              )}\n\n              {/* Indeterminate minus line */}\n              {indeterminate && (\n                <line\n                  x1=\"5\"\n                  y1=\"12\"\n                  x2=\"19\"\n                  y2=\"12\"\n                  strokeWidth=\"2.5\"\n                  strokeLinecap=\"square\"\n                  className=\"animate-in fade-in duration-150\"\n                />\n              )}\n\n              {/* Animated precision path draw checkmark */}\n              {isChecked && !indeterminate && (\n                <polyline\n                  points=\"4 12.5 9 17.5 20 6\"\n                  strokeWidth=\"2.75\"\n                  strokeLinecap=\"round\"\n                  strokeLinejoin=\"round\"\n                  style={{\n                    strokeDasharray: 28,\n                    strokeDashoffset: 0,\n                    animation: \"lineartTick 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards\",\n                  }}\n                />\n              )}\n            </svg>\n          )}\n\n          {/* B. MOTION: Dynamic Pop & Spring Overshoot */}\n          {variant === \"motion\" && (\n            <>\n              {/* Subtle expanding ring radar pulse on check */}\n              {isAnimating && isChecked && (\n                <span\n                  aria-hidden=\"true\"\n                  className=\"pointer-events-none absolute -inset-1 rounded-full border border-[var(--accent-green)] animate-ping opacity-60\"\n                />\n              )}\n\n              {indeterminate ? (\n                <span className=\"h-0.5 w-2.5 rounded-full bg-current transition-all\" />\n              ) : isChecked ? (\n                <svg\n                  viewBox=\"0 0 14 14\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  strokeWidth=\"2.5\"\n                  strokeLinecap=\"round\"\n                  strokeLinejoin=\"round\"\n                  className={cn(\n                    sizeMap.icon,\n                    \"animate-in zoom-in-75 duration-250 ease-[cubic-bezier(0.34,1.56,0.64,1)]\"\n                  )}\n                >\n                  <polyline points=\"2.5 7.5 5.5 10.5 11.5 3.5\" />\n                </svg>\n              ) : null}\n            </>\n          )}\n\n          {/* C. DEFAULT & STRIKE: Minimal Crisp Check */}\n          {(variant === \"default\" || variant === \"strike\") && (\n            <>\n              {indeterminate ? (\n                <span className=\"h-0.5 w-2 rounded-full bg-current\" />\n              ) : isChecked ? (\n                <svg\n                  viewBox=\"0 0 14 14\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  strokeWidth=\"2.25\"\n                  strokeLinecap=\"round\"\n                  strokeLinejoin=\"round\"\n                  className={cn(sizeMap.icon, \"animate-in zoom-in-90 duration-150\")}\n                >\n                  <polyline points=\"2.5 7.5 5.5 10.5 11.5 3.5\" />\n                </svg>\n              ) : null}\n            </>\n          )}\n        </button>\n\n        {/* Labels & Descriptions */}\n        {(label || description || error) && (\n          <div className=\"flex flex-col text-left space-y-0.5 cursor-pointer\" onClick={toggle}>\n            {label && (\n              <div className=\"flex items-center gap-1.5\">\n                <span\n                  className={cn(\n                    \"font-medium transition-all duration-200 select-none\",\n                    sizeMap.text,\n                    variant === \"lineart\" && \"font-mono tracking-tight\",\n                    isChecked\n                      ? \"text-[var(--text-primary)] font-semibold\"\n                      : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)]\",\n                    // Strike-through effect on checked\n                    variant === \"strike\" &&\n                      isChecked &&\n                      \"line-through text-[var(--text-muted)] opacity-70\"\n                  )}\n                >\n                  {label}\n                </span>\n\n                {badge && (\n                  <span className=\"rounded border border-[var(--border)] bg-[var(--surface-secondary)] px-1.5 py-0.2 font-mono text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider\">\n                    {badge}\n                  </span>\n                )}\n              </div>\n            )}\n\n            {description && (\n              <span className={cn(\"text-[var(--text-muted)] leading-relaxed select-none\", sizeMap.desc)}>\n                {description}\n              </span>\n            )}\n\n            {error && (\n              <span className=\"text-[10px] font-mono text-[var(--accent-red)] animate-in fade-in duration-150\">\n                {error}\n              </span>\n            )}\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nCheckbox.displayName = \"Checkbox\";\n"
      }
    ]
  },
  "search-bar": {
    "name": "search-bar",
    "category": "Forms & Inputs",
    "title": "Search Bars",
    "description": "Refractive optical liquid-glass search bar and clean minimal SaaS search components. Features 4 variants: downward-expand (liquid glass pill expanding downwards into a command palette), circle-popout (liquid glass orb extending into a pill), minimal-pill (Linear-style minimal SaaS pill), and minimal-expand (compact minimal SaaS expand trigger).",
    "variants": [
      "downward-expand",
      "circle-popout",
      "minimal-pill",
      "minimal-expand"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { SearchBar } from \"@/registry/ui/search-bar\";\nimport * as React from \"react\";\n\nexport function SearchBarDemo() {\n  const [query, setQuery] = React.useState(\"\");\n\n  return (\n    <div className=\"flex items-center justify-center p-8\">\n      <SearchBar\n        placeholder=\"Search components...\"\n        variant=\"downward-expand\"\n        value={query}\n        onChange={setQuery}\n        onSelectResult={(item) => console.log(\"Selected:\", item)}\n      />\n    </div>\n  );\n}",
    "props": [
      {
        "name": "placeholder",
        "type": "string",
        "defaultValue": "'Search components...'",
        "description": "Placeholder text rendered inside the search input."
      },
      {
        "name": "value",
        "type": "string",
        "description": "Controlled search query string."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "defaultValue": "''",
        "description": "Initial search query in uncontrolled mode."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "description": "Callback triggered when search query text changes."
      },
      {
        "name": "onSearch",
        "type": "(query: string) => void",
        "description": "Callback fired when user submits search or chooses a result."
      },
      {
        "name": "items",
        "type": "SearchBarItem[]",
        "description": "Array of searchable items with id, title, description, and category."
      },
      {
        "name": "onSelectResult",
        "type": "(item: SearchBarItem) => void",
        "description": "Callback invoked when a result item is selected."
      },
      {
        "name": "expanded",
        "type": "boolean",
        "description": "Controlled boolean flag for expanded state."
      },
      {
        "name": "defaultExpanded",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Whether the search panel begins in the expanded state."
      },
      {
        "name": "onExpandedChange",
        "type": "(expanded: boolean) => void",
        "description": "Callback fired when expanding or collapsing."
      },
      {
        "name": "variant",
        "type": "'downward-expand' | 'circle-popout'",
        "defaultValue": "'downward-expand'",
        "description": "Visual presentation variant: 'downward-expand' (anchored pill with downward results expansion) or 'circle-popout' (circular search orb with pop-out pill extension)."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Disables interaction and reduces opacity."
      },
      {
        "name": "showShortcut",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Whether to display the keyboard shortcut hint (Cmd+K)."
      }
    ],
    "files": [
      {
        "name": "search-bar.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nexport * from \"@/registry/ui/liquid-glass-search-bar\";\n"
      }
    ]
  },
  "minimalist-login": {
    "name": "minimalist-login",
    "category": "Forms & Inputs",
    "title": "Minimalist Login",
    "description": "Spatial minimalist login form featuring a high-performance interactive 3D particle wireframe sphere with real-time motion and cursor hover radar reaction, minimal underline inputs, and customizable sharp or rounded corner geometry.",
    "variants": [
      "sharp-edges",
      "rounded-corners"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { MinimalistLogin } from \"@/registry/ui/minimalist-login\";\n\nexport function MinimalistLoginDemo() {\n  return (\n    <MinimalistLogin\n      variant=\"sharp-edges\"\n      onSubmit={(data) => console.log(\"Login submitted:\", data)}\n    />\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'sharp-edges' | 'rounded-corners'",
        "defaultValue": "'sharp-edges'",
        "description": "Visual geometry variant: 'sharp-edges' for 0px corners or 'rounded-corners' for curved frames."
      },
      {
        "name": "borderRadius",
        "type": "number",
        "defaultValue": "20",
        "description": "Radius in pixels applied to container cards and elements when in rounded-corners variant."
      },
      {
        "name": "sphereMotion",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables continuous 3D rotation and orbital physics on the particle sphere."
      },
      {
        "name": "rotationSpeed",
        "type": "number",
        "defaultValue": "1",
        "description": "Rotation velocity multiplier for the 3D particle sphere."
      },
      {
        "name": "interactiveDots",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables interactive cursor tracking with dot bulge and radar rings."
      },
      {
        "name": "portalTitle",
        "type": "string",
        "defaultValue": "'// ACCESS PORTAL'",
        "description": "Technical tag displayed in the top bar of the spatial portal card."
      },
      {
        "name": "portalSubtitle",
        "type": "string",
        "defaultValue": "'SPATIAL LOGIN'",
        "description": "Sub-branding text adjacent to the animated audio equalizer."
      },
      {
        "name": "welcomeTitle",
        "type": "string",
        "defaultValue": "'WELCOME BACK'",
        "description": "Uppercase subtitle on the sign-in form card."
      },
      {
        "name": "title",
        "type": "string",
        "defaultValue": "'Sign in'",
        "description": "Primary heading on the sign-in form card."
      },
      {
        "name": "emailLabel",
        "type": "string",
        "defaultValue": "'EMAIL'",
        "description": "Field label for the email address input."
      },
      {
        "name": "passwordLabel",
        "type": "string",
        "defaultValue": "'PASSWORD'",
        "description": "Field label for the password input."
      },
      {
        "name": "submitLabel",
        "type": "string",
        "defaultValue": "'Sign in'",
        "description": "Text content for the high-contrast sign-in button."
      },
      {
        "name": "forgotPasswordLabel",
        "type": "string",
        "defaultValue": "'Forgot password?'",
        "description": "Text for the password recovery link."
      },
      {
        "name": "createAccountLabel",
        "type": "string",
        "defaultValue": "'Create account'",
        "description": "Text for the registration action link."
      },
      {
        "name": "onSubmit",
        "type": "(data: { email: string; password: string }) => void",
        "description": "Callback invoked upon login form submission."
      },
      {
        "name": "onSignUp",
        "type": "(data: { name: string; email: string; password: string }) => void",
        "description": "Callback invoked upon sign-up form submission."
      }
    ],
    "files": [
      {
        "name": "minimalist-login.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { ArrowRight, ArrowLeft, Loader2, Sparkles, Check, Mail, Lock, Eye, EyeOff, User } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface MinimalistLoginProps extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onSubmit\"> {\n  /** Visual variant: sharp edges (0px radius) or rounded corners (customizable radius) */\n  variant?: \"sharp-edges\" | \"rounded-corners\";\n  /** Border radius in pixels (active for rounded-corners variant) */\n  borderRadius?: number;\n  /** Whether the 3D particle sphere continuously rotates */\n  sphereMotion?: boolean;\n  /** Speed multiplier for sphere rotation (0.5 to 3) */\n  rotationSpeed?: number;\n  /** Whether sphere dots react to cursor hover with bulge */\n  interactiveDots?: boolean;\n  /** Top technical portal tag */\n  portalTitle?: string;\n  /** Bottom sub-branding label */\n  portalSubtitle?: string;\n  /** Welcome tagline on right card */\n  welcomeTitle?: string;\n  /** Main form title */\n  title?: string;\n  /** Email field label */\n  emailLabel?: string;\n  /** Password field label */\n  passwordLabel?: string;\n  /** Primary submit button label */\n  submitLabel?: string;\n  /** Forgot password link text */\n  forgotPasswordLabel?: string;\n  /** Create account link text */\n  createAccountLabel?: string;\n  /** Callback fired on login form submission */\n  onSubmit?: (data: { email: string; password: string }) => void;\n  /** Callback fired on sign-up form submission */\n  onSignUp?: (data: { name: string; email: string; password: string }) => void;\n  /** Callback when forgot password link is clicked */\n  onForgotPassword?: () => void;\n}\n\ninterface Point3D {\n  x: number;\n  y: number;\n  z: number;\n  latIdx: number;\n  lonIdx: number;\n  isOrbit?: boolean;\n}\n\n/* ─────────────────────────────────────────────────────────────────── */\n/* MinimalistLogin                                                      */\n/* ─────────────────────────────────────────────────────────────────── */\nexport function MinimalistLogin({\n  variant = \"sharp-edges\",\n  borderRadius = 20,\n  sphereMotion = true,\n  rotationSpeed = 1,\n  interactiveDots = true,\n  portalTitle = \"// ACCESS PORTAL\",\n  portalSubtitle = \"SPATIAL LOGIN\",\n  welcomeTitle = \"WELCOME BACK\",\n  title = \"Sign in\",\n  emailLabel = \"EMAIL\",\n  passwordLabel = \"PASSWORD\",\n  submitLabel = \"Sign in\",\n  forgotPasswordLabel = \"Forgot password?\",\n  createAccountLabel = \"Create account\",\n  onSubmit,\n  onSignUp,\n  onForgotPassword,\n  className,\n  ...props\n}: MinimalistLoginProps) {\n  const isRounded = variant === \"rounded-corners\";\n  const activeRadius = isRounded ? Math.max(0, borderRadius) : 0;\n\n  /* ── Form states ── */\n  const [formMode, setFormMode] = React.useState<\"login\" | \"signup\">(\"login\");\n  const [transitionState, setTransitionState] = React.useState<\"idle\" | \"exit\" | \"enter\">(\"idle\");\n\n  // Login fields\n  const [email, setEmail] = React.useState(\"\");\n  const [password, setPassword] = React.useState(\"\");\n  const [showPassword, setShowPassword] = React.useState(false);\n\n  // Sign-up fields\n  const [signUpName, setSignUpName] = React.useState(\"\");\n  const [signUpEmail, setSignUpEmail] = React.useState(\"\");\n  const [signUpPassword, setSignUpPassword] = React.useState(\"\");\n  const [signUpConfirm, setSignUpConfirm] = React.useState(\"\");\n  const [showSignUpPassword, setShowSignUpPassword] = React.useState(false);\n  const [showSignUpConfirm, setShowSignUpConfirm] = React.useState(false);\n\n  const [isSubmitting, setIsSubmitting] = React.useState(false);\n  const [submittedMessage, setSubmittedMessage] = React.useState<string | null>(null);\n\n  /* ── Canvas / sphere refs ── */\n  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);\n  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({\n    x: -9999,\n    y: -9999,\n    isOver: false,\n  });\n  const pulseAnimRef = React.useRef<number>(0);\n\n  /* ── Generate 3D sphere vertices ── */\n  const sphereData = React.useMemo(() => {\n    const points: Point3D[] = [];\n    const numLat = 16;\n    const numLon = 28;\n\n    for (let i = 1; i < numLat; i++) {\n      const phi = (i / numLat) * Math.PI;\n      const y = -Math.cos(phi);\n      const ringR = Math.sin(phi);\n      for (let j = 0; j < numLon; j++) {\n        const theta = (j / numLon) * Math.PI * 2;\n        const x = ringR * Math.cos(theta);\n        const z = ringR * Math.sin(theta);\n        points.push({ x, y, z, latIdx: i, lonIdx: j, isOrbit: false });\n      }\n    }\n\n    // Poles\n    points.push({ x: 0, y: -1, z: 0, latIdx: 0, lonIdx: 0, isOrbit: false });\n    points.push({ x: 0, y: 1, z: 0, latIdx: numLat, lonIdx: 0, isOrbit: false });\n\n    // Tilted orbital ring\n    const orbitPoints = 46;\n    const orbitFactor = 1.25;\n    const tiltAngle = (28 * Math.PI) / 180;\n    for (let k = 0; k < orbitPoints; k++) {\n      const theta = (k / orbitPoints) * Math.PI * 2;\n      const ox = orbitFactor * Math.cos(theta);\n      const oz = orbitFactor * Math.sin(theta);\n      const oy = oz * Math.sin(tiltAngle);\n      const ozTilted = oz * Math.cos(tiltAngle);\n      points.push({ x: ox, y: oy, z: ozTilted, latIdx: -1, lonIdx: k, isOrbit: true });\n    }\n\n    return { points, numLat, numLon };\n  }, []);\n\n  /* ── Animation + interaction loop ── */\n  React.useEffect(() => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const ctx = canvas.getContext(\"2d\");\n    if (!ctx) return;\n\n    let animId: number;\n    let angleY = 0.4;\n    let angleX = 0.22;\n    let targetAngleX = 0.22;\n    let targetAngleY = 0.4;\n\n    const render = () => {\n      pulseAnimRef.current += 0.04;\n\n      const rect = canvas.getBoundingClientRect();\n      const dpr = window.devicePixelRatio || 1;\n      if (\n        canvas.width !== Math.round(rect.width * dpr) ||\n        canvas.height !== Math.round(rect.height * dpr)\n      ) {\n        canvas.width = Math.round(rect.width * dpr);\n        canvas.height = Math.round(rect.height * dpr);\n      }\n\n      ctx.save();\n      ctx.scale(dpr, dpr);\n      ctx.clearRect(0, 0, rect.width, rect.height);\n\n      const baseR = Math.min(rect.width * 0.58, rect.height * 0.46);\n      const sphereRadius = Math.max(160, Math.min(baseR, 215));\n      const cx = rect.width * 0.22;\n      const cy = rect.height * 0.49;\n\n      if (sphereMotion) {\n        targetAngleY += 0.0055 * rotationSpeed;\n      }\n\n      angleY += (targetAngleY - angleY) * 0.08;\n      angleX += (targetAngleX - angleX) * 0.08;\n\n      const cosY = Math.cos(angleY);\n      const sinY = Math.sin(angleY);\n      const cosX = Math.cos(angleX);\n      const sinX = Math.sin(angleX);\n      const cameraDist = sphereRadius * 2.5;\n\n      /* ── Project 3D → 2D with BULGE effect ── */\n      const projected = sphereData.points.map((p) => {\n        const pxScaled = p.x * sphereRadius;\n        const pyScaled = p.y * sphereRadius;\n        const pzScaled = p.z * sphereRadius;\n\n        // Y-axis rotation\n        const x1 = pxScaled * cosY + pzScaled * sinY;\n        const z1 = -pxScaled * sinY + pzScaled * cosY;\n        // X-axis rotation\n        const y2 = pyScaled * cosX - z1 * sinX;\n        const z2 = pyScaled * sinX + z1 * cosX;\n\n        const scale = cameraDist / (cameraDist + z2);\n        let px = cx + x1 * scale;\n        let py = cy + y2 * scale;\n\n        let bulgeAmount = 0;\n        let distToCursor = 9999;\n\n        if (interactiveDots && mouseRef.current.isOver) {\n          const dx = px - mouseRef.current.x;\n          const dy = py - mouseRef.current.y;\n          distToCursor = Math.sqrt(dx * dx + dy * dy);\n\n          // Bulge zone: dots within 70px push outward along normal\n          if (distToCursor < 70 && z2 > -60) {\n            const influence = 1 - distToCursor / 70;\n            // Smooth cubic falloff\n            const eased = influence * influence * (3 - 2 * influence);\n            // Outward bulge (normalize the surface normal of the sphere)\n            const nx = p.x; // already on unit sphere\n            const ny = p.y;\n            const nz = p.z;\n            // Project the normal into screen space direction\n            const nx2d = nx * cosY + nz * sinY;\n            const ny2d = ny * cosX - (-nx * sinY + nz * cosY) * sinX;\n            const nLen = Math.sqrt(nx2d * nx2d + ny2d * ny2d) || 1;\n            const bulgePx = 14 * eased;\n            bulgeAmount = bulgePx;\n            px += (nx2d / nLen) * bulgePx;\n            py += (ny2d / nLen) * bulgePx;\n          }\n        }\n\n        return { px, py, scale, z: z2, isOrbit: p.isOrbit, latIdx: p.latIdx, lonIdx: p.lonIdx, distToCursor, bulgeAmount };\n      });\n\n      /* ── Closest node for accent highlight ── */\n      let closestNodeIdx = -1;\n      let minCursorDist = 65;\n      if (interactiveDots && mouseRef.current.isOver) {\n        projected.forEach((p, idx) => {\n          if (p.z > -20 && p.distToCursor < minCursorDist) {\n            minCursorDist = p.distToCursor;\n            closestNodeIdx = idx;\n          }\n        });\n      }\n\n      const isDark =\n        document.documentElement.classList.contains(\"dark\") ||\n        window.getComputedStyle(canvas).color === \"rgb(255, 255, 255)\";\n      const wireStrokeBase = isDark ? \"rgba(255, 255, 255,\" : \"rgba(0, 0, 0,\";\n      const dotFillBase = isDark ? \"rgba(255, 255, 255,\" : \"rgba(10, 10, 10,\";\n\n      /* ── Floor shadow ── */\n      ctx.save();\n      const shadowY = cy + sphereRadius * 0.96;\n      const shadowGrad = ctx.createRadialGradient(\n        cx + sphereRadius * 0.2,\n        shadowY,\n        4,\n        cx + sphereRadius * 0.2,\n        shadowY,\n        sphereRadius * 0.55\n      );\n      shadowGrad.addColorStop(0, isDark ? \"rgba(255,255,255,0.07)\" : \"rgba(0,0,0,0.12)\");\n      shadowGrad.addColorStop(0.6, isDark ? \"rgba(255,255,255,0.02)\" : \"rgba(0,0,0,0.04)\");\n      shadowGrad.addColorStop(1, \"transparent\");\n      ctx.fillStyle = shadowGrad;\n      ctx.beginPath();\n      ctx.ellipse(cx + sphereRadius * 0.2, shadowY, sphereRadius * 0.55, 14, 0, 0, Math.PI * 2);\n      ctx.fill();\n      ctx.restore();\n\n      /* ── Latitude wireframe rings ── */\n      for (let lat = 1; lat < sphereData.numLat; lat++) {\n        ctx.beginPath();\n        let started = false;\n        for (let lon = 0; lon <= sphereData.numLon; lon++) {\n          const lonWrapped = lon % sphereData.numLon;\n          const pt = projected.find((p) => p.latIdx === lat && p.lonIdx === lonWrapped);\n          if (!pt) continue;\n          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }\n          else ctx.lineTo(pt.px, pt.py);\n        }\n        ctx.strokeStyle = `${wireStrokeBase} 0.07)`;\n        ctx.lineWidth = 0.75;\n        ctx.stroke();\n      }\n\n      /* ── Longitude arcs ── */\n      for (let lon = 0; lon < sphereData.numLon; lon += 2) {\n        ctx.beginPath();\n        let started = false;\n        for (let lat = 1; lat < sphereData.numLat; lat++) {\n          const pt = projected.find((p) => p.latIdx === lat && p.lonIdx === lon);\n          if (!pt) continue;\n          if (!started) { ctx.moveTo(pt.px, pt.py); started = true; }\n          else ctx.lineTo(pt.px, pt.py);\n        }\n        ctx.strokeStyle = `${wireStrokeBase} 0.06)`;\n        ctx.lineWidth = 0.75;\n        ctx.stroke();\n      }\n\n      /* ── Tilted orbital ring (dashed) ── */\n      ctx.beginPath();\n      let orbitStarted = false;\n      const orbitNodes = projected.filter((p) => p.isOrbit);\n      orbitNodes.forEach((pt) => {\n        if (!orbitStarted) { ctx.moveTo(pt.px, pt.py); orbitStarted = true; }\n        else ctx.lineTo(pt.px, pt.py);\n      });\n      if (orbitNodes.length > 0) ctx.lineTo(orbitNodes[0].px, orbitNodes[0].py);\n      ctx.setLineDash([2.5, 3.5]);\n      ctx.strokeStyle = `${wireStrokeBase} 0.22)`;\n      ctx.lineWidth = 1;\n      ctx.stroke();\n      ctx.setLineDash([]);\n\n      /* ── Dots with BULGE size ── */\n      projected.forEach((p, idx) => {\n        if (p.isOrbit) return;\n        const depthAlpha = Math.max(0.12, Math.min(0.9, (p.z + 120) / 240));\n        const isHovered = idx === closestNodeIdx;\n\n        // Base dot size + bulge enlargement\n        let radius = Math.max(0.7, p.scale * 1.7);\n        if (p.bulgeAmount > 0) {\n          // Scale up the dot proportionally to bulge\n          radius = radius + p.bulgeAmount * 0.18;\n        }\n        if (isHovered) radius = Math.max(radius, 3.6);\n\n        ctx.beginPath();\n        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);\n\n        if (isHovered) {\n          // Clean subtle white highlight on hovered dot (no green, no radar rings)\n          ctx.fillStyle = isDark ? \"rgba(255, 255, 255, 0.95)\" : \"rgba(0, 0, 0, 0.95)\";\n        } else if (p.bulgeAmount > 0) {\n          // Slightly brighter/larger bulge dots\n          const ba = Math.min(1, depthAlpha + p.bulgeAmount * 0.025);\n          ctx.fillStyle = `${dotFillBase} ${ba})`;\n        } else {\n          ctx.fillStyle = `${dotFillBase} ${depthAlpha})`;\n        }\n        ctx.fill();\n      });\n\n      ctx.restore();\n      animId = requestAnimationFrame(render);\n    };\n\n    animId = requestAnimationFrame(render);\n    return () => cancelAnimationFrame(animId);\n  }, [sphereData, sphereMotion, rotationSpeed, interactiveDots]);\n\n  /* ── Canvas mouse handlers ── */\n  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const rect = canvas.getBoundingClientRect();\n    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isOver: true };\n  };\n  const handleMouseEnter = () => { mouseRef.current.isOver = true; };\n  const handleMouseLeave = () => { mouseRef.current.isOver = false; };\n\n  /* ── Form transitions ── */\n  const switchToSignUp = () => {\n    setTransitionState(\"exit\");\n    setSubmittedMessage(null);\n    setTimeout(() => {\n      setFormMode(\"signup\");\n      setTransitionState(\"enter\");\n      setTimeout(() => setTransitionState(\"idle\"), 350);\n    }, 280);\n  };\n\n  const switchToLogin = () => {\n    setTransitionState(\"exit\");\n    setSubmittedMessage(null);\n    setTimeout(() => {\n      setFormMode(\"login\");\n      setTransitionState(\"enter\");\n      setTimeout(() => setTransitionState(\"idle\"), 350);\n    }, 280);\n  };\n\n  /* ── Submit handlers ── */\n  const handleLoginSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (isSubmitting) return;\n    setIsSubmitting(true);\n    setSubmittedMessage(null);\n    setTimeout(() => {\n      setIsSubmitting(false);\n      setSubmittedMessage(\"Authenticated session initialized.\");\n      onSubmit?.({ email, password });\n    }, 800);\n  };\n\n  const handleSignUpSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (isSubmitting) return;\n    if (signUpPassword !== signUpConfirm) {\n      setSubmittedMessage(\"⚠ Passwords do not match.\");\n      return;\n    }\n    setIsSubmitting(true);\n    setSubmittedMessage(null);\n    setTimeout(() => {\n      setIsSubmitting(false);\n      setSubmittedMessage(\"Account created successfully!\");\n      onSignUp?.({ name: signUpName, email: signUpEmail, password: signUpPassword });\n    }, 900);\n  };\n\n  /* ── Transition style helpers ── */\n  const transitionStyle: React.CSSProperties = {\n    transition: \"opacity 0.28s ease, transform 0.28s ease\",\n    opacity: transitionState === \"exit\" ? 0 : 1,\n    transform:\n      transitionState === \"exit\"\n        ? formMode === \"login\"\n          ? \"translateX(-24px)\"\n          : \"translateX(24px)\"\n        : transitionState === \"enter\"\n        ? `translateX(${formMode === \"signup\" ? \"-12px\" : \"12px\"})`\n        : \"translateX(0)\",\n  };\n\n  return (\n    <div\n      className={cn(\n        \"kilo-ml-card w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-2 sm:p-4 select-none\",\n        className\n      )}\n      {...props}\n    >\n      {/* ============================================================ */}\n      {/* 1. LEFT CARD: 3D SPATIAL SPHERE ACCESS PORTAL                */}\n      {/* ============================================================ */}\n      <div\n        style={{ borderRadius: `${activeRadius}px` }}\n        className={cn(\n          \"relative flex flex-col justify-between aspect-[3/4] min-h-[440px] p-5 sm:p-6 overflow-hidden transition-all duration-300\",\n          \"border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm\",\n          \"hover:border-[var(--border-hover)]\"\n        )}\n      >\n        {/* Corner reticles */}\n        <span className=\"absolute top-3.5 left-3.5 font-mono text-[11px] leading-none text-[var(--text-muted)] pointer-events-none\" aria-hidden=\"true\">┌</span>\n        <span className=\"absolute bottom-3.5 left-3.5 font-mono text-[11px] leading-none text-[var(--text-muted)] pointer-events-none\" aria-hidden=\"true\">└</span>\n        <span className=\"absolute bottom-3.5 right-3.5 font-mono text-[11px] leading-none text-[var(--text-muted)] pointer-events-none\" aria-hidden=\"true\">┘</span>\n\n        {/* Full-bleed 3D Sphere Canvas — cursor-default, no pointer */}\n        <canvas\n          ref={canvasRef}\n          onMouseMove={handleMouseMove}\n          onMouseEnter={handleMouseEnter}\n          onMouseLeave={handleMouseLeave}\n          className=\"absolute inset-0 w-full h-full cursor-default block z-0\"\n          style={{ pointerEvents: \"auto\" }}\n        />\n\n        {/* Top Bar */}\n        <div className=\"relative z-10 pointer-events-none flex items-start justify-between w-full\">\n          <div className=\"flex items-center gap-2 pl-3 pt-0.5\">\n            <span className=\"font-mono text-[10px] tracking-widest text-[var(--text-secondary)] font-medium uppercase\">{portalTitle}</span>\n          </div>\n          <div className=\"flex items-center gap-3 pr-2\">\n            <span className=\"font-mono text-xs text-[var(--text-muted)] font-light\">+</span>\n            <div className=\"grid grid-cols-5 gap-1 opacity-40\">\n              {Array.from({ length: 15 }).map((_, i) => (\n                <span key={i} className=\"h-0.5 w-0.5 rounded-full bg-[var(--text-secondary)]\" />\n              ))}\n            </div>\n          </div>\n        </div>\n\n        <div className=\"flex-1 pointer-events-none\" />\n\n        {/* Bottom Bar */}\n        <div className=\"relative z-10 pointer-events-none flex items-end justify-between w-full\">\n          <div className=\"flex items-center gap-2.5 pl-3 pb-0.5\">\n            <div className=\"flex items-center gap-0.5 h-3\">\n              <span className=\"w-0.5 h-1.5 bg-[var(--text-secondary)] rounded-full animate-pulse\" />\n              <span className=\"w-0.5 h-3.5 bg-[var(--text-primary)] rounded-full\" />\n              <span className=\"w-0.5 h-2.5 bg-[var(--text-secondary)] rounded-full animate-pulse\" />\n              <span className=\"w-0.5 h-4 bg-[var(--text-primary)] rounded-full\" />\n              <span className=\"w-0.5 h-1 bg-[var(--text-secondary)] rounded-full\" />\n            </div>\n            <span className=\"font-mono text-[9px] tracking-widest text-[var(--text-secondary)] font-semibold uppercase\">{portalSubtitle}</span>\n          </div>\n          <div className=\"flex items-center gap-2.5 pr-2 pb-0.5\">\n            <span className=\"font-mono text-xs text-[var(--text-muted)] font-light\">+</span>\n            <div className=\"grid grid-cols-5 gap-1 opacity-40\">\n              {Array.from({ length: 15 }).map((_, i) => (\n                <span key={i} className=\"h-0.5 w-0.5 rounded-full bg-[var(--text-secondary)]\" />\n              ))}\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* ============================================================ */}\n      {/* 2. RIGHT CARD: LOGIN / SIGN-UP FORM (animated transition)    */}\n      {/* ============================================================ */}\n      <div\n        style={{ borderRadius: `${activeRadius}px` }}\n        className={cn(\n          \"relative flex flex-col justify-between aspect-[3/4] min-h-[440px] overflow-hidden transition-all duration-300\",\n          \"border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm\",\n          \"hover:border-[var(--border-hover)]\"\n        )}\n      >\n        {/* Animated form wrapper */}\n        <div className=\"flex flex-col justify-between h-full p-6 sm:p-9\" style={transitionStyle}>\n\n          {/* ─── LOGIN FORM ─── */}\n          {formMode === \"login\" && (\n            <form onSubmit={handleLoginSubmit} className=\"flex flex-col justify-between h-full\">\n              {/* Header */}\n              <div className=\"space-y-2 pt-2\">\n                <div className=\"font-mono text-[10px] tracking-[0.25em] font-medium text-[var(--text-muted)] uppercase\">{welcomeTitle}</div>\n                <h2 className=\"text-3xl sm:text-4xl font-normal tracking-tight text-[var(--text-primary)]\">{title}</h2>\n              </div>\n\n              {/* Fields */}\n              <div className=\"space-y-4 my-auto py-4\">\n                {/* Email Field */}\n                <div className=\"space-y-1.5 group\">\n                  <label htmlFor=\"ml-email\" className=\"block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase\">\n                    {emailLabel}\n                  </label>\n                  <div\n                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : \"0px\" }}\n                    className={cn(\n                      \"relative flex items-center h-11 px-3.5 transition-all duration-200\",\n                      \"bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80\",\n                      \"border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20\"\n                    )}\n                  >\n                    <Mail className=\"h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5\" />\n                    <input\n                      id=\"ml-email\"\n                      type=\"email\"\n                      required\n                      value={email}\n                      onChange={(e) => setEmail(e.target.value)}\n                      placeholder=\"name@domain.com\"\n                      className=\"w-full bg-transparent border-0 p-0 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50\"\n                    />\n                  </div>\n                </div>\n\n                {/* Password Field */}\n                <div className=\"space-y-1.5 group\">\n                  <label htmlFor=\"ml-password\" className=\"block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase\">\n                    {passwordLabel}\n                  </label>\n                  <div\n                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : \"0px\" }}\n                    className={cn(\n                      \"relative flex items-center h-11 px-3.5 transition-all duration-200\",\n                      \"bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80\",\n                      \"border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20\"\n                    )}\n                  >\n                    <Lock className=\"h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5\" />\n                    <input\n                      id=\"ml-password\"\n                      type={showPassword ? \"text\" : \"password\"}\n                      required\n                      value={password}\n                      onChange={(e) => setPassword(e.target.value)}\n                      placeholder=\"••••••••••••\"\n                      className=\"w-full bg-transparent border-0 p-0 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50\"\n                    />\n                    <button\n                      type=\"button\"\n                      onClick={() => setShowPassword(!showPassword)}\n                      tabIndex={-1}\n                      aria-label={showPassword ? \"Hide password\" : \"Show password\"}\n                      className=\"text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1 cursor-pointer shrink-0\"\n                    >\n                      {showPassword ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}\n                    </button>\n                  </div>\n                </div>\n\n                <div className=\"space-y-3 pt-2\">\n                  <button\n                    type=\"submit\"\n                    disabled={isSubmitting}\n                    style={{ borderRadius: isRounded ? `${Math.max(4, activeRadius * 0.4)}px` : \"0px\" }}\n                    className={cn(\n                      \"w-full h-11 flex items-center justify-center font-sans text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer\",\n                      \"bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 active:scale-[0.99]\",\n                      \"disabled:opacity-60 disabled:cursor-not-allowed shadow-xs\"\n                    )}\n                  >\n                    {isSubmitting ? (\n                      <span className=\"flex items-center gap-2\"><Loader2 className=\"h-4 w-4 animate-spin\" /><span>Verifying...</span></span>\n                    ) : (\n                      <span>{submitLabel}</span>\n                    )}\n                  </button>\n                  <div className=\"flex items-center justify-start\">\n                    <button\n                      type=\"button\"\n                      onClick={onForgotPassword}\n                      className=\"font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 transition-colors cursor-pointer\"\n                    >\n                      {forgotPasswordLabel}\n                    </button>\n                  </div>\n                </div>\n\n                {submittedMessage && (\n                  <div className=\"p-2.5 rounded bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--accent-green)] flex items-center gap-2 animate-in fade-in\">\n                    <Sparkles className=\"h-3.5 w-3.5 shrink-0\" />\n                    <span>{submittedMessage}</span>\n                  </div>\n                )}\n              </div>\n\n              {/* Footer */}\n              <div className=\"pt-4 border-t border-[var(--border)]/60\">\n                <button\n                  type=\"button\"\n                  onClick={switchToSignUp}\n                  className=\"group/create inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-medium text-[var(--text-primary)] hover:opacity-80 transition-opacity cursor-pointer\"\n                >\n                  <span>{createAccountLabel}</span>\n                  <ArrowRight className=\"h-3.5 w-3.5 transition-transform duration-200 group-hover/create:translate-x-1\" />\n                </button>\n              </div>\n            </form>\n          )}\n\n          {/* ─── SIGN-UP FORM ─── */}\n          {formMode === \"signup\" && (\n            <form onSubmit={handleSignUpSubmit} className=\"flex flex-col justify-between h-full\">\n              {/* Header */}\n              <div className=\"space-y-2 pt-2\">\n                <div className=\"font-mono text-[10px] tracking-[0.25em] font-medium text-[var(--text-muted)] uppercase\">NEW IDENTITY</div>\n                <h2 className=\"text-3xl sm:text-4xl font-normal tracking-tight text-[var(--text-primary)]\">Sign up</h2>\n              </div>\n\n              {/* Fields */}\n              <div className=\"space-y-3.5 my-auto py-2\">\n                {/* Name */}\n                <div className=\"space-y-1 group\">\n                  <label htmlFor=\"su-name\" className=\"block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase\">FULL NAME</label>\n                  <div\n                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : \"0px\" }}\n                    className={cn(\n                      \"relative flex items-center h-10 px-3 transition-all duration-200\",\n                      \"bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80\",\n                      \"border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20\"\n                    )}\n                  >\n                    <User className=\"h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5\" />\n                    <input\n                      id=\"su-name\"\n                      type=\"text\"\n                      required\n                      value={signUpName}\n                      onChange={(e) => setSignUpName(e.target.value)}\n                      placeholder=\"Your name\"\n                      className=\"w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50\"\n                    />\n                  </div>\n                </div>\n\n                {/* Email */}\n                <div className=\"space-y-1 group\">\n                  <label htmlFor=\"su-email\" className=\"block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase\">EMAIL</label>\n                  <div\n                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : \"0px\" }}\n                    className={cn(\n                      \"relative flex items-center h-10 px-3 transition-all duration-200\",\n                      \"bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80\",\n                      \"border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20\"\n                    )}\n                  >\n                    <Mail className=\"h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5\" />\n                    <input\n                      id=\"su-email\"\n                      type=\"email\"\n                      required\n                      value={signUpEmail}\n                      onChange={(e) => setSignUpEmail(e.target.value)}\n                      placeholder=\"name@domain.com\"\n                      className=\"w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50\"\n                    />\n                  </div>\n                </div>\n\n                {/* Password */}\n                <div className=\"space-y-1 group\">\n                  <label htmlFor=\"su-password\" className=\"block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase\">PASSWORD</label>\n                  <div\n                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : \"0px\" }}\n                    className={cn(\n                      \"relative flex items-center h-10 px-3 transition-all duration-200\",\n                      \"bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80\",\n                      \"border border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20\"\n                    )}\n                  >\n                    <Lock className=\"h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5\" />\n                    <input\n                      id=\"su-password\"\n                      type={showSignUpPassword ? \"text\" : \"password\"}\n                      required\n                      minLength={8}\n                      value={signUpPassword}\n                      onChange={(e) => setSignUpPassword(e.target.value)}\n                      placeholder=\"Min. 8 characters\"\n                      className=\"w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50\"\n                    />\n                    <button\n                      type=\"button\"\n                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}\n                      tabIndex={-1}\n                      aria-label={showSignUpPassword ? \"Hide password\" : \"Show password\"}\n                      className=\"text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1 cursor-pointer shrink-0\"\n                    >\n                      {showSignUpPassword ? <EyeOff className=\"h-3.5 w-3.5\" /> : <Eye className=\"h-3.5 w-3.5\" />}\n                    </button>\n                  </div>\n                </div>\n\n                {/* Confirm Password */}\n                <div className=\"space-y-1 group\">\n                  <label htmlFor=\"su-confirm\" className=\"block font-mono text-[10px] tracking-wider font-semibold text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors uppercase\">CONFIRM PASSWORD</label>\n                  <div\n                    style={{ borderRadius: isRounded ? `${Math.max(6, activeRadius * 0.35)}px` : \"0px\" }}\n                    className={cn(\n                      \"relative flex items-center h-10 px-3 transition-all duration-200\",\n                      \"bg-[var(--surface-secondary)]/50 hover:bg-[var(--surface-secondary)]/80\",\n                      \"border transition-colors\",\n                      signUpConfirm && signUpPassword !== signUpConfirm\n                        ? \"border-red-400 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400/20\"\n                        : \"border-[var(--border)] focus-within:border-[var(--text-primary)] focus-within:ring-1 focus-within:ring-[var(--text-primary)]/20\"\n                    )}\n                  >\n                    <Lock className=\"h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--text-primary)] shrink-0 transition-colors mr-2.5\" />\n                    <input\n                      id=\"su-confirm\"\n                      type={showSignUpConfirm ? \"text\" : \"password\"}\n                      required\n                      value={signUpConfirm}\n                      onChange={(e) => setSignUpConfirm(e.target.value)}\n                      placeholder=\"Repeat password\"\n                      className=\"w-full bg-transparent border-0 p-0 text-xs sm:text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:ring-0 placeholder:text-[var(--text-muted)]/50\"\n                    />\n                    <button\n                      type=\"button\"\n                      onClick={() => setShowSignUpConfirm(!showSignUpConfirm)}\n                      tabIndex={-1}\n                      aria-label={showSignUpConfirm ? \"Hide password\" : \"Show password\"}\n                      className=\"text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1 cursor-pointer shrink-0\"\n                    >\n                      {showSignUpConfirm ? <EyeOff className=\"h-3.5 w-3.5\" /> : <Eye className=\"h-3.5 w-3.5\" />}\n                    </button>\n                  </div>\n                </div>\n\n                <div className=\"space-y-3 pt-1\">\n                  <button\n                    type=\"submit\"\n                    disabled={isSubmitting}\n                    style={{ borderRadius: isRounded ? `${Math.max(4, activeRadius * 0.4)}px` : \"0px\" }}\n                    className={cn(\n                      \"w-full h-11 flex items-center justify-center font-sans text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer\",\n                      \"bg-[var(--text-primary)] text-[var(--bg-main)] hover:opacity-90 active:scale-[0.99]\",\n                      \"disabled:opacity-60 disabled:cursor-not-allowed shadow-xs\"\n                    )}\n                  >\n                    {isSubmitting ? (\n                      <span className=\"flex items-center gap-2\"><Loader2 className=\"h-4 w-4 animate-spin\" /><span>Creating...</span></span>\n                    ) : submittedMessage?.startsWith(\"Account\") ? (\n                      <span className=\"flex items-center gap-2\"><Check className=\"h-4 w-4\" /><span>Done!</span></span>\n                    ) : (\n                      <span>Create account</span>\n                    )}\n                  </button>\n                </div>\n\n                {submittedMessage && (\n                  <div className={cn(\n                    \"p-2.5 rounded border text-xs font-mono flex items-center gap-2 animate-in fade-in\",\n                    submittedMessage.startsWith(\"⚠\")\n                      ? \"bg-red-500/10 border-red-400/30 text-red-400\"\n                      : \"bg-[var(--surface-secondary)] border-[var(--border)] text-[var(--accent-green)]\"\n                  )}>\n                    <Sparkles className=\"h-3.5 w-3.5 shrink-0\" />\n                    <span>{submittedMessage}</span>\n                  </div>\n                )}\n              </div>\n\n              {/* Footer — back to login */}\n              <div className=\"pt-4 border-t border-[var(--border)]/60\">\n                <button\n                  type=\"button\"\n                  onClick={switchToLogin}\n                  className=\"group/back inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer\"\n                >\n                  <ArrowLeft className=\"h-3.5 w-3.5 transition-transform duration-200 group-hover/back:-translate-x-1\" />\n                  <span>Back to sign in</span>\n                </button>\n              </div>\n            </form>\n          )}\n        </div>\n      </div>\n      <style\n        dangerouslySetInnerHTML={{\n          __html: `\n            .kilo-ml-card input:-webkit-autofill,\n            .kilo-ml-card input:-webkit-autofill:hover,\n            .kilo-ml-card input:-webkit-autofill:focus,\n            .kilo-ml-card input:-webkit-autofill:active {\n              -webkit-box-shadow: 0 0 0 1000px #18191c inset !important;\n              -webkit-text-fill-color: #f2f2f0 !important;\n              caret-color: #f2f2f0 !important;\n              transition: background-color 5000s ease-in-out 0s;\n            }\n          `,\n        }}\n      />\n    </div>\n  );\n}\n"
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
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { cn } from \"../lib/utils\";\n\nexport interface DialogProps {\n  open?: boolean;\n  onOpenChange?: (open: boolean) => void;\n  children: React.ReactNode;\n}\n\ninterface DialogContextType {\n  open: boolean;\n  setOpen: (open: boolean) => void;\n}\n\nconst DialogContext = React.createContext<DialogContextType | null>(null);\n\nexport function useDialog() {\n  const context = React.useContext(DialogContext);\n  if (!context) {\n    throw new Error(\"Dialog components must be used within a <Dialog />\");\n  }\n  return context;\n}\n\nexport function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {\n  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);\n  const isControlled = controlledOpen !== undefined;\n  const open = isControlled ? controlledOpen : uncontrolledOpen;\n\n  const setOpen = React.useCallback(\n    (newOpen: boolean) => {\n      if (!isControlled) {\n        setUncontrolledOpen(newOpen);\n      }\n      onOpenChange?.(newOpen);\n    },\n    [isControlled, onOpenChange]\n  );\n\n  return (\n    <DialogContext.Provider value={{ open, setOpen }}>\n      {children}\n    </DialogContext.Provider>\n  );\n}\n\nexport function DialogTrigger({\n  children,\n  className,\n  asChild = false,\n  ...props\n}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {\n  const { setOpen } = useDialog();\n\n  if (asChild && React.isValidElement(children)) {\n    const child = children as React.ReactElement<{\n      onClick?: (e: React.MouseEvent) => void;\n      className?: string;\n    }>;\n    return React.cloneElement(child, {\n      onClick: (e: React.MouseEvent) => {\n        e.stopPropagation();\n        child.props?.onClick?.(e);\n        setOpen(true);\n      },\n    });\n  }\n\n  return (\n    <button\n      type=\"button\"\n      onClick={(e) => {\n        e.stopPropagation();\n        setOpen(true);\n      }}\n      className={className}\n      {...props}\n    >\n      {children}\n    </button>\n  );\n}\n\nexport function DialogContent({\n  children,\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  const { open, setOpen } = useDialog();\n  const [mounted, setMounted] = React.useState(false);\n  const contentRef = React.useRef<HTMLDivElement>(null);\n\n  React.useEffect(() => {\n    setMounted(true);\n  }, []);\n\n  // Close on Escape key\n  React.useEffect(() => {\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\" && open) {\n        setOpen(false);\n      }\n    };\n    if (open) {\n      window.addEventListener(\"keydown\", handleKeyDown);\n      document.body.style.overflow = \"hidden\";\n    }\n    return () => {\n      window.removeEventListener(\"keydown\", handleKeyDown);\n      document.body.style.overflow = \"unset\";\n    };\n  }, [open, setOpen]);\n\n  if (!open || !mounted) return null;\n\n  return createPortal(\n    <div\n      role=\"dialog\"\n      aria-modal=\"true\"\n      className=\"fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200\"\n      onClick={(e) => e.stopPropagation()}\n    >\n      {/* Backdrop */}\n      <div\n        onClick={() => setOpen(false)}\n        className=\"fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity\"\n      />\n\n      {/* Modal Dialog Content - Dark, neutral, precise border */}\n      <div\n        ref={contentRef}\n        onClick={(e) => e.stopPropagation()}\n        className={cn(\n          \"relative z-[10000] w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-[var(--text-primary)] shadow-2xl transition-all animate-in zoom-in-95 duration-200\",\n          className\n        )}\n        {...props}\n      >\n        {children}\n        <button\n          type=\"button\"\n          onClick={() => setOpen(false)}\n          className=\"absolute right-4 top-4 rounded p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer\"\n          aria-label=\"Close dialog\"\n        >\n          <svg\n            className=\"h-4 w-4\"\n            fill=\"none\"\n            viewBox=\"0 0 24 24\"\n            stroke=\"currentColor\"\n            strokeWidth={1.5}\n          >\n            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\" />\n          </svg>\n        </button>\n      </div>\n    </div>,\n    document.body\n  );\n}\n\nexport function DialogHeader({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  return (\n    <div\n      className={cn(\"flex flex-col space-y-1.5 text-left mb-4\", className)}\n      {...props}\n    />\n  );\n}\n\nexport function DialogTitle({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLHeadingElement>) {\n  return (\n    <h2\n      className={cn(\n        \"text-base font-semibold tracking-tight text-[var(--text-primary)]\",\n        className\n      )}\n      {...props}\n    />\n  );\n}\n\nexport function DialogDescription({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLParagraphElement>) {\n  return (\n    <p\n      className={cn(\"text-xs text-[var(--text-secondary)] mt-1 leading-relaxed\", className)}\n      {...props}\n    />\n  );\n}\n\nexport function DialogFooter({\n  className,\n  ...props\n}: React.HTMLAttributes<HTMLDivElement>) {\n  return (\n    <div\n      className={cn(\n        \"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0 pt-4 border-t border-[var(--border)]\",\n        className\n      )}\n      {...props}\n    />\n  );\n}\n"
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
      "accent",
      "destructive",
      "pill"
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
        "type": "'default' | 'secondary' | 'outline' | 'accent' | 'destructive' | 'pill'",
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
    "description": "Segmented tab controls supporting default, slide, liquid-pill, island, and minimal styles with subpixel indicator physics.",
    "variants": [
      "default",
      "slide",
      "liquid-pill",
      "island",
      "minimal"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Tabs, TabsList, TabsTrigger, TabsContent } from \"@/components/ui/tabs\";\n\nexport function TabsDemo() {\n  return (\n    <Tabs defaultValue=\"overview\" variant=\"liquid-pill\" pillStyle=\"liquid-glow\">\n      <TabsList>\n        <TabsTrigger value=\"overview\">Overview</TabsTrigger>\n        <TabsTrigger value=\"metrics\">Metrics</TabsTrigger>\n        <TabsTrigger value=\"logs\" badge=\"Live\">Logs</TabsTrigger>\n        <TabsTrigger value=\"settings\">Settings</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\">\n        <p className=\"text-xs p-4 text-[var(--text-secondary)]\">Cluster healthy and operational across 8 zones.</p>\n      </TabsContent>\n      <TabsContent value=\"metrics\">\n        <p className=\"text-xs p-4 text-[var(--text-secondary)]\">CPU: 12% • Memory: 1.4GB / 4GB</p>\n      </TabsContent>\n      <TabsContent value=\"logs\">\n        <p className=\"text-xs p-4 font-mono text-[var(--text-muted)]\">[14:22:04] Ready on 0.0.0.0:3000</p>\n      </TabsContent>\n      <TabsContent value=\"settings\">\n        <p className=\"text-xs p-4 text-[var(--text-secondary)]\">Workspace environment settings.</p>\n      </TabsContent>\n    </Tabs>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'default' | 'slide' | 'liquid-pill' | 'island' | 'minimal'",
        "defaultValue": "'default'",
        "description": "Visual navigation architecture and indicator animation style."
      },
      {
        "name": "pillStyle",
        "type": "'liquid-glow' | 'solid' | 'glass' | 'accent'",
        "defaultValue": "'liquid-glow'",
        "description": "Color and glass treatment for liquid-pill and island variants."
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
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"../lib/utils\";\n\nexport type TabsVariant = \"default\" | \"slide\" | \"liquid-pill\" | \"island\" | \"minimal\";\nexport type TabsPillStyle = \"liquid-glow\" | \"solid\" | \"glass\" | \"accent\";\n\ninterface TabsContextType {\n  value: string;\n  onValueChange: (val: string) => void;\n  variant: TabsVariant;\n  pillStyle: TabsPillStyle;\n  direction: number; // 1 = moving right, -1 = moving left, 0 = neutral\n  tabOrder: string[];\n  registerTab: (val: string) => void;\n  unregisterTab: (val: string) => void;\n}\n\nconst TabsContext = React.createContext<TabsContextType | null>(null);\n\nexport function useTabs() {\n  const context = React.useContext(TabsContext);\n  if (!context) {\n    throw new Error(\"Tabs components must be used within a <Tabs />\");\n  }\n  return context;\n}\n\nexport interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {\n  value?: string;\n  defaultValue?: string;\n  onValueChange?: (value: string) => void;\n  variant?: TabsVariant;\n  pillStyle?: TabsPillStyle;\n}\n\nexport function Tabs({\n  value: controlledValue,\n  defaultValue = \"\",\n  onValueChange,\n  variant = \"default\",\n  pillStyle = \"liquid-glow\",\n  className,\n  children,\n  ...props\n}: TabsProps) {\n  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);\n  const isControlled = controlledValue !== undefined;\n  const value = isControlled ? controlledValue : uncontrolledValue;\n\n  const [tabOrder, setTabOrder] = React.useState<string[]>([]);\n  const [direction, setDirection] = React.useState<number>(0);\n  const prevValueRef = React.useRef(value);\n\n  const registerTab = React.useCallback((tabVal: string) => {\n    setTabOrder((prev) => (prev.includes(tabVal) ? prev : [...prev, tabVal]));\n  }, []);\n\n  const unregisterTab = React.useCallback((tabVal: string) => {\n    setTabOrder((prev) => prev.filter((t) => t !== tabVal));\n  }, []);\n\n  React.useEffect(() => {\n    if (prevValueRef.current !== value) {\n      const prevIdx = tabOrder.indexOf(prevValueRef.current);\n      const curIdx = tabOrder.indexOf(value);\n      if (prevIdx !== -1 && curIdx !== -1) {\n        setDirection(curIdx > prevIdx ? 1 : -1);\n      }\n      prevValueRef.current = value;\n    }\n  }, [value, tabOrder]);\n\n  const handleValueChange = (newVal: string) => {\n    const prevIdx = tabOrder.indexOf(value);\n    const curIdx = tabOrder.indexOf(newVal);\n    if (prevIdx !== -1 && curIdx !== -1) {\n      setDirection(curIdx > prevIdx ? 1 : -1);\n    }\n    if (!isControlled) {\n      setUncontrolledValue(newVal);\n    }\n    onValueChange?.(newVal);\n  };\n\n  return (\n    <TabsContext.Provider\n      value={{\n        value,\n        onValueChange: handleValueChange,\n        variant,\n        pillStyle,\n        direction,\n        tabOrder,\n        registerTab,\n        unregisterTab,\n      }}\n    >\n      <div\n        className={cn(\n          \"w-full flex flex-col\",\n          (variant === \"slide\" || variant === \"liquid-pill\" || variant === \"island\") &&\n            \"relative overflow-x-clip\",\n          className\n        )}\n        {...props}\n      >\n        {children}\n      </div>\n    </TabsContext.Provider>\n  );\n}\n\nexport interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {\n  variant?: TabsVariant;\n  pillStyle?: TabsPillStyle;\n}\n\nexport function TabsList({\n  variant: listVariantOverride,\n  pillStyle: listPillStyleOverride,\n  className,\n  children,\n  ...props\n}: TabsListProps) {\n  const { value, variant: contextVariant, pillStyle: contextPillStyle } = useTabs();\n  const variant = listVariantOverride || contextVariant;\n  const pillStyle = listPillStyleOverride || contextPillStyle;\n\n  const listRef = React.useRef<HTMLDivElement>(null);\n  const [indicatorStyle, setIndicatorStyle] = React.useState<{\n    left: number;\n    width: number;\n    height: number;\n    top: number;\n  } | null>(null);\n\n  const updateIndicator = React.useCallback(() => {\n    const list = listRef.current;\n    if (!list) return;\n    const activeTrigger = list.querySelector<HTMLElement>(\n      '[role=\"tab\"][aria-selected=\"true\"]'\n    );\n    if (!activeTrigger) {\n      setIndicatorStyle(null);\n      return;\n    }\n\n    const listRect = list.getBoundingClientRect();\n    const triggerRect = activeTrigger.getBoundingClientRect();\n    const borderLeft = list.clientLeft || 0;\n    const borderTop = list.clientTop || 0;\n\n    setIndicatorStyle({\n      left: triggerRect.left - (listRect.left + borderLeft) + list.scrollLeft,\n      top: triggerRect.top - (listRect.top + borderTop) + list.scrollTop,\n      width: triggerRect.width,\n      height: triggerRect.height,\n    });\n  }, []);\n\n  React.useEffect(() => {\n    const list = listRef.current;\n    updateIndicator();\n    const rAf = requestAnimationFrame(updateIndicator);\n    const timer1 = setTimeout(updateIndicator, 50);\n    const timer2 = setTimeout(updateIndicator, 200);\n    const handleResize = () => updateIndicator();\n    window.addEventListener(\"resize\", handleResize);\n    if (list) list.addEventListener(\"scroll\", updateIndicator);\n\n    let ro: ResizeObserver | null = null;\n    if (typeof ResizeObserver !== \"undefined\" && list) {\n      ro = new ResizeObserver(() => updateIndicator());\n      ro.observe(list);\n      const activeTrigger = list.querySelector<HTMLElement>(\n        '[role=\"tab\"][aria-selected=\"true\"]'\n      );\n      if (activeTrigger) ro.observe(activeTrigger);\n    }\n\n    if (typeof document !== \"undefined\" && document.fonts?.ready) {\n      document.fonts.ready.then(updateIndicator).catch(() => {});\n    }\n\n    return () => {\n      cancelAnimationFrame(rAf);\n      clearTimeout(timer1);\n      clearTimeout(timer2);\n      window.removeEventListener(\"resize\", handleResize);\n      if (list) list.removeEventListener(\"scroll\", updateIndicator);\n      ro?.disconnect();\n    };\n  }, [value, variant, updateIndicator]);\n\n  const pillThemeClasses = {\n    \"liquid-glow\":\n      \"bg-[var(--accent-green)]/15 text-[var(--accent-green)] border border-[var(--accent-green)]/35 shadow-xs\",\n    solid:\n      \"bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] shadow-xs\",\n    glass:\n      \"bg-white/10 dark:bg-white/15 backdrop-blur-md text-[var(--text-primary)] border border-white/20 shadow-xs\",\n    accent:\n      \"bg-neutral-900 dark:bg-white text-white dark:text-black border border-neutral-800 dark:border-white/20 shadow-md\",\n  }[pillStyle];\n\n  const hasSlidingPill =\n    variant === \"slide\" || variant === \"liquid-pill\" || variant === \"island\";\n\n  return (\n    <div\n      ref={listRef}\n      role=\"tablist\"\n      className={cn(\n        \"relative inline-flex items-center select-none max-w-full overflow-x-auto scrollbar-none\",\n        variant === \"default\" &&\n          \"rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text-muted)]\",\n        variant === \"slide\" &&\n          \"rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text-muted)]\",\n        variant === \"liquid-pill\" &&\n          \"rounded-xl border border-[var(--border)]/70 bg-[var(--surface-secondary)]/90 backdrop-blur-md p-1.5\",\n        variant === \"island\" &&\n          \"rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xl shadow-lg p-2\",\n        variant === \"minimal\" &&\n          \"border-b border-[var(--border)] bg-transparent p-0 rounded-none gap-4 sm:gap-6 pb-px\",\n        className\n      )}\n      {...props}\n    >\n      {/* Sliding Active Pill Indicator */}\n      {hasSlidingPill && indicatorStyle && (\n        <span\n          aria-hidden=\"true\"\n          className={cn(\n            \"absolute left-0 top-0 pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0\",\n            variant === \"slide\" &&\n              \"rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] shadow-xs\",\n            (variant === \"liquid-pill\" || variant === \"island\") &&\n              cn(\"rounded-lg\", pillThemeClasses)\n          )}\n          style={{\n            transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,\n            width: `${indicatorStyle.width}px`,\n            height: `${indicatorStyle.height}px`,\n          }}\n        />\n      )}\n\n      {/* Minimal Underline Indicator */}\n      {variant === \"minimal\" && indicatorStyle && (\n        <span\n          aria-hidden=\"true\"\n          className=\"absolute left-0 bottom-0 h-0.5 rounded-full bg-[var(--accent-green)] pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0\"\n          style={{\n            transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,\n            width: `${indicatorStyle.width}px`,\n          }}\n        />\n      )}\n\n      {children}\n    </div>\n  );\n}\n\nexport interface TabsTriggerProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  value: string;\n  badge?: string | number;\n  icon?: React.ReactNode;\n}\n\nexport function TabsTrigger({\n  value: triggerValue,\n  badge,\n  icon,\n  className,\n  children,\n  ...props\n}: TabsTriggerProps) {\n  const { value, onValueChange, variant, pillStyle, registerTab, unregisterTab } = useTabs();\n  const isSelected = value === triggerValue;\n\n  React.useEffect(() => {\n    registerTab(triggerValue);\n    return () => unregisterTab(triggerValue);\n  }, [triggerValue, registerTab, unregisterTab]);\n\n  return (\n    <button\n      type=\"button\"\n      role=\"tab\"\n      aria-selected={isSelected}\n      onClick={() => onValueChange(triggerValue)}\n      className={cn(\n        \"relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-colors select-none cursor-pointer shrink-0\",\n        \"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-green)] active:scale-[0.97]\",\n        // 1. Default variant\n        variant === \"default\" && [\n          \"rounded px-3 py-1.5\",\n          isSelected\n            ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold shadow-xs\"\n            : \"text-[var(--text-muted)] hover:text-[var(--text-primary)]\",\n        ],\n        // 2. Slide variant\n        variant === \"slide\" && [\n          \"rounded px-3 py-1.5\",\n          isSelected\n            ? \"text-[var(--text-primary)] font-semibold\"\n            : \"text-[var(--text-muted)] hover:text-[var(--text-primary)]\",\n        ],\n        // 3. Liquid Pill & Island variants\n        (variant === \"liquid-pill\" || variant === \"island\") && [\n          \"rounded-lg px-4 py-2 font-mono text-xs sm:text-sm\",\n          isSelected\n            ? pillStyle === \"accent\"\n              ? \"text-white dark:text-black font-semibold\"\n              : pillStyle === \"liquid-glow\"\n              ? \"text-[var(--accent-green)] font-semibold\"\n              : \"text-[var(--text-primary)] font-semibold\"\n            : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)]\",\n        ],\n        // 4. Minimal variant\n        variant === \"minimal\" && [\n          \"px-2 py-2.5 font-mono text-xs sm:text-sm border-0 bg-transparent rounded-none\",\n          isSelected\n            ? \"text-[var(--text-primary)] font-semibold\"\n            : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)]\",\n        ],\n        className\n      )}\n      {...props}\n    >\n      {icon && <span className=\"shrink-0\">{icon}</span>}\n      <span>{children}</span>\n      {badge && (\n        <span\n          className={cn(\n            \"ml-1 rounded px-1.5 py-0.5 text-[9px] font-mono font-medium tracking-wide transition-colors\",\n            isSelected\n              ? pillStyle === \"accent\" && (variant === \"liquid-pill\" || variant === \"island\")\n                ? \"bg-white/20 dark:bg-black/15 text-white dark:text-black\"\n                : \"bg-[var(--accent-green)]/20 text-[var(--accent-green)]\"\n              : \"bg-[var(--surface-tertiary)] text-[var(--text-muted)]\"\n          )}\n        >\n          {badge}\n        </span>\n      )}\n    </button>\n  );\n}\n\nexport interface TabsContentProps\n  extends React.HTMLAttributes<HTMLDivElement> {\n  value: string;\n}\n\nexport function TabsContent({\n  value: contentValue,\n  className,\n  children,\n  ...props\n}: TabsContentProps) {\n  const { value, variant, direction } = useTabs();\n  const isSelected = value === contentValue;\n\n  const isAnimated =\n    variant === \"slide\" || variant === \"liquid-pill\" || variant === \"island\";\n\n  if (isAnimated) {\n    return (\n      <div\n        role=\"tabpanel\"\n        tabIndex={0}\n        aria-hidden={!isSelected}\n        className={cn(\n          \"w-full focus-visible:outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity]\",\n          isSelected\n            ? \"opacity-100 translate-x-0 relative pointer-events-auto\"\n            : direction >= 0\n            ? \"opacity-0 -translate-x-6 absolute top-0 left-0 right-0 pointer-events-none invisible h-0 max-h-0 overflow-hidden\"\n            : \"opacity-0 translate-x-6 absolute top-0 left-0 right-0 pointer-events-none invisible h-0 max-h-0 overflow-hidden\",\n          className\n        )}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n\n  if (!isSelected) return null;\n\n  return (\n    <div\n      role=\"tabpanel\"\n      tabIndex={0}\n      className={cn(\"mt-3 focus-visible:outline-none text-xs\", className)}\n      {...props}\n    >\n      {children}\n    </div>\n  );\n}\n"
      }
    ]
  },
  "notched-navbar": {
    "name": "notched-navbar",
    "category": "Navigation",
    "title": "Notched Navbar",
    "description": "Signature parametric S-curve notched navigation frame with contrast backdrop, continuous bezier fillets, and top, down, left, and right notch positions.",
    "variants": [
      "default",
      "down",
      "left",
      "right"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { NotchedNavbar } from \"@/components/ui/notched-navbar\";\nimport * as React from \"react\";\n\nexport function NotchedNavbarDemo() {\n  const [activeTab, setActiveTab] = React.useState(\"home\");\n\n  return (\n    <NotchedNavbar\n      activeLink={activeTab}\n      onLinkClick={(id) => setActiveTab(id)}\n      variant=\"default\"\n    >\n      <div className=\"p-6 space-y-4\">\n        <div className=\"flex items-center justify-between border-b border-white/10 pb-3\">\n          <h3 className=\"text-base font-semibold text-white\">Infrastructure Telemetry</h3>\n          <span className=\"text-[11px] font-mono text-emerald-400\">Operational</span>\n        </div>\n        <div className=\"grid grid-cols-3 gap-3\">\n          <div className=\"p-3 rounded-lg bg-white/5 border border-white/10\">\n            <span className=\"text-[10px] text-neutral-400 uppercase\">Requests</span>\n            <div className=\"text-lg font-bold text-white\">1.4M</div>\n          </div>\n          <div className=\"p-3 rounded-lg bg-white/5 border border-white/10\">\n            <span className=\"text-[10px] text-neutral-400 uppercase\">Latency</span>\n            <div className=\"text-lg font-bold text-white\">24ms</div>\n          </div>\n          <div className=\"p-3 rounded-lg bg-white/5 border border-white/10\">\n            <span className=\"text-[10px] text-neutral-400 uppercase\">Uptime</span>\n            <div className=\"text-lg font-bold text-white\">99.9%</div>\n          </div>\n        </div>\n      </div>\n    </NotchedNavbar>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'default' | 'down' | 'bottom' | 'left' | 'right' | 'compact' | 'deep-notch' | 'dark-slate'",
        "defaultValue": "'default'",
        "description": "Visual variant and notch position preset (default/top, down, left, right)."
      },
      {
        "name": "position",
        "type": "'top' | 'down' | 'bottom' | 'left' | 'right'",
        "defaultValue": "'top'",
        "description": "Explicit placement of the notch cutout along the frame edge."
      },
      {
        "name": "notchWidth",
        "type": "number",
        "defaultValue": "540",
        "description": "Width or span in pixels of the recessed notch opening (540 horizontal, 280 vertical)."
      },
      {
        "name": "notchHeight",
        "type": "number",
        "defaultValue": "42",
        "description": "Vertical depth or inset in pixels of the notch cutout (42 horizontal, 54 vertical)."
      },
      {
        "name": "filletWidth",
        "type": "number",
        "defaultValue": "24",
        "description": "Span of the continuous cubic bezier S-curve fillet."
      },
      {
        "name": "borderRadius",
        "type": "number",
        "defaultValue": "14",
        "description": "Corner radius of the framed canvas."
      },
      {
        "name": "whiteBoxPadding",
        "type": "number",
        "defaultValue": "8",
        "description": "Inset padding around the dark frame exposing the backdrop."
      },
      {
        "name": "frameBg",
        "type": "string",
        "defaultValue": "'#222326'",
        "description": "Background color of the dark framed canvas."
      },
      {
        "name": "backdropBg",
        "type": "string",
        "defaultValue": "'#ffffff'",
        "description": "Background color of the container backdrop visible in the notch."
      },
      {
        "name": "links",
        "type": "NotchedNavbarLink[]",
        "description": "Navigation links rendered in the notch cutout area."
      },
      {
        "name": "activeLink",
        "type": "string",
        "description": "Controlled active tab identifier."
      },
      {
        "name": "onLinkClick",
        "type": "(id: string, link: NotchedNavbarLink) => void",
        "description": "Callback triggered when a tab is selected."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "Content rendered inside the dark canvas below/beside the notch."
      }
    ],
    "files": [
      {
        "name": "notched-navbar.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface NotchedNavbarLink {\n  id: string;\n  label: string;\n  href?: string;\n  icon?: React.ReactNode;\n  badge?: string | number;\n  disabled?: boolean;\n  onClick?: () => void;\n}\n\nexport type NotchedNavbarPosition = \"top\" | \"down\" | \"bottom\" | \"left\" | \"right\";\n\nexport type NotchedNavbarVariant =\n  | \"default\"\n  | \"down\"\n  | \"bottom\"\n  | \"left\"\n  | \"right\"\n  | \"compact\"\n  | \"deep-notch\"\n  | \"dark-slate\";\n\nexport interface NotchedNavbarProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onSelect\"> {\n  /** Visual variant style or position preset */\n  variant?: NotchedNavbarVariant;\n  /** Explicit position of the notch cutout along frame edges */\n  position?: NotchedNavbarPosition;\n  /** Width or length span in pixels of the recessed notch opening (default: 540 horizontal, 280 vertical) */\n  notchWidth?: number;\n  /** Vertical depth or inset in pixels of the notch cutout (default: 42 horizontal, 54 vertical) */\n  notchHeight?: number;\n  /** Horizontal or vertical span of the smooth cubic bezier S-curve fillet (default: 24) */\n  filletWidth?: number;\n  /** Outer frame corner border radius (default: 14) */\n  borderRadius?: number;\n  /** Inset padding around the dark frame exposing the backdrop (default: 8) */\n  whiteBoxPadding?: number;\n  /** Background color of the dark framed canvas (default: #222326) */\n  frameBg?: string;\n  /** Background color of the container backdrop visible in the notch (default: #ffffff) */\n  backdropBg?: string;\n  /** Navigation tab items */\n  links?: NotchedNavbarLink[];\n  /** Controlled active tab identifier */\n  activeLink?: string;\n  /** Uncontrolled default active tab identifier */\n  defaultActiveLink?: string;\n  /** Callback fired when a tab is selected */\n  onLinkClick?: (id: string, link: NotchedNavbarLink) => void;\n  /** Minimum height of the interior dark canvas (default: 440) */\n  minHeight?: number | string;\n  /** Content rendered inside the dark canvas */\n  children?: React.ReactNode;\n}\n\n/**\n * Generates an SVG path for the dark frame with the continuous S-curve notch cutout.\n * Supports parametric continuous cubic bezier fillets for top, down (bottom), left, and right positions.\n */\nexport function createNotchCutoutPath(\n  w: number,\n  h: number,\n  notchW: number,\n  notchH: number,\n  rOuter = 14,\n  filletW = 24,\n  position: NotchedNavbarPosition = \"top\"\n): string {\n  if (!w || !h || w <= 0 || h <= 0) return \"\";\n  const r = Math.min(rOuter, 18, Math.floor(w / 4), Math.floor(h / 4));\n  const fw = Math.max(12, Math.min(filletW, 28));\n\n  const isDown = position === \"down\" || position === \"bottom\";\n  const isLeft = position === \"left\";\n  const isRight = position === \"right\";\n\n  // CASE 1: Left Edge Notch (Vertical navbar along left edge)\n  if (isLeft) {\n    const maxSpan = Math.max(60, h - (r + fw) * 2);\n    const actualSpan = Math.min(notchW, maxSpan);\n    const depth = Math.min(notchH, Math.floor(w * 0.45));\n    const y1 = (h - actualSpan) / 2;\n    const y2 = y1 + actualSpan;\n\n    return [\n      `M ${r},0`,\n      `L ${w - r},0`,\n      `A ${r},${r} 0 0,1 ${w},${r}`,\n      `L ${w},${h - r}`,\n      `A ${r},${r} 0 0,1 ${w - r},${h}`,\n      `L ${r},${h}`,\n      `A ${r},${r} 0 0,1 0,${h - r}`,\n      `L 0,${Math.min(h - r, y2 + fw)}`,\n      `C 0,${y2 + fw * 0.5} ${depth},${y2 + fw * 0.5} ${depth},${y2}`,\n      `L ${depth},${y1}`,\n      `C ${depth},${y1 - fw * 0.5} 0,${y1 - fw * 0.5} 0,${Math.max(r, y1 - fw)}`,\n      `L 0,${r}`,\n      `A ${r},${r} 0 0,1 ${r},0`,\n      \"Z\",\n    ].join(\" \");\n  }\n\n  // CASE 2: Right Edge Notch (Vertical navbar along right edge)\n  if (isRight) {\n    const maxSpan = Math.max(60, h - (r + fw) * 2);\n    const actualSpan = Math.min(notchW, maxSpan);\n    const depth = Math.min(notchH, Math.floor(w * 0.45));\n    const y1 = (h - actualSpan) / 2;\n    const y2 = y1 + actualSpan;\n    const nx = w - depth;\n\n    return [\n      `M ${r},0`,\n      `L ${w - r},0`,\n      `A ${r},${r} 0 0,1 ${w},${r}`,\n      `L ${w},${Math.max(r, y1 - fw)}`,\n      `C ${w},${y1 - fw * 0.5} ${nx},${y1 - fw * 0.5} ${nx},${y1}`,\n      `L ${nx},${y2}`,\n      `C ${nx},${y2 + fw * 0.5} ${w},${y2 + fw * 0.5} ${w},${Math.min(h - r, y2 + fw)}`,\n      `L ${w},${h - r}`,\n      `A ${r},${r} 0 0,1 ${w - r},${h}`,\n      `L ${r},${h}`,\n      `A ${r},${r} 0 0,1 0,${h - r}`,\n      `L 0,${r}`,\n      `A ${r},${r} 0 0,1 ${r},0`,\n      \"Z\",\n    ].join(\" \");\n  }\n\n  // CASE 3: Down / Bottom Notch (Horizontal navbar along bottom edge)\n  if (isDown) {\n    const maxW = Math.max(80, w - (r + fw) * 2);\n    const actualNotchW = Math.min(notchW, maxW);\n    const nh = Math.min(notchH, Math.floor(h * 0.45));\n    const notchLeft = (w - actualNotchW) / 2;\n    const notchRight = notchLeft + actualNotchW;\n    const ny = h - nh;\n\n    return [\n      `M ${r},0`,\n      `L ${w - r},0`,\n      `A ${r},${r} 0 0,1 ${w},${r}`,\n      `L ${w},${h - r}`,\n      `A ${r},${r} 0 0,1 ${w - r},${h}`,\n      `L ${Math.min(w - r, notchRight + fw)},${h}`,\n      `C ${notchRight + fw * 0.5},${h} ${notchRight + fw * 0.5},${ny} ${notchRight},${ny}`,\n      `L ${notchLeft},${ny}`,\n      `C ${notchLeft - fw * 0.5},${ny} ${notchLeft - fw * 0.5},${h} ${Math.max(r, notchLeft - fw)},${h}`,\n      `L ${r},${h}`,\n      `A ${r},${r} 0 0,1 0,${h - r}`,\n      `L 0,${r}`,\n      `A ${r},${r} 0 0,1 ${r},0`,\n      \"Z\",\n    ].join(\" \");\n  }\n\n  // CASE 4: Top Notch (Default: Horizontal navbar along top edge)\n  const maxW = Math.max(80, w - (r + fw) * 2);\n  const actualNotchW = Math.min(notchW, maxW);\n  const nh = Math.min(notchH, Math.floor(h * 0.45));\n  const notchLeft = (w - actualNotchW) / 2;\n  const notchRight = notchLeft + actualNotchW;\n\n  return [\n    `M ${r},0`,\n    `L ${Math.max(r, notchLeft - fw)},0`,\n    `C ${notchLeft - fw * 0.5},0 ${notchLeft - fw * 0.5},${nh} ${notchLeft},${nh}`,\n    `L ${notchRight},${nh}`,\n    `C ${notchRight + fw * 0.5},${nh} ${notchRight + fw * 0.5},0 ${Math.min(w - r, notchRight + fw)},0`,\n    `L ${w - r},0`,\n    `A ${r},${r} 0 0,1 ${w},${r}`,\n    `L ${w},${h - r}`,\n    `A ${r},${r} 0 0,1 ${w - r},${h}`,\n    `L ${r},${h}`,\n    `A ${r},${r} 0 0,1 0,${h - r}`,\n    `L 0,${r}`,\n    `A ${r},${r} 0 0,1 ${r},0`,\n    \"Z\",\n  ].join(\" \");\n}\n\nexport const HomeIcon = () => (\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">\n    <path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />\n    <polyline points=\"9 22 9 12 15 12 15 22\" />\n  </svg>\n);\nexport const BriefcaseIcon = () => (\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">\n    <rect width=\"20\" height=\"14\" x=\"2\" y=\"7\" rx=\"2\" ry=\"2\" />\n    <path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\" />\n  </svg>\n);\nexport const MailIcon = () => (\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">\n    <rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" />\n    <path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />\n  </svg>\n);\nexport const SettingsIcon = () => (\n  <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\">\n    <circle cx=\"12\" cy=\"12\" r=\"3\" />\n    <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\" />\n  </svg>\n);\n\nexport const DEFAULT_NOTCHED_LINKS: NotchedNavbarLink[] = [\n  { id: \"home\", label: \"Home\", icon: <HomeIcon /> },\n  { id: \"experience\", label: \"Experience\", icon: <BriefcaseIcon /> },\n  { id: \"contact\", label: \"Contact\", icon: <MailIcon /> },\n  { id: \"settings\", label: \"Settings\", icon: <SettingsIcon /> },\n];\n\n/**\n * NotchedNavbar - Signature notched navigation frame with contrast backdrop.\n * Features an S-curve notch cutout allowing the backdrop surface to peek through,\n * and a dark vector canvas frame housing the page content below/around it.\n * Supports top, down (bottom), left, and right notch positions.\n */\nexport const NotchedNavbar = React.forwardRef<HTMLDivElement, NotchedNavbarProps>(\n  (\n    {\n      variant = \"default\",\n      position: customPosition,\n      notchWidth: customNotchWidth,\n      notchHeight: customNotchHeight,\n      filletWidth = 24,\n      borderRadius = 14,\n      whiteBoxPadding = 0,\n      frameBg: customFrameBg,\n      backdropBg = \"var(--canvas-bg)\",\n      links = DEFAULT_NOTCHED_LINKS,\n      activeLink,\n      defaultActiveLink,\n      onLinkClick,\n      minHeight = 440,\n      children,\n      className,\n      style,\n      ...props\n    },\n    ref\n  ) => {\n    // Resolve effective notch position from prop or variant name\n    const effectivePosition: \"top\" | \"down\" | \"left\" | \"right\" =\n      customPosition === \"down\" || customPosition === \"bottom\" || variant === \"down\" || variant === \"bottom\"\n        ? \"down\"\n        : customPosition === \"left\" || variant === \"left\"\n        ? \"left\"\n        : customPosition === \"right\" || variant === \"right\"\n        ? \"right\"\n        : \"top\";\n\n    const isVertical = effectivePosition === \"left\" || effectivePosition === \"right\";\n    const isCompact = variant === \"compact\";\n    const isDeepNotch = variant === \"deep-notch\";\n    const isDarkSlate = variant === \"dark-slate\";\n\n    const defaultWidth = isVertical ? (isCompact ? 220 : 280) : isCompact ? 300 : 540;\n    const notchWidth = customNotchWidth !== undefined ? customNotchWidth : defaultWidth;\n\n    const defaultHeight = isVertical ? 54 : isDeepNotch ? 52 : 42;\n    const notchHeight = customNotchHeight !== undefined ? customNotchHeight : defaultHeight;\n\n    const frameBg = customFrameBg || (isDarkSlate ? \"#111827\" : \"#222326\");\n\n    const darkFrameRef = React.useRef<HTMLDivElement>(null);\n    const navContainerRef = React.useRef<HTMLDivElement>(null);\n    const [frameDimensions, setFrameDimensions] = React.useState({\n      width: 880,\n      height: 480,\n    });\n    const [pillRect, setPillRect] = React.useState<{ left: number; top: number; width: number; height: number }>({\n      left: 0,\n      top: 0,\n      width: 0,\n      height: 0,\n    });\n\n    const initialTab = activeLink || defaultActiveLink || links[0]?.id || \"home\";\n    const [uncontrolledTab, setUncontrolledTab] = React.useState(initialTab);\n    const activeTab = activeLink !== undefined ? activeLink : uncontrolledTab;\n    const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);\n    const targetTab = hoveredTab || activeTab;\n\n    // Subpixel-accurate indicator tracking relative to the nav container\n    const updatePillPosition = React.useCallback(() => {\n      const container = navContainerRef.current;\n      if (!container) return;\n      const activeEl = container.querySelector<HTMLElement>(\n        `[data-nav-id=\"${targetTab}\"]`\n      );\n      if (!activeEl) return;\n\n      const containerRect = container.getBoundingClientRect();\n      const activeRect = activeEl.getBoundingClientRect();\n      const borderLeft = container.clientLeft || 0;\n      const borderTop = container.clientTop || 0;\n\n      setPillRect({\n        left: activeRect.left - (containerRect.left + borderLeft) + container.scrollLeft,\n        top: activeRect.top - (containerRect.top + borderTop) + container.scrollTop,\n        width: activeRect.width,\n        height: activeRect.height,\n      });\n    }, [targetTab]);\n\n    React.useEffect(() => {\n      const container = navContainerRef.current;\n      updatePillPosition();\n      const rAf = requestAnimationFrame(updatePillPosition);\n      const timer1 = setTimeout(updatePillPosition, 50);\n      const timer2 = setTimeout(updatePillPosition, 200);\n      window.addEventListener(\"resize\", updatePillPosition);\n      if (container) container.addEventListener(\"scroll\", updatePillPosition);\n\n      let ro: ResizeObserver | null = null;\n      if (typeof ResizeObserver !== \"undefined\" && container) {\n        ro = new ResizeObserver(() => updatePillPosition());\n        ro.observe(container);\n        const activeEl = container.querySelector<HTMLElement>(\n          `[data-nav-id=\"${activeTab}\"]`\n        );\n        if (activeEl) ro.observe(activeEl);\n      }\n\n      if (typeof document !== \"undefined\" && document.fonts?.ready) {\n        document.fonts.ready.then(updatePillPosition).catch(() => {});\n      }\n\n      return () => {\n        cancelAnimationFrame(rAf);\n        clearTimeout(timer1);\n        clearTimeout(timer2);\n        window.removeEventListener(\"resize\", updatePillPosition);\n        if (container) container.removeEventListener(\"scroll\", updatePillPosition);\n        ro?.disconnect();\n      };\n    }, [updatePillPosition, variant, effectivePosition, targetTab]);\n\n    const handleTabClick = (link: NotchedNavbarLink) => {\n      if (link.disabled) return;\n      if (activeLink === undefined) {\n        setUncontrolledTab(link.id);\n      }\n      onLinkClick?.(link.id, link);\n      link.onClick?.();\n    };\n\n    // Monitor dark frame container dimensions for pixel-perfect responsive vector path\n    React.useEffect(() => {\n      const el = darkFrameRef.current;\n      if (!el) return;\n\n      const updateSize = () => {\n        const rect = el.getBoundingClientRect();\n        if (rect.width > 0 && rect.height > 0) {\n          setFrameDimensions({\n            width: Math.round(rect.width),\n            height: Math.round(rect.height),\n          });\n        }\n      };\n\n      updateSize();\n\n      let resizeObserver: ResizeObserver | null = null;\n      if (typeof ResizeObserver !== \"undefined\") {\n        resizeObserver = new ResizeObserver((entries) => {\n          for (const entry of entries) {\n            const { width, height } = entry.contentRect;\n            if (width > 0 && height > 0) {\n              setFrameDimensions({\n                width: Math.round(width),\n                height: Math.round(height),\n              });\n            }\n          }\n        });\n        resizeObserver.observe(el);\n      } else {\n        window.addEventListener(\"resize\", updateSize);\n      }\n\n      return () => {\n        if (resizeObserver) resizeObserver.disconnect();\n        window.removeEventListener(\"resize\", updateSize);\n      };\n    }, []);\n\n    const actualNotchW = React.useMemo(() => {\n      if (isVertical) {\n        return Math.min(notchWidth, Math.max(120, frameDimensions.height - (borderRadius + filletWidth) * 2));\n      }\n      return Math.min(notchWidth, Math.max(140, frameDimensions.width - (borderRadius + filletWidth) * 2));\n    }, [notchWidth, isVertical, frameDimensions.width, frameDimensions.height, borderRadius, filletWidth]);\n\n    // Compute SVG cutout path with continuous cubic tangents\n    const cutoutPath = React.useMemo(() => {\n      return createNotchCutoutPath(\n        frameDimensions.width,\n        frameDimensions.height,\n        actualNotchW,\n        notchHeight,\n        borderRadius,\n        filletWidth,\n        effectivePosition\n      );\n    }, [\n      frameDimensions.width,\n      frameDimensions.height,\n      actualNotchW,\n      notchHeight,\n      borderRadius,\n      filletWidth,\n      effectivePosition,\n    ]);\n\n    const indicatorWidth = isCompact ? 20 : 28;\n    const indicatorHeight = isCompact ? 18 : 24;\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          \"relative w-full max-w-[1060px] mx-auto box-border select-none\",\n          \"rounded-[18px]\",\n          whiteBoxPadding > 0 && \"shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.1)]\",\n          className\n        )}\n        style={{\n          backgroundColor: backdropBg,\n          padding: `${whiteBoxPadding}px`,\n          ...style,\n        }}\n        {...props}\n      >\n        {/* Layer 0: Backdrop Layer Behind */}\n        {whiteBoxPadding > 0 && (\n          <div\n            className=\"absolute inset-0 pointer-events-none z-0 rounded-[18px]\"\n            style={{ backgroundColor: backdropBg }}\n          />\n        )}\n\n        {/* Layer 30: Navigation Bar Layer sitting inside the notch cutout */}\n        <nav\n          ref={navContainerRef}\n          className={cn(\n            \"absolute pointer-events-auto z-30 box-border select-none\",\n            effectivePosition === \"top\" && \"left-1/2 -translate-x-1/2 top-0 flex items-center justify-center px-3\",\n            effectivePosition === \"down\" && \"left-1/2 -translate-x-1/2 bottom-0 flex items-center justify-center px-3\",\n            effectivePosition === \"left\" && \"left-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-2 px-1\",\n            effectivePosition === \"right\" && \"right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-2 px-1\",\n            isVertical ? \"gap-1 sm:gap-2\" : isCompact ? \"gap-2 sm:gap-4\" : \"gap-2 sm:gap-6\"\n          )}\n          style={{\n            width: isVertical ? `${notchHeight + whiteBoxPadding}px` : `${actualNotchW}px`,\n            height: isVertical ? `${actualNotchW}px` : `${notchHeight + whiteBoxPadding}px`,\n          }}\n          aria-label=\"Main Navigation\"\n          onMouseLeave={() => setHoveredTab(null)}\n        >\n          {/* Smooth Sliding Hover Backdrop Pill on Mouse Move */}\n          {pillRect.width > 0 && hoveredTab && (\n            <span\n              aria-hidden=\"true\"\n              className=\"absolute rounded-lg bg-[var(--text-primary)]/[0.08] pointer-events-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-0\"\n              style={{\n                transform: `translate3d(${pillRect.left}px, ${pillRect.top}px, 0)`,\n                width: `${pillRect.width}px`,\n                height: `${pillRect.height}px`,\n              }}\n            />\n          )}\n\n          {/* Smooth Sliding Underline / Sidebar Indicator Pill */}\n          {!isVertical && pillRect.width > 0 && (\n            <span\n              aria-hidden=\"true\"\n              className={cn(\n                \"absolute left-0 rounded-full bg-[var(--accent-green)] pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-10\",\n                effectivePosition === \"down\" ? \"top-2\" : \"bottom-2\"\n              )}\n              style={{\n                height: isCompact ? \"3px\" : \"3.5px\",\n                transform: `translate3d(${pillRect.left + (pillRect.width - indicatorWidth) / 2}px, 0, 0)`,\n                width: `${indicatorWidth}px`,\n              }}\n            />\n          )}\n\n          {isVertical && pillRect.height > 0 && (\n            <span\n              aria-hidden=\"true\"\n              className={cn(\n                \"absolute top-0 rounded-full bg-[var(--accent-green)] pointer-events-none transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform z-10\",\n                effectivePosition === \"right\" ? \"left-2\" : \"right-2\"\n              )}\n              style={{\n                width: \"3.5px\",\n                transform: `translate3d(0, ${pillRect.top + (pillRect.height - indicatorHeight) / 2}px, 0)`,\n                height: `${indicatorHeight}px`,\n              }}\n            />\n          )}\n\n          {links.map((link) => {\n            const isActive = activeTab === link.id;\n            return (\n              <button\n                key={link.id}\n                type=\"button\"\n                data-nav-id={link.id}\n                disabled={link.disabled}\n                title={link.label}\n                aria-label={link.label}\n                onClick={() => handleTabClick(link)}\n                onMouseEnter={() => setHoveredTab(link.id)}\n                className={cn(\n                  \"relative z-10 bg-transparent border-0 inline-flex items-center justify-center cursor-pointer select-none active:scale-[0.95]\",\n                  \"transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]\",\n                  isVertical\n                    ? \"w-full p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] gap-2 text-xs font-semibold\"\n                    : isCompact\n                    ? \"p-2 sm:p-2.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]\"\n                    : \"px-3 sm:px-4 py-1.5 sm:py-2 text-[13px] sm:text-[14px] font-semibold tracking-tight gap-1.5 sm:gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]\",\n                  isActive && \"text-[var(--text-primary)] font-bold\",\n                  link.disabled && \"opacity-40 cursor-not-allowed pointer-events-none\"\n                )}\n              >\n                {/* For compact or narrow vertical mode: render icon */}\n                {isCompact || (isVertical && !link.icon) ? (\n                  link.icon || <HomeIcon />\n                ) : isVertical ? (\n                  <>\n                    {link.icon && <span className=\"shrink-0\">{link.icon}</span>}\n                    <span className=\"hidden sm:inline truncate max-w-[50px]\">{link.label}</span>\n                  </>\n                ) : (\n                  <>\n                    {link.icon && <span className=\"shrink-0\">{link.icon}</span>}\n                    <span className=\"truncate\">{link.label}</span>\n                    {link.badge && (\n                      <span className=\"hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold border border-[var(--border)]\">\n                        {link.badge}\n                      </span>\n                    )}\n                  </>\n                )}\n              </button>\n            );\n          })}\n        </nav>\n\n        {/* Layer 10: Dark Frame Inset Canvas with SVG Notch Cutout */}\n        <div\n          ref={darkFrameRef}\n          className=\"relative z-10 w-full box-border\"\n          style={{\n            marginTop: `${effectivePosition === \"top\" && whiteBoxPadding > 4 ? 4 : 0}px`,\n            minHeight: typeof minHeight === \"number\" ? `${minHeight}px` : minHeight,\n          }}\n        >\n          {/* Crisp Vector Cutout Layer */}\n          <svg\n            className=\"absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]\"\n            viewBox={`0 0 ${frameDimensions.width} ${frameDimensions.height}`}\n            width={frameDimensions.width}\n            height={frameDimensions.height}\n            preserveAspectRatio=\"none\"\n            aria-hidden=\"true\"\n          >\n            <path\n              d={cutoutPath}\n              fill={frameBg}\n              stroke=\"var(--border)\"\n              strokeWidth=\"1\"\n              vectorEffect=\"non-scaling-stroke\"\n            />\n          </svg>\n\n          {/* Interior Content Area (Nested seamlessly with dynamic notch padding) */}\n          <div\n            className=\"relative z-[2] w-full box-border px-5 sm:px-9 pb-8 sm:pb-12 text-[#e5e7eb]\"\n            style={{\n              paddingTop: `${effectivePosition === \"top\" ? notchHeight + 20 : 24}px`,\n              paddingBottom: `${effectivePosition === \"down\" ? notchHeight + 20 : 24}px`,\n              paddingLeft: `${effectivePosition === \"left\" ? notchHeight + 24 : 24}px`,\n              paddingRight: `${effectivePosition === \"right\" ? notchHeight + 24 : 24}px`,\n            }}\n          >\n            {children || (\n              <div className=\"space-y-6\">\n                {/* Clean Dashboard Header */}\n                <div className=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4\">\n                  <div>\n                    <h3 className=\"text-base sm:text-lg font-semibold tracking-tight text-white\">\n                      Infrastructure Telemetry\n                    </h3>\n                    <p className=\"text-xs text-neutral-400 mt-0.5\">\n                      Edge cluster performance and real-time load\n                    </p>\n                  </div>\n                  <div className=\"text-[11px] font-mono text-emerald-400\">\n                    All Systems Operational\n                  </div>\n                </div>\n\n                {/* Minimal Metric Cards */}\n                <div className=\"grid grid-cols-1 md:grid-cols-3 gap-3\">\n                  <div className=\"p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1\">\n                    <span className=\"text-[10px] font-mono text-neutral-400 uppercase tracking-wider\">Edge Requests</span>\n                    <div className=\"text-xl font-bold text-white tracking-tight\">1.42M</div>\n                    <span className=\"text-[10px] font-mono text-emerald-400\">+14.2% vs yesterday</span>\n                  </div>\n\n                  <div className=\"p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1\">\n                    <span className=\"text-[10px] font-mono text-neutral-400 uppercase tracking-wider\">Avg Latency</span>\n                    <div className=\"text-xl font-bold text-white tracking-tight\">24ms</div>\n                    <span className=\"text-[10px] font-mono text-neutral-400\">p99: 42ms worldwide</span>\n                  </div>\n\n                  <div className=\"p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1\">\n                    <span className=\"text-[10px] font-mono text-neutral-400 uppercase tracking-wider\">Cache Hit Ratio</span>\n                    <div className=\"text-xl font-bold text-white tracking-tight\">99.4%</div>\n                    <span className=\"text-[10px] font-mono text-emerald-400\">Zero purge events</span>\n                  </div>\n                </div>\n              </div>\n            )}\n          </div>\n        </div>\n      </div>\n    );\n  }\n);\n\nNotchedNavbar.displayName = \"NotchedNavbar\";\n"
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
    "description": "Production-grade navigation sidebar with collapse physics (⌘B), white-by-default icons, scrollable categories variant, and mobile drawer.",
    "variants": [
      "scrollable-categories",
      "default"
    ],
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
        "name": "variant",
        "type": "'scrollable-categories' | 'default'",
        "defaultValue": "'scrollable-categories'",
        "description": "Controls whether categories scroll independently while top nav stays fixed ('scrollable-categories') or entire sidebar scrolls together ('default')."
      },
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
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport Link from \"next/link\";\nimport { usePathname, useSearchParams } from \"next/navigation\";\nimport { ChevronDown, X, Menu, Terminal, ChevronsUpDown, ChevronsDownUp } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\nimport {\n  VectorLayersIcon,\n  VectorFolderIcon,\n  VectorApiIcon,\n  VectorPanelLeftIcon,\n  VectorKiloLogo,\n  VectorCategoryIcon,\n  VectorComponentIcon,\n  VectorCubeIcon,\n} from \"@/components/vector-icons\";\nimport { REGISTRY_DATA, RegistryItem } from \"@/registry/registry-data\";\nimport { SidebarHoverPreview, HoverState } from \"@/components/sidebar-hover-preview\";\nimport { SlidingHighlightContainer } from \"@/components/sliding-highlight\";\n\nexport interface SidebarProps extends React.HTMLAttributes<HTMLElement> {\n  className?: string;\n  variant?: \"scrollable-categories\" | \"default\";\n  collapsed?: boolean;\n  onCollapsedChange?: (collapsed: boolean) => void;\n  mobileOpen?: boolean;\n  onMobileOpenChange?: (open: boolean) => void;\n  activeComponent?: string;\n  activeCategory?: string;\n  theme?: \"dark\" | \"light\" | \"system\";\n  activeVariant?: string;\n}\n\ninterface ComponentVariantsTreeProps {\n  comp: RegistryItem;\n  isCompActive: boolean;\n  activeVariant?: string;\n  isCollapsed: boolean;\n  isVariantExpanded: boolean;\n  onMobileOpenChange?: (open: boolean) => void;\n  onMouseEnter: (comp: RegistryItem, e: React.MouseEvent<HTMLElement>, variant: string) => void;\n  onMouseLeave: () => void;\n  onVariantSelect?: () => void;\n}\n\nfunction ComponentVariantsTree({\n  comp,\n  isCompActive,\n  activeVariant,\n  isCollapsed,\n  isVariantExpanded,\n  onMobileOpenChange,\n  onMouseEnter,\n  onMouseLeave,\n  onVariantSelect,\n}: ComponentVariantsTreeProps) {\n  const treeRef = React.useRef<HTMLDivElement>(null);\n  const effectiveVariant =\n    activeVariant ||\n    (comp.variants?.includes(\"default\") ? \"default\" : comp.variants?.[0]);\n\n  const activeVariantIdx = isCompActive\n    ? (comp.variants?.findIndex((v) => v === effectiveVariant) ?? -1)\n    : -1;\n\n  // Track the exact pixel top position of the active variant item\n  const [indicatorTop, setIndicatorTop] = React.useState<number>(() => {\n    return activeVariantIdx >= 0 ? activeVariantIdx * 28 + 4 : 4;\n  });\n\n  const updatePosition = React.useCallback(() => {\n    if (!treeRef.current || activeVariantIdx === -1) return;\n    const activeEl = treeRef.current.querySelector<HTMLElement>(\n      `[data-variant-idx=\"${activeVariantIdx}\"]`\n    );\n    if (activeEl) {\n      setIndicatorTop(activeEl.offsetTop);\n    } else {\n      setIndicatorTop(activeVariantIdx * 28 + 4);\n    }\n  }, [activeVariantIdx]);\n\n  React.useEffect(() => {\n    updatePosition();\n    const timer = setTimeout(updatePosition, 50);\n    window.addEventListener(\"resize\", updatePosition);\n    return () => {\n      clearTimeout(timer);\n      window.removeEventListener(\"resize\", updatePosition);\n    };\n  }, [updatePosition, isVariantExpanded]);\n\n  return (\n    <div\n      className={cn(\n        \"grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]\",\n        !isCollapsed && isVariantExpanded\n          ? \"grid-rows-[1fr] opacity-100\"\n          : \"grid-rows-[0fr] opacity-0 pointer-events-none\"\n      )}\n    >\n      <div className=\"overflow-hidden\">\n        <div ref={treeRef} className=\"relative ml-3.5 pl-3 pt-1 pb-1 space-y-1\">\n          {/* Animated active vertical trunk line (grows / reduces smoothly with natural spring physics) */}\n          <span\n            aria-hidden=\"true\"\n            className={cn(\n              \"absolute left-0 -top-1 w-px bg-[var(--accent-green)] z-10 pointer-events-none transition-[height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[height]\",\n              activeVariantIdx !== -1 ? \"opacity-100\" : \"opacity-0\"\n            )}\n            style={{\n              height: `${Math.max(0, indicatorTop + 4)}px`,\n            }}\n          />\n\n          {/* Animated active curved branch elbow (smoothly glides up / down to the selected variant) */}\n          <span\n            aria-hidden=\"true\"\n            className={cn(\n              \"absolute left-0 top-0 w-3 h-3.5 border-l border-b rounded-bl-[6px] border-[var(--accent-green)] z-20 pointer-events-none transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform\",\n              activeVariantIdx !== -1 ? \"opacity-100\" : \"opacity-0\"\n            )}\n            style={{\n              transform: `translate3d(0, ${indicatorTop}px, 0)`,\n            }}\n          />\n\n          {/* Base tree items and subtle static gray background lines */}\n          {comp.variants?.map((variant, idx) => {\n            const isThisVariantActive = activeVariantIdx !== -1 && idx === activeVariantIdx;\n            const isLast = idx === (comp.variants?.length ?? 1) - 1;\n\n            return (\n              <div\n                key={variant}\n                data-variant-idx={idx}\n                className=\"relative flex items-center h-6\"\n              >\n                {/* Static top gray connector to parent for the first item */}\n                {idx === 0 && (\n                  <span\n                    aria-hidden=\"true\"\n                    className=\"absolute -left-3 -top-1 h-1 w-px bg-[var(--border)] pointer-events-none\"\n                  />\n                )}\n\n                {/* Static base gray curved branch */}\n                <span\n                  aria-hidden=\"true\"\n                  className=\"absolute -left-3 top-0 w-3 h-3.5 border-l border-b rounded-bl-[6px] border-[var(--border)] pointer-events-none\"\n                />\n\n                {/* Static base gray spine to subsequent siblings */}\n                {!isLast && (\n                  <span\n                    aria-hidden=\"true\"\n                    className=\"absolute -left-3 top-3.5 bottom-[-4px] w-px bg-[var(--border)] pointer-events-none\"\n                  />\n                )}\n\n                <Link\n                  href={`/components/${comp.name}?variant=${variant}`}\n                  data-hover-item=\"true\"\n                  onClick={() => {\n                    onMobileOpenChange?.(false);\n                    onVariantSelect?.();\n                  }}\n                  onMouseEnter={(e) => onMouseEnter(comp, e, variant)}\n                  onMouseLeave={onMouseLeave}\n                  className={cn(\n                    \"group/v relative z-10 flex items-center gap-2 w-full px-2 py-1 rounded text-xs font-sans tracking-normal transition-colors duration-150 text-left\",\n                    isThisVariantActive\n                      ? \"bg-[var(--surface-secondary)] text-[var(--accent-green)] font-medium border border-[var(--border)] shadow-xs\"\n                      : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-normal border border-transparent\"\n                  )}\n                  title={`${comp.title} (${variant} variant)`}\n                >\n                  <span\n                    className={cn(\n                      \"h-1.5 w-1.5 rounded-full transition-all duration-300 shrink-0\",\n                      isThisVariantActive\n                        ? \"bg-[var(--accent-green)] scale-110\"\n                        : \"bg-[var(--text-muted)]/50 group-hover/v:bg-[var(--text-primary)]\"\n                    )}\n                  />\n                  <span className=\"truncate\">{variant}</span>\n                </Link>\n              </div>\n            );\n          })}\n        </div>\n      </div>\n    </div>\n  );\n}\n\nfunction SidebarBase({\n  className,\n  collapsed = false,\n  onCollapsedChange,\n  mobileOpen = false,\n  onMobileOpenChange,\n  activeComponent,\n  activeCategory,\n  theme = \"dark\",\n  activeVariant,\n  variant = \"scrollable-categories\",\n  ...props\n}: SidebarProps) {\n  const pathname = usePathname();\n  const [internalCollapsed, setInternalCollapsed] = React.useState(false);\n  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;\n\n  const handleToggleCollapse = () => {\n    const next = !isCollapsed;\n    setInternalCollapsed(next);\n    onCollapsedChange?.(next);\n  };\n\n  const registryItems = Object.values(REGISTRY_DATA);\n  const categories = Array.from(new Set(registryItems.map((item) => item.category)));\n\n  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({\n    Actions: true,\n    \"Forms & Inputs\": true,\n    Overlays: true,\n    \"Data Display\": true,\n    Navigation: true,\n    \"Media & Layout\": true,\n    \"Backgrounds & Shaders\": true,\n  });\n\n  const [expandedVariants, setExpandedVariants] = React.useState<Record<string, boolean>>({\n    button: true,\n    badge: true,\n  });\n\n  // Automatically expand variant tree when activeComponent is selected\n  React.useEffect(() => {\n    if (activeComponent) {\n      setExpandedVariants((prev) => ({\n        ...prev,\n        [activeComponent]: true,\n      }));\n    }\n  }, [activeComponent]);\n\n  const toggleComponentVariants = (compName: string) => {\n    setExpandedVariants((prev) => ({\n      ...prev,\n      [compName]: !prev[compName],\n    }));\n  };\n\n  const toggleCategory = (cat: string) => {\n    setExpandedCategories((prev) => ({\n      ...prev,\n      [cat]: !prev[cat],\n    }));\n  };\n\n  const expandAllCategories = () => {\n    const next: Record<string, boolean> = {};\n    categories.forEach((cat) => {\n      next[cat] = true;\n    });\n    setExpandedCategories(next);\n  };\n\n  const collapseAllCategories = () => {\n    const next: Record<string, boolean> = {};\n    categories.forEach((cat) => {\n      next[cat] = false;\n    });\n    setExpandedCategories(next);\n  };\n\n  const isAllCollapsed = categories.every((cat) => !expandedCategories[cat]);\n\n  const handleToggleAllCategories = () => {\n    if (isAllCollapsed) {\n      expandAllCategories();\n    } else {\n      collapseAllCategories();\n    }\n  };\n\n  // Hover preview state & smooth glide tracking\n  const [hoverState, setHoverState] = React.useState<HoverState | null>(null);\n  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);\n  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);\n  const asideRef = React.useRef<HTMLElement | null>(null);\n\n  const handleComponentMouseEnter = (\n    compItem: RegistryItem,\n    e: React.MouseEvent<HTMLElement>,\n    variant?: string\n  ) => {\n    if (closeTimeoutRef.current) {\n      clearTimeout(closeTimeoutRef.current);\n      closeTimeoutRef.current = null;\n    }\n\n    const rect = e.currentTarget.getBoundingClientRect();\n    const asideRect = asideRef.current?.getBoundingClientRect();\n    const sidebarRight = asideRect ? asideRect.right : (isCollapsed ? 56 : 256);\n    const centerY = rect.top + rect.height / 2;\n\n    if (hoverState) {\n      setHoverState({\n        item: compItem,\n        top: centerY,\n        sidebarRight,\n        variant,\n      });\n      return;\n    }\n\n    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);\n    hoverTimeoutRef.current = setTimeout(() => {\n      setHoverState({\n        item: compItem,\n        top: centerY,\n        sidebarRight,\n        variant,\n      });\n    }, 110);\n  };\n\n  const handleComponentMouseLeave = () => {\n    if (hoverTimeoutRef.current) {\n      clearTimeout(hoverTimeoutRef.current);\n      hoverTimeoutRef.current = null;\n    }\n    closeTimeoutRef.current = setTimeout(() => {\n      setHoverState(null);\n    }, 160);\n  };\n\n  const handleMouseEnterPreview = () => {\n    if (closeTimeoutRef.current) {\n      clearTimeout(closeTimeoutRef.current);\n      closeTimeoutRef.current = null;\n    }\n  };\n\n  const handleMouseLeavePreview = () => {\n    closeTimeoutRef.current = setTimeout(() => {\n      setHoverState(null);\n    }, 160);\n  };\n\n  const isOverview = pathname === \"/\";\n  const isAllComponents = pathname === \"/components\";\n  const isIcons = pathname === \"/icons\" || pathname?.startsWith(\"/icons\");\n  const isDocs = pathname === \"/docs\" || pathname?.startsWith(\"/docs\");\n\n  const isScrollableCategories = variant === \"scrollable-categories\";\n\n  const topNavSection = (\n    <div className={cn(\"px-2.5 pt-3 pb-1 w-64 select-none\", isScrollableCategories && \"shrink-0\")}>\n      <SlidingHighlightContainer\n        className=\"space-y-1\"\n        pillClassName=\"bg-[var(--surface-secondary)]/90 border border-[var(--border)]/40 rounded-md shadow-2xs\"\n      >\n        <nav className=\"space-y-1\">\n          {/* Overview */}\n          <Link\n            href=\"/\"\n            data-hover-item=\"true\"\n            onClick={() => onMobileOpenChange?.(false)}\n            className={cn(\n              \"group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]\",\n              isOverview\n                ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n            )}\n            title={isCollapsed ? \"Overview\" : undefined}\n          >\n            <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n              <VectorFolderIcon\n                isActive={isOverview}\n                className={cn(\n                  \"h-4 w-4 transition-colors duration-150\",\n                  isOverview\n                    ? \"text-[var(--accent-green)]\"\n                    : \"text-[var(--text-primary)] group-hover:text-[var(--accent-green)]\"\n                )}\n              />\n            </div>\n            <span\n              className={cn(\n                \"ml-2.5 whitespace-nowrap transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              Overview\n            </span>\n          </Link>\n\n          {/* All Components */}\n          <Link\n            href=\"/components\"\n            data-hover-item=\"true\"\n            onClick={() => onMobileOpenChange?.(false)}\n            className={cn(\n              \"group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]\",\n              isAllComponents\n                ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n            )}\n            title={isCollapsed ? \"All Components\" : undefined}\n          >\n            <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n              <VectorLayersIcon\n                isActive={isAllComponents}\n                className={cn(\n                  \"h-4 w-4 transition-colors duration-150\",\n                  isAllComponents\n                    ? \"text-[var(--accent-green)]\"\n                    : \"text-[var(--text-primary)] group-hover:text-[var(--accent-green)]\"\n                )}\n              />\n            </div>\n            <div\n              className={cn(\n                \"flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              <span className=\"whitespace-nowrap\">All Components</span>\n              <span className=\"text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]\">\n                {registryItems.length}\n              </span>\n            </div>\n          </Link>\n          {/* Icons */}\n          <Link\n            href=\"/icons\"\n            data-hover-item=\"true\"\n            onClick={() => onMobileOpenChange?.(false)}\n            className={cn(\n              \"group relative z-10 flex items-center w-full rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150 active:scale-[0.98]\",\n              isIcons\n                ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n            )}\n            title={isCollapsed ? \"Icons\" : undefined}\n          >\n            <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n              <VectorCubeIcon\n                isActive={isIcons}\n                className={cn(\n                  \"h-4 w-4 transition-colors duration-150\",\n                  isIcons\n                    ? \"text-[var(--accent-green)]\"\n                    : \"text-[var(--text-primary)] group-hover:text-[var(--accent-green)]\"\n                )}\n              />\n            </div>\n            <div\n              className={cn(\n                \"flex items-center justify-between flex-1 ml-2.5 overflow-hidden transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              <span className=\"whitespace-nowrap\">Kilo/Icons</span>\n              <span className=\"text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]\">\n                115\n              </span>\n            </div>\n          </Link>\n        </nav>\n      </SlidingHighlightContainer>\n\n      {/* Horizontal Divider before Categories */}\n      <div\n        className={cn(\n          \"border-t border-[var(--border)] mt-2 mb-1 transition-all duration-300\",\n          isCollapsed ? \"w-8 ml-0.5\" : \"w-full\"\n        )}\n      />\n    </div>\n  );\n\n  const categoriesNavSection = (\n    <SlidingHighlightContainer\n      className=\"space-y-1 min-h-full\"\n      pillClassName=\"bg-[var(--surface-secondary)]/90 border border-[var(--border)]/40 rounded-md shadow-2xs\"\n    >\n      <div className=\"space-y-1\">\n        {/* Categories Header */}\n        <div className=\"flex items-center justify-between w-full rounded p-2 text-[10px] font-sans font-semibold uppercase tracking-wider text-[var(--text-muted)] select-none\">\n          <div className=\"flex items-center flex-1 min-w-0\">\n            <div\n              className=\"flex h-5 w-5 shrink-0 items-center justify-center cursor-default\"\n              title={isCollapsed ? `Categories (${categories.length})` : undefined}\n            >\n              <VectorCategoryIcon category=\"all\" className=\"h-4 w-4 text-[var(--text-muted)]\" />\n            </div>\n            <span\n              className={cn(\n                \"ml-2.5 flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-200\",\n                isCollapsed && \"opacity-0 pointer-events-none\"\n              )}\n            >\n              <span>Categories</span>\n              <span className=\"text-[9px] text-[var(--text-muted)] font-normal tabular-nums\">({categories.length})</span>\n            </span>\n          </div>\n          <button\n            type=\"button\"\n            onClick={handleToggleAllCategories}\n            className={cn(\n              \"p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-opacity duration-200 cursor-pointer shrink-0\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n            title={isAllCollapsed ? \"Expand all categories\" : \"Collapse all categories\"}\n            aria-label={isAllCollapsed ? \"Expand all categories\" : \"Collapse all categories\"}\n          >\n            {isAllCollapsed ? (\n              <ChevronsUpDown className=\"h-3.5 w-3.5\" />\n            ) : (\n              <ChevronsDownUp className=\"h-3.5 w-3.5\" />\n            )}\n          </button>\n        </div>\n\n        {/* Categories List */}\n        {categories.map((cat) => {\n          const catItems = registryItems.filter((i) => i.category === cat);\n          const isCategoryActive = activeCategory === cat;\n          const isExpanded = expandedCategories[cat] ?? true;\n\n          return (\n            <div key={cat} className=\"space-y-0.5\">\n              <div\n                data-hover-item=\"true\"\n                className={cn(\n                  \"group/cat relative z-10 flex w-full items-center justify-between rounded p-2 text-xs font-semibold tracking-tight transition-colors duration-150\",\n                  isCategoryActive\n                    ? \"bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]\"\n                    : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n                )}\n              >\n                <Link\n                  href={`/components?category=${encodeURIComponent(cat)}`}\n                  onClick={() => onMobileOpenChange?.(false)}\n                  onMouseEnter={(e) => {\n                    if (isCollapsed && catItems[0]) {\n                      handleComponentMouseEnter(catItems[0], e);\n                    }\n                  }}\n                  onMouseLeave={() => {\n                    if (isCollapsed) handleComponentMouseLeave();\n                  }}\n                  className=\"flex items-center flex-1 min-w-0 text-left\"\n                  title={isCollapsed ? `${cat} (${catItems.length})` : undefined}\n                >\n                  <div className=\"flex h-5 w-5 shrink-0 items-center justify-center\">\n                    <VectorCategoryIcon\n                      category={cat}\n                      isActive={isCategoryActive}\n                      className={cn(\n                        \"h-4 w-4 shrink-0 transition-colors\",\n                        isCategoryActive\n                          ? \"text-[var(--accent-green)]\"\n                          : \"text-[var(--text-primary)] group-hover/cat:text-[var(--accent-green)]\"\n                      )}\n                    />\n                  </div>\n                  <span\n                    className={cn(\n                      \"ml-2.5 truncate whitespace-nowrap transition-opacity duration-200\",\n                      isCollapsed && \"opacity-0 pointer-events-none\"\n                    )}\n                  >\n                    {cat}\n                  </span>\n                </Link>\n\n                <div\n                  className={cn(\n                    \"flex items-center gap-1 transition-opacity duration-200 shrink-0\",\n                    isCollapsed && \"opacity-0 pointer-events-none\"\n                  )}\n                >\n                  <span className=\"text-[10px] font-sans font-medium tabular-nums text-[var(--text-muted)]\">\n                    {catItems.length}\n                  </span>\n                  <button\n                    type=\"button\"\n                    onClick={(e) => {\n                      e.stopPropagation();\n                      toggleCategory(cat);\n                    }}\n                    className=\"p-0.5 rounded hover:bg-[var(--surface-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-transform cursor-pointer\"\n                    title={isExpanded ? \"Collapse\" : \"Expand\"}\n                  >\n                    <ChevronDown\n                      className={cn(\n                        \"h-3 w-3 transition-transform duration-200\",\n                        isExpanded ? \"rotate-0\" : \"-rotate-90\"\n                      )}\n                    />\n                  </button>\n                </div>\n              </div>\n\n              {/* Sub-items with smooth expand/collapse transition */}\n              <div\n                className={cn(\n                  \"grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]\",\n                  !isCollapsed && isExpanded\n                    ? \"grid-rows-[1fr] opacity-100\"\n                    : \"grid-rows-[0fr] opacity-0 pointer-events-none\"\n                )}\n              >\n                <div className=\"overflow-hidden\">\n                  <div className=\"ml-3.5 pl-2 border-l border-[var(--border)] py-0.5 space-y-1\">\n                    {catItems.map((comp) => {\n                      const isCompActive =\n                        pathname === `/components/${comp.name}` || activeComponent === comp.name;\n                      const hasVariants = Boolean(comp.variants && comp.variants.length > 0);\n                      const isVariantExpanded = Boolean(expandedVariants[comp.name]);\n\n                      return (\n                        <div key={comp.name} className=\"relative\">\n                          <div\n                            data-hover-item=\"true\"\n                            className={cn(\n                              \"group/comp relative z-10 flex items-center justify-between w-full rounded text-xs font-medium tracking-tight transition-colors duration-150\",\n                              isCompActive && !activeVariant\n                                ? \"bg-[var(--surface-secondary)] text-[var(--accent-green)] border border-[var(--border)]\"\n                                : isCompActive\n                                ? \"bg-[var(--surface-secondary)]/60 text-[var(--text-primary)] border border-transparent\"\n                                : \"text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent\"\n                            )}\n                          >\n                            <Link\n                              href={`/components/${comp.name}`}\n                              onClick={() => onMobileOpenChange?.(false)}\n                              onMouseEnter={(e) => handleComponentMouseEnter(comp, e)}\n                              onMouseLeave={handleComponentMouseLeave}\n                              className=\"flex items-center gap-2 flex-1 min-w-0 px-2 py-1 text-left\"\n                              title={comp.title}\n                            >\n                              <VectorComponentIcon\n                                name={comp.name}\n                                className={cn(\n                                  \"h-3 w-3 shrink-0 transition-colors\",\n                                  isCompActive\n                                    ? \"text-[var(--accent-green)]\"\n                                    : \"text-[var(--text-primary)] group-hover/comp:text-[var(--accent-green)]\"\n                                )}\n                              />\n                              <span className=\"truncate font-medium\">{comp.title}</span>\n                            </Link>\n\n                            {hasVariants && (\n                              <button\n                                type=\"button\"\n                                onClick={(e) => {\n                                  e.preventDefault();\n                                  e.stopPropagation();\n                                  toggleComponentVariants(comp.name);\n                                }}\n                                className={cn(\n                                  \"flex items-center gap-0.5 px-1.5 py-0.5 mr-1 rounded text-[10px] font-sans font-medium tabular-nums transition-colors cursor-pointer select-none\",\n                                  isCompActive\n                                    ? \"text-[var(--accent-green)] hover:bg-[var(--accent-green)]/15\"\n                                    : \"text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)]\"\n                                )}\n                                title={`${isVariantExpanded ? \"Hide\" : \"Show\"} ${comp.variants?.length} variants`}\n                                aria-label={`${isVariantExpanded ? \"Hide\" : \"Show\"} variants for ${comp.title}`}\n                              >\n                                <span className=\"text-[9px] font-bold opacity-80\">{comp.variants?.length}</span>\n                                <ChevronDown\n                                  className={cn(\n                                    \"h-2.5 w-2.5 transition-transform duration-200\",\n                                    isVariantExpanded ? \"rotate-0\" : \"-rotate-90\"\n                                  )}\n                                />\n                              </button>\n                            )}\n                          </div>\n\n                          {/* Expandable Variants Tree with animated glide & height transitions */}\n                          {hasVariants && (\n                            <ComponentVariantsTree\n                              comp={comp}\n                              isCompActive={isCompActive}\n                              activeVariant={activeVariant}\n                              isCollapsed={isCollapsed}\n                              isVariantExpanded={isVariantExpanded}\n                              onMobileOpenChange={onMobileOpenChange}\n                              onMouseEnter={handleComponentMouseEnter}\n                              onMouseLeave={handleComponentMouseLeave}\n                              onVariantSelect={() => setHoverState(null)}\n                            />\n                          )}\n                        </div>\n                      );\n                    })}\n                  </div>\n                </div>\n              </div>\n            </div>\n          );\n        })}\n      </div>\n    </SlidingHighlightContainer>\n  );\n\n  const sidebarContent = (\n    <div className=\"flex flex-col h-full w-64 shrink-0 bg-[var(--bg-sidebar)] text-[var(--text-primary)] select-none overflow-hidden\">\n      {/* 1. Header & Brand */}\n      <div className=\"flex h-14 items-center justify-between px-3 border-b border-[var(--border)] shrink-0 w-64\">\n        <Link\n          href=\"/\"\n          className=\"flex items-center gap-2.5 group/brand py-1 px-1 rounded transition-colors overflow-hidden\"\n          onClick={(e) => {\n            if (isCollapsed) {\n              e.preventDefault();\n              handleToggleCollapse();\n            } else {\n              onMobileOpenChange?.(false);\n            }\n          }}\n          title={isCollapsed ? \"Expand sidebar (⌘B)\" : \"kilo/ui\"}\n        >\n          <div className=\"h-6 w-6 shrink-0 flex items-center justify-center\">\n            <VectorKiloLogo theme={theme} className=\"h-6 w-6\" />\n          </div>\n          <span\n            className={cn(\n              \"font-sans text-sm font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap transition-opacity duration-200 select-none\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n          >\n            kilo<span className=\"text-[var(--accent-green)]\">/</span>ui\n          </span>\n        </Link>\n\n        {/* Desktop Collapse Toggle Button */}\n        <button\n          type=\"button\"\n          onClick={handleToggleCollapse}\n          className={cn(\n            \"p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-opacity duration-200 cursor-pointer hidden lg:flex items-center justify-center shrink-0\",\n            isCollapsed && \"opacity-0 pointer-events-none\"\n          )}\n          aria-label=\"Collapse sidebar\"\n          title=\"Collapse sidebar (⌘B)\"\n        >\n          <VectorPanelLeftIcon isCollapsed={false} className=\"h-3.5 w-3.5\" />\n        </button>\n\n        {/* Mobile Close Button */}\n        <button\n          type=\"button\"\n          onClick={() => onMobileOpenChange?.(false)}\n          className=\"p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded transition-colors lg:hidden\"\n          aria-label=\"Close sidebar\"\n        >\n          <X className=\"h-4 w-4\" />\n        </button>\n      </div>\n\n      {/* 2 & 3. Navigation according to variant */}\n      {isScrollableCategories ? (\n        <>\n          {topNavSection}\n          <div className=\"flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2.5 py-1 w-64 custom-scrollbar\">\n            {categoriesNavSection}\n          </div>\n        </>\n      ) : (\n        <div className=\"flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2.5 py-1 w-64 custom-scrollbar\">\n          {topNavSection}\n          {categoriesNavSection}\n        </div>\n      )}\n\n      {/* 4. Minimal Clean Footer */}\n      <div className=\"border-t border-[var(--border)] p-2.5 shrink-0 w-64\">\n        <Link\n          href=\"/docs\"\n          className=\"flex items-center justify-between text-xs font-sans font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-1\"\n          title=\"Registry Documentation\"\n        >\n          <span\n            className={cn(\n              \"whitespace-nowrap transition-opacity duration-200\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n          >\n            Documentation\n          </span>\n          <span\n            className={cn(\n              \"text-[10px] transition-opacity duration-200\",\n              isCollapsed && \"opacity-0 pointer-events-none\"\n            )}\n          >\n            /docs\n          </span>\n        </Link>\n      </div>\n    </div>\n  );\n\n  return (\n    <>\n      {/* Desktop Persistent Sidebar */}\n      <aside\n        ref={asideRef}\n        className={cn(\n          \"hidden lg:flex flex-col shrink-0 border-r border-[var(--border)] bg-[var(--bg-sidebar)] overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] h-screen sticky top-0 z-30\",\n          isCollapsed ? \"w-14\" : \"w-64\",\n          className\n        )}\n        {...props}\n      >\n        {sidebarContent}\n      </aside>\n\n      {/* Floating Hover Preview Card with Natural Spring Physics */}\n      <SidebarHoverPreview\n        hoverState={hoverState}\n        onMouseEnterPreview={handleMouseEnterPreview}\n        onMouseLeavePreview={handleMouseLeavePreview}\n        isCollapsed={isCollapsed}\n      />\n\n      {/* Mobile Drawer Overlay */}\n      {mobileOpen && (\n        <div className=\"fixed inset-0 z-50 lg:hidden flex\">\n          <div\n            className=\"fixed inset-0 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200\"\n            onClick={() => onMobileOpenChange?.(false)}\n          />\n          <div className=\"relative w-72 max-w-[85vw] h-full shadow-2xl z-50 animate-in slide-in-from-left duration-250\">\n            {sidebarContent}\n          </div>\n        </div>\n      )}\n    </>\n  );\n}\n\nfunction SidebarWithSearchParams(props: SidebarProps) {\n  const searchParams = useSearchParams();\n  const activeVariant = props.activeVariant || searchParams?.get(\"variant\") || undefined;\n  return <SidebarBase {...props} activeVariant={activeVariant} />;\n}\n\nexport function Sidebar(props: SidebarProps) {\n  return (\n    <React.Suspense fallback={<SidebarBase {...props} />}>\n      <SidebarWithSearchParams {...props} />\n    </React.Suspense>\n  );\n}\n"
      }
    ]
  },
  "expanding-card": {
    "name": "expanding-card",
    "category": "Media & Layout",
    "title": "Expanding Card",
    "description": "Interactive 4-image showcase card where hovering smoothly expands the primary image to acquire the entire 4-card space with an animated bottom-right action arrow.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { ExpandingCard } from \"@/components/ui/expanding-card\";\n\nexport function ExpandingCardDemo() {\n  return (\n    <ExpandingCard\n      title=\"Components\"\n      subtitle=\"Hover to reveal full showcase view\"\n      badge=\"Featured\"\n    />\n  );\n}",
    "props": [
      {
        "name": "title",
        "type": "string",
        "defaultValue": "'Components'",
        "description": "Header title displayed at the bottom of the card."
      },
      {
        "name": "subtitle",
        "type": "string",
        "defaultValue": "'Hover to reveal full showcase view'",
        "description": "Secondary description text."
      },
      {
        "name": "badge",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Optional pill badge in the card title."
      },
      {
        "name": "forcedHover",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Forces the expanded full 4-card state without requiring user cursor hover."
      },
      {
        "name": "images",
        "type": "ExpandingCardImage[]",
        "defaultValue": "DEFAULT_IMAGES",
        "description": "Array of 4 image objects with src, alt, title, and tags."
      }
    ],
    "files": [
      {
        "name": "expanding-card.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { ArrowUpRight, Sparkles } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface ExpandingCardImage {\n  src: string;\n  alt: string;\n  title?: string;\n  subtitle?: string;\n  tag?: string;\n}\n\nexport interface ExpandingCardProps extends React.HTMLAttributes<HTMLDivElement> {\n  title?: string;\n  subtitle?: string;\n  badge?: string;\n  images?: ExpandingCardImage[];\n  interactive?: boolean;\n  forcedHover?: boolean;\n}\n\nconst DEFAULT_IMAGES: ExpandingCardImage[] = [\n  {\n    src: \"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80\",\n    alt: \"Modern IDE Code Architecture\",\n    title: \"Primitives\",\n    subtitle: \"Core UI atoms\",\n    tag: \"Featured\",\n  },\n  {\n    src: \"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80\",\n    alt: \"Realtime Analytics Dashboard\",\n    title: \"Telemetry\",\n    subtitle: \"Performance metrics\",\n    tag: \"New\",\n  },\n  {\n    src: \"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80\",\n    alt: \"Cybersecurity Terminal Stream\",\n    title: \"Runtime\",\n    subtitle: \"Edge worker compute\",\n    tag: \"Popular\",\n  },\n  {\n    src: \"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80\",\n    alt: \"Design System UI Studio\",\n    title: \"Systems\",\n    subtitle: \"Components & tokens\",\n    tag: \"Updated\",\n  },\n];\n\nexport const ExpandingCard = React.forwardRef<HTMLDivElement, ExpandingCardProps>(\n  (\n    {\n      className,\n      title = \"Components\",\n      subtitle = \"Hover to reveal full showcase view\",\n      badge,\n      images = DEFAULT_IMAGES,\n      forcedHover = false,\n      ...props\n    },\n    ref\n  ) => {\n    const [isInternalHovered, setIsInternalHovered] = React.useState(false);\n    const isHovered = forcedHover || isInternalHovered;\n\n    const imgList = images.slice(0, 4);\n    const firstImg = imgList[0] || DEFAULT_IMAGES[0];\n    const otherImgs = imgList.slice(1);\n\n    return (\n      <div\n        ref={ref}\n        onMouseEnter={() => setIsInternalHovered(true)}\n        onMouseLeave={() => setIsInternalHovered(false)}\n        className={cn(\n          \"group relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none\",\n          \"hover:border-[var(--border-hover)] hover:shadow-2xl\",\n          className\n        )}\n        {...props}\n      >\n        {/* Top subtle gradient glow */}\n        <div className=\"pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[var(--accent-green)]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40\" />\n\n        {/* 4-Card Stage Container */}\n        <div className=\"relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-[var(--surface-secondary)]/50 border border-[var(--border)]/70\">\n          {/* Background grid showing the 4 slots */}\n          <div className=\"absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-2\">\n            {/* Slot 1 Placeholder / Spacer behind the expanding item */}\n            <div className=\"relative rounded-lg overflow-hidden bg-black/20\" />\n\n            {/* Slots 2, 3, 4 (fade out & shrink smoothly on hover) */}\n            {otherImgs.map((img, idx) => (\n              <div\n                key={idx}\n                className={cn(\n                  \"relative rounded-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-95 group-hover:opacity-0 group-hover:blur-xs\",\n                  isHovered ? \"scale-95 opacity-0 blur-xs\" : \"scale-100 opacity-100 blur-none\"\n                )}\n              >\n                {/* Image */}\n                {/* eslint-disable-next-line @next/next/no-img-element */}\n                <img\n                  src={img.src}\n                  alt={img.alt}\n                  className=\"h-full w-full object-cover\"\n                  loading=\"lazy\"\n                />\n                {/* Dark vignette gradient */}\n                <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent\" />\n\n                {/* Sub-card label info */}\n                <div className=\"absolute bottom-2 left-2 right-2 text-white\">\n                  {img.tag && (\n                    <span className=\"inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-xs mb-1\">\n                      {img.tag}\n                    </span>\n                  )}\n                  <div className=\"text-xs font-bold leading-tight truncate\">\n                    {img.title}\n                  </div>\n                  {img.subtitle && (\n                    <div className=\"text-[10px] text-white/70 truncate\">\n                      {img.subtitle}\n                    </div>\n                  )}\n                </div>\n              </div>\n            ))}\n          </div>\n\n          {/* FIRST IMAGE - Acquires the WHOLE 4-card space on hover! */}\n          <div\n            className={cn(\n              \"absolute z-20 overflow-hidden rounded-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,height,top,left]\",\n              // In default state: occupies top-left slot (padding 8px, roughly width calc(50% - 12px), height calc(50% - 12px))\n              !isHovered &&\n                \"top-2 left-2 w-[calc(50%-12px)] h-[calc(50%-12px)] rounded-lg\",\n              // In hovered state: expands to acquire the whole 4-card space!\n              isHovered &&\n                \"top-0 left-0 w-full h-full rounded-xl shadow-2xl\"\n            )}\n          >\n            {/* Expanded Hero Image */}\n            {/* eslint-disable-next-line @next/next/no-img-element */}\n            <img\n              src={firstImg.src}\n              alt={firstImg.alt}\n              className={cn(\n                \"h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]\",\n                isHovered ? \"scale-105\" : \"scale-100\"\n              )}\n            />\n\n            {/* Dynamic overlay tint */}\n            <div\n              className={cn(\n                \"absolute inset-0 transition-opacity duration-500\",\n                isHovered\n                  ? \"bg-gradient-to-t from-black/85 via-black/30 to-black/10\"\n                  : \"bg-gradient-to-t from-black/80 via-black/20 to-transparent\"\n              )}\n            />\n\n            {/* First Image Content Pill */}\n            <div\n              className={cn(\n                \"absolute bottom-2.5 left-2.5 right-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-white\",\n                isHovered && \"bottom-4 left-4 right-16\"\n              )}\n            >\n              <div className=\"flex items-center gap-2 mb-1\">\n                <span className=\"inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-green)]/90 text-black\">\n                  <Sparkles className=\"h-2.5 w-2.5\" />\n                  <span>{firstImg.tag || \"Primary\"}</span>\n                </span>\n                {isHovered && (\n                  <span className=\"text-[10px] font-mono text-white/70 animate-in fade-in duration-300\">\n                    Full Preview Active\n                  </span>\n                )}\n              </div>\n\n              <div\n                className={cn(\n                  \"font-bold leading-tight tracking-tight transition-all duration-300\",\n                  isHovered ? \"text-base sm:text-lg\" : \"text-xs\"\n                )}\n              >\n                {firstImg.title}\n              </div>\n\n              <p\n                className={cn(\n                  \"text-white/80 line-clamp-1 transition-all duration-300\",\n                  isHovered ? \"text-xs sm:text-sm mt-0.5 opacity-100\" : \"text-[10px] opacity-80\"\n                )}\n              >\n                {isHovered\n                  ? \"Expanded to full 4-card stage with high-fidelity preview\"\n                  : firstImg.subtitle}\n              </p>\n            </div>\n\n            {/* Bottom-right appearing Arrow */}\n            <div\n              className={cn(\n                \"absolute bottom-3.5 right-3.5 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer\",\n                isHovered\n                  ? \"opacity-100 translate-y-0 scale-100 rotate-0\"\n                  : \"opacity-0 translate-y-3 scale-75 -rotate-45 pointer-events-none\"\n              )}\n              title=\"Inspect component\"\n            >\n              <ArrowUpRight className=\"h-5 w-5 stroke-[2.25]\" />\n            </div>\n          </div>\n        </div>\n\n        {/* Bottom Card Label / Metadata */}\n        <div className=\"mt-4 flex items-center justify-between\">\n          <div>\n            <h3 className=\"font-mono text-base font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2\">\n              <span>{title}</span>\n              {badge && (\n                <span className=\"text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)]\">\n                  {badge}\n                </span>\n              )}\n            </h3>\n            {subtitle && (\n              <p className=\"text-xs text-[var(--text-secondary)] mt-0.5\">\n                {subtitle}\n              </p>\n            )}\n          </div>\n\n          <div\n            className={cn(\n              \"text-[11px] font-mono text-[var(--accent-green)] transition-all duration-300\",\n              isHovered ? \"opacity-100 translate-x-0\" : \"opacity-0 translate-x-2\"\n            )}\n          >\n            4x expanded\n          </div>\n        </div>\n      </div>\n    );\n  }\n);\n\nExpandingCard.displayName = \"ExpandingCard\";\n"
      }
    ]
  },
  "blurred-carousel": {
    "name": "blurred-carousel",
    "category": "Media & Layout",
    "title": "Blurred Edge Carousel",
    "description": "Hardware-accelerated horizontal template carousel with frosted glass blurred edge masks, minimal navigation controls, and 0.6s cubic-bezier sliding physics.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { BlurredCarousel } from \"@/components/ui/blurred-carousel\";\n\nexport function BlurredCarouselDemo() {\n  return (\n    <BlurredCarousel\n      title=\"Featured Templates\"\n      subtitle=\"Explore curated templates with smooth edge blur\"\n    />\n  );\n}",
    "props": [
      {
        "name": "title",
        "type": "string",
        "defaultValue": "'Featured Templates'",
        "description": "Section title displayed above the carousel."
      },
      {
        "name": "subtitle",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Optional subtitle description."
      },
      {
        "name": "autoPlay",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Enables automated periodic sliding between cards."
      },
      {
        "name": "intervalMs",
        "type": "number",
        "defaultValue": "4500",
        "description": "Interval in milliseconds between automated slides."
      },
      {
        "name": "items",
        "type": "CarouselItem[]",
        "defaultValue": "DEFAULT_CAROUSEL_ITEMS",
        "description": "List of slide cards containing cover image, title, and stats."
      }
    ],
    "files": [
      {
        "name": "blurred-carousel.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { ChevronLeft, ChevronRight, Eye, Heart, ExternalLink } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface CarouselItem {\n  id: string;\n  title: string;\n  category?: string;\n  image: string;\n  author: {\n    name: string;\n    avatar?: string;\n  };\n  stats: {\n    views: string;\n    likes: number | string;\n  };\n  badge?: string;\n  href?: string;\n}\n\nexport interface BlurredCarouselProps extends React.HTMLAttributes<HTMLDivElement> {\n  title?: string;\n  subtitle?: string;\n  items?: CarouselItem[];\n  autoPlay?: boolean;\n  intervalMs?: number;\n}\n\nconst DEFAULT_CAROUSEL_ITEMS: CarouselItem[] = [\n  {\n    id: \"apex\",\n    title: \"Apex - Cloud Development Studio\",\n    category: \"Developer Platform\",\n    image: \"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"Acme Labs\",\n      avatar: \"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"8.4K\",\n      likes: \"412\",\n    },\n    badge: \"Featured\",\n  },\n  {\n    id: \"flowly\",\n    title: \"Flowly - SaaS Analytics Dashboard\",\n    category: \"SaaS Dashboard\",\n    image: \"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"Alex Vance\",\n      avatar: \"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"6.2K\",\n      likes: \"358\",\n    },\n    badge: \"Popular\",\n  },\n  {\n    id: \"spectra\",\n    title: \"Spectra - Web3 Crypto Terminal\",\n    category: \"Fintech Terminal\",\n    image: \"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"Marcus Sterling\",\n      avatar: \"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"5.1K\",\n      likes: \"284\",\n    },\n    badge: \"New\",\n  },\n  {\n    id: \"prism\",\n    title: \"Prism - Design System UI Kit\",\n    category: \"UI System\",\n    image: \"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"Elena Rostova\",\n      avatar: \"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"4.9K\",\n      likes: \"318\",\n    },\n    badge: \"Design\",\n  },\n  {\n    id: \"vortex\",\n    title: \"Vortex - Distributed Cloud Runtime\",\n    category: \"Infrastructure\",\n    image: \"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"DevCore Studio\",\n      avatar: \"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"3.8K\",\n      likes: \"215\",\n    },\n    badge: \"Enterprise\",\n  },\n  {\n    id: \"omni\",\n    title: \"Omni - Spatial 3D Experience\",\n    category: \"Spatial UI\",\n    image: \"https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"Studio Mono\",\n      avatar: \"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"7.2K\",\n      likes: \"490\",\n    },\n    badge: \"AI Powered\",\n  },\n  {\n    id: \"hyperion\",\n    title: \"Hyperion - Generative Audio Engine\",\n    category: \"Neural Audio\",\n    image: \"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"SoundWave AI\",\n      avatar: \"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"9.1K\",\n      likes: \"634\",\n    },\n    badge: \"Audio Lab\",\n  },\n  {\n    id: \"zenith\",\n    title: \"Zenith - Autonomous Cyber Intelligence\",\n    category: \"Security Core\",\n    image: \"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80\",\n    author: {\n      name: \"Cipher Works\",\n      avatar: \"https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80\",\n    },\n    stats: {\n      views: \"11.4K\",\n      likes: \"820\",\n    },\n    badge: \"Quantum\",\n  },\n];\n\nexport const BlurredCarousel = React.forwardRef<HTMLDivElement, BlurredCarouselProps>(\n  (\n    {\n      className,\n      title = \"Featured Templates\",\n      subtitle,\n      items = DEFAULT_CAROUSEL_ITEMS,\n      autoPlay = false,\n      intervalMs = 4500,\n      ...props\n    },\n    ref\n  ) => {\n    const [currentIndex, setCurrentIndex] = React.useState(0);\n    const trackRef = React.useRef<HTMLDivElement>(null);\n    const [trackOffset, setTrackOffset] = React.useState(0);\n    const maxIndex = Math.max(0, items.length - 1);\n\n    const prevSlide = React.useCallback(() => {\n      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));\n    }, [maxIndex]);\n\n    const nextSlide = React.useCallback(() => {\n      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));\n    }, [maxIndex]);\n\n    // Recalculate pixel offset of target slide\n    const updateOffset = React.useCallback(() => {\n      if (!trackRef.current) return;\n      const targetChild = trackRef.current.children[currentIndex] as HTMLElement | undefined;\n      if (targetChild) {\n        setTrackOffset(targetChild.offsetLeft);\n      }\n    }, [currentIndex]);\n\n    React.useEffect(() => {\n      updateOffset();\n      window.addEventListener(\"resize\", updateOffset);\n      return () => window.removeEventListener(\"resize\", updateOffset);\n    }, [updateOffset]);\n\n    // Optional autoplay\n    React.useEffect(() => {\n      if (!autoPlay) return;\n      const timer = setInterval(() => {\n        nextSlide();\n      }, intervalMs);\n      return () => clearInterval(timer);\n    }, [autoPlay, intervalMs, nextSlide]);\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\"relative w-full max-w-6xl mx-auto space-y-4 select-none\", className)}\n        {...props}\n      >\n        {/* Header */}\n        <div className=\"flex items-center justify-between px-2 sm:px-4\">\n          <div>\n            <h2 className=\"font-mono text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]\">\n              {title}\n            </h2>\n            {subtitle && (\n              <p className=\"text-xs text-[var(--text-secondary)] mt-0.5 font-sans\">\n                {subtitle}\n              </p>\n            )}\n          </div>\n\n          {/* Dots Indicator */}\n          <div className=\"flex items-center gap-1.5\">\n            {items.map((_, idx) => (\n              <button\n                key={idx}\n                type=\"button\"\n                onClick={() => setCurrentIndex(idx)}\n                className={cn(\n                  \"h-1.5 rounded-full transition-all duration-300 cursor-pointer\",\n                  currentIndex === idx\n                    ? \"w-6 bg-[var(--text-primary)]\"\n                    : \"w-1.5 bg-[var(--text-muted)] hover:bg-[var(--text-secondary)]\"\n                )}\n                aria-label={`Go to slide ${idx + 1}`}\n              />\n            ))}\n          </div>\n        </div>\n\n        {/* Carousel Viewport Container with Soft Flowing Edge Fade */}\n        <div className=\"relative w-full\">\n          {/* Masked Viewport: cards naturally and seamlessly fade at outer boundaries */}\n          <div\n            className=\"relative w-full overflow-hidden rounded-2xl py-2 px-1\"\n            style={{\n              WebkitMaskImage:\n                \"linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)\",\n              maskImage:\n                \"linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)\",\n            }}\n          >\n            {/* Subtle flowing left edge blur that softly dissipates into clarity */}\n            <div\n              className=\"pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 backdrop-blur-xs\"\n              style={{\n                WebkitMaskImage: \"linear-gradient(to right, black 15%, transparent 100%)\",\n                maskImage: \"linear-gradient(to right, black 15%, transparent 100%)\",\n              }}\n              aria-hidden=\"true\"\n            />\n\n            {/* Subtle flowing right edge blur that softly dissipates into clarity */}\n            <div\n              className=\"pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 backdrop-blur-xs\"\n              style={{\n                WebkitMaskImage: \"linear-gradient(to left, black 15%, transparent 100%)\",\n                maskImage: \"linear-gradient(to left, black 15%, transparent 100%)\",\n              }}\n              aria-hidden=\"true\"\n            />\n\n            {/* Sliding Cards Track with EXACT transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) */}\n            <div\n              ref={trackRef}\n              className=\"flex gap-4 sm:gap-6 will-change-transform\"\n              style={{\n                transform: `translate3d(-${trackOffset}px, 0, 0)`,\n                transition: \"transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)\",\n              }}\n            >\n              {items.map((item, idx) => {\n                const isSelected = idx === currentIndex;\n                return (\n                  <div\n                    key={item.id}\n                    className={cn(\n                      \"relative shrink-0 w-[85%] sm:w-[48%] md:w-[38%] lg:w-[32%] rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3 transition-all duration-300 group cursor-pointer\",\n                      isSelected\n                        ? \"ring-1 ring-[var(--accent-green)]/40 shadow-xl border-[var(--border-hover)]\"\n                        : \"opacity-90 hover:opacity-100 hover:border-[var(--border-hover)]\"\n                    )}\n                    onClick={() => setCurrentIndex(idx)}\n                  >\n                    {/* Image Card Shell */}\n                    <div className=\"relative h-48 sm:h-56 w-full rounded-lg overflow-hidden bg-[var(--surface-secondary)]/50\">\n                      {/* eslint-disable-next-line @next/next/no-img-element */}\n                      <img\n                        src={item.image}\n                        alt={item.title}\n                        className=\"h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105\"\n                        loading=\"lazy\"\n                      />\n\n                      {/* Gradient Overlay */}\n                      <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent\" />\n\n                      {/* Top Badge */}\n                      {item.badge && (\n                        <div className=\"absolute top-2.5 left-2.5\">\n                          <span className=\"inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20\">\n                            {item.badge}\n                          </span>\n                        </div>\n                      )}\n\n                      {/* Quick Link on Hover */}\n                      <div className=\"absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200\">\n                        <div className=\"h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white\">\n                          <ExternalLink className=\"h-3.5 w-3.5\" />\n                        </div>\n                      </div>\n                    </div>\n\n                    {/* Card Metadata Row */}\n                    <div className=\"mt-3 flex items-center justify-between gap-2 px-1\">\n                      <div className=\"flex items-center gap-2.5 min-w-0\">\n                        {/* Author Avatar or Icon */}\n                        {item.author.avatar ? (\n                          // eslint-disable-next-line @next/next/no-img-element\n                          <img\n                            src={item.author.avatar}\n                            alt={item.author.name}\n                            className=\"h-6 w-6 rounded-full object-cover border border-[var(--border)] shrink-0\"\n                          />\n                        ) : (\n                          <div className=\"h-6 w-6 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[10px] font-mono text-[var(--text-muted)] shrink-0\">\n                            {item.author.name.charAt(0)}\n                          </div>\n                        )}\n\n                        <div className=\"min-w-0\">\n                          <h3 className=\"font-mono text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-green)] transition-colors\">\n                            {item.title}\n                          </h3>\n                          <div className=\"text-[10px] text-[var(--text-muted)] truncate\">\n                            {item.category || item.author.name}\n                          </div>\n                        </div>\n                      </div>\n\n                      {/* Stats */}\n                      <div className=\"flex items-center gap-2.5 font-mono text-[11px] text-[var(--text-muted)] shrink-0\">\n                        <span className=\"flex items-center gap-1\">\n                          <Eye className=\"h-3 w-3 opacity-70\" />\n                          <span>{item.stats.views}</span>\n                        </span>\n                        <span className=\"flex items-center gap-1\">\n                          <Heart className=\"h-3 w-3 text-rose-500 fill-rose-500/20\" />\n                          <span>{item.stats.likes}</span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                );\n              })}\n            </div>\n          </div>\n\n          {/* Minimal Left Button */}\n          <button\n            type=\"button\"\n            onClick={prevSlide}\n            aria-label=\"Previous slide\"\n            className=\"absolute -left-3 sm:left-1 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-elevated)]/90 hover:bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent-green)]/50 shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer\"\n          >\n            <ChevronLeft className=\"h-4 w-4 stroke-[2.25]\" />\n          </button>\n\n          {/* Minimal Right Button */}\n          <button\n            type=\"button\"\n            onClick={nextSlide}\n            aria-label=\"Next slide\"\n            className=\"absolute -right-3 sm:right-1 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-elevated)]/90 hover:bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--accent-green)]/50 shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer\"\n          >\n            <ChevronRight className=\"h-4 w-4 stroke-[2.25]\" />\n          </button>\n        </div>\n      </div>\n    );\n  }\n);\n\nBlurredCarousel.displayName = \"BlurredCarousel\";\n"
      }
    ]
  },
  "concave-carousel": {
    "name": "concave-carousel",
    "category": "Media & Layout",
    "title": "Concave Carousel",
    "description": "Hardware-accelerated 3D cylindrical carousel featuring smooth scroll-wheel and drag inertia, floor mirror reflections, dynamic active captions, and rotunda geometry with positive (concave) and negative (forward-bending convex) curvature.",
    "variants": [
      "Rotunda",
      "Tunnel",
      "Flat",
      "Panoramic",
      "Convex"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { ConcaveCarousel } from \"@/components/ui/concave-carousel\";\n\nexport function ConcaveCarouselDemo() {\n  return (\n    <ConcaveCarousel\n      preset=\"Rotunda\"\n      curvature={0.72}\n      aspect={1.25}\n      wheel={true}\n      draggable={true}\n      captions={true}\n    />\n  );\n}",
    "props": [
      {
        "name": "preset",
        "type": "'Rotunda' | 'Tunnel' | 'Flat' | 'Panoramic' | 'Convex'",
        "defaultValue": "'Rotunda'",
        "description": "Geometry preset shaping the 3D curve (including forward-bending Convex)."
      },
      {
        "name": "autoplay",
        "type": "'Drift' | 'None' | 'Step'",
        "defaultValue": "'Drift'",
        "description": "Autonomous motion behavior: continuous fluid drift or timed discrete stepping."
      },
      {
        "name": "background",
        "type": "string",
        "defaultValue": "'#0A0A0A'",
        "description": "Background canvas CSS color."
      },
      {
        "name": "aspect",
        "type": "number",
        "defaultValue": "1.25",
        "description": "Aspect ratio width/height of the carousel cards."
      },
      {
        "name": "size",
        "type": "number",
        "defaultValue": "0.46",
        "description": "Scale multiplier factor governing card dimensions."
      },
      {
        "name": "curvature",
        "type": "number",
        "defaultValue": "0.72",
        "description": "Depth of the cylindrical curve arc (positive for concave, negative for forward-bending convex)."
      },
      {
        "name": "distance",
        "type": "number",
        "defaultValue": "4.0",
        "description": "3D camera perspective distance factor."
      },
      {
        "name": "tilt",
        "type": "number",
        "defaultValue": "0.0",
        "description": "X-axis angular pitch tilt in degrees."
      },
      {
        "name": "gap",
        "type": "number",
        "defaultValue": "16",
        "description": "Spacing in pixels between adjacent cards."
      },
      {
        "name": "radius",
        "type": "number",
        "defaultValue": "14",
        "description": "Border radius in pixels applied to cards."
      },
      {
        "name": "reflection",
        "type": "number",
        "defaultValue": "0.06",
        "description": "Opacity factor of the floor mirror reflection."
      },
      {
        "name": "dim",
        "type": "number",
        "defaultValue": "0.35",
        "description": "Distance falloff opacity factor for peripheral cards."
      },
      {
        "name": "speed",
        "type": "number",
        "defaultValue": "0.16",
        "description": "Continuous drift speed multiplier."
      },
      {
        "name": "interval",
        "type": "number",
        "defaultValue": "4.0",
        "description": "Step interval in seconds when autoplay is set to Step."
      },
      {
        "name": "inertia",
        "type": "number",
        "defaultValue": "0.50",
        "description": "Physics momentum and friction dampening."
      },
      {
        "name": "snap",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Enables magnetic snapping to nearest card."
      },
      {
        "name": "wheel",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables trackpad and mouse wheel scrolling along the 3D arc."
      },
      {
        "name": "draggable",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables direct touch and pointer dragging."
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Pauses autoplay drift while pointer is over carousel."
      },
      {
        "name": "captions",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Displays title and subtitle captions under active center card."
      },
      {
        "name": "controls",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Displays minimal pagination controls."
      },
      {
        "name": "items",
        "type": "ConcaveCarouselItem[]",
        "defaultValue": "DEFAULT_CONCAVE_ITEMS",
        "description": "Array of items with title, subtitle, and gradient or image."
      }
    ],
    "files": [
      {
        "name": "concave-carousel.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { ChevronLeft, ChevronRight } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\n/* ─────────────────────────────────────────────────────────────────── */\n/* Types                                                                */\n/* ─────────────────────────────────────────────────────────────────── */\nexport interface ConcaveCarouselItem {\n  id: string | number;\n  title?: string;\n  subtitle?: string;\n  image?: string;\n  gradient?: string;\n}\n\nexport interface ConcaveCarouselProps extends React.HTMLAttributes<HTMLDivElement> {\n  items?: ConcaveCarouselItem[];\n  preset?: \"Rotunda\" | \"Tunnel\" | \"Flat\" | \"Panoramic\" | \"Convex\";\n  autoplay?: \"Drift\" | \"None\" | \"Step\";\n  background?: string;\n  aspect?: number;\n  size?: number;\n  curvature?: number;\n  distance?: number;\n  tilt?: number;\n  gap?: number;\n  radius?: number;\n  reflection?: number;\n  dim?: number;\n  speed?: number;\n  interval?: number;\n  inertia?: number;\n  snap?: boolean;\n  wheel?: boolean;\n  draggable?: boolean;\n  pauseOnHover?: boolean;\n  captions?: boolean;\n  controls?: boolean;\n  paused?: boolean;\n  onIndexChange?: (index: number) => void;\n}\n\n/* ─────────────────────────────────────────────────────────────────── */\n/* Default Curated Abstract Art Items matching Image 2                  */\n/* ─────────────────────────────────────────────────────────────────── */\nexport const DEFAULT_CONCAVE_ITEMS: ConcaveCarouselItem[] = [\n  {\n    id: 1,\n    title: \"Solar Flare\",\n    subtitle: \"Radiant warmth in geometric harmony\",\n    gradient: \"radial-gradient(circle at 35% 35%, #ff5e3a 0%, #ff2a6d 45%, #05051a 90%)\",\n  },\n  {\n    id: 2,\n    title: \"Chroma Drift\",\n    subtitle: \"Fluid color resonance across time\",\n    gradient: \"radial-gradient(circle at 65% 30%, #7928ca 0%, #ff0080 50%, #1a002c 95%)\",\n  },\n  {\n    id: 3,\n    title: \"Cosmic Horizon\",\n    subtitle: \"Deep space nebula gradients\",\n    gradient: \"linear-gradient(135deg, #00f2fe 0%, #4facfe 35%, #000428 95%)\",\n  },\n  {\n    id: 4,\n    title: \"Velvet Bloom\",\n    subtitle: \"Organic soft curves in dusk twilight\",\n    gradient: \"radial-gradient(circle at 25% 75%, #f12711 0%, #f5af19 50%, #430d4b 95%)\",\n  },\n  {\n    id: 5,\n    title: \"Neon Synthesis\",\n    subtitle: \"Cybernetic light beam refraction\",\n    gradient: \"linear-gradient(45deg, #11998e 0%, #38ef7d 40%, #0c2b2f 90%)\",\n  },\n  {\n    id: 6,\n    title: \"Rose balance\",\n    subtitle: \"A bright point of balance\",\n    gradient: \"radial-gradient(circle at 80% 20%, #ff0844 0%, #ffb199 45%, #7a003c 85%, #180010 100%)\",\n  },\n  {\n    id: 7,\n    title: \"Amber loop\",\n    subtitle: \"Warmth around an open center\",\n    gradient: \"radial-gradient(circle at 30% 70%, #f77062 0%, #fe5196 35%, #fbb034 75%, #300020 100%)\",\n  },\n  {\n    id: 8,\n    title: \"Eclipse Shadow\",\n    subtitle: \"Monolithic contrast and quiet dusk\",\n    gradient: \"linear-gradient(155deg, #eb3349 0%, #f45c43 40%, #14142b 85%)\",\n  },\n];\n\n/* ─────────────────────────────────────────────────────────────────── */\n/* ConcaveCarousel Component                                            */\n/* ─────────────────────────────────────────────────────────────────── */\nexport function ConcaveCarousel({\n  items = DEFAULT_CONCAVE_ITEMS,\n  preset = \"Rotunda\",\n  autoplay = \"Drift\",\n  background = \"#0A0A0A\",\n  aspect = 1.25,\n  size = 0.46,\n  curvature = 0.72,\n  distance = 4.0,\n  tilt = 0.0,\n  gap = 16,\n  radius = 14,\n  reflection = 0.06,\n  dim = 0.35,\n  speed = 0.16,\n  interval = 4.0,\n  inertia = 0.5,\n  snap = false,\n  wheel = true,\n  draggable = true,\n  pauseOnHover = true,\n  captions = true,\n  controls = true,\n  paused = false,\n  onIndexChange,\n  className,\n  style,\n  ...props\n}: ConcaveCarouselProps) {\n  const containerRef = React.useRef<HTMLDivElement>(null);\n\n  // Position state (fractional item index, e.g. 5.0 = item 6 active)\n  const [position, setPosition] = React.useState<number>(5.0);\n  const targetPosRef = React.useRef<number>(5.0);\n  const velocityRef = React.useRef<number>(0);\n  const isHoveredRef = React.useRef<boolean>(false);\n  const isDraggingRef = React.useRef<boolean>(false);\n  const dragStartXRef = React.useRef<number>(0);\n  const dragStartPosRef = React.useRef<number>(5.0);\n  const lastDragTimeRef = React.useRef<number>(0);\n\n  const totalItems = items.length;\n\n  // Active integer index for controls & pagination display\n  const activeIndex = (Math.round(position) % totalItems + totalItems) % totalItems;\n\n  React.useEffect(() => {\n    onIndexChange?.(activeIndex);\n  }, [activeIndex, onIndexChange]);\n\n  // Handle Preset Overrides\n  const effectiveCurvature = React.useMemo(() => {\n    if (preset === \"Flat\") return 0.0;\n    if (preset === \"Tunnel\") return 1.1;\n    if (preset === \"Panoramic\") return 0.45;\n    if (preset === \"Convex\") return -0.72;\n    return curvature; // \"Rotunda\" or custom uses the slider curvature\n  }, [preset, curvature]);\n\n  /* ── 60 FPS Physics & Inertia Loop ── */\n  React.useEffect(() => {\n    let animId: number;\n    let lastTime = performance.now();\n\n    const loop = (now: number) => {\n      const dt = Math.min((now - lastTime) / 1000, 0.1);\n      lastTime = now;\n\n      const isAutoplayActive = !paused && (!pauseOnHover || !isHoveredRef.current) && !isDraggingRef.current;\n\n      // Autoplay: Drift mode (continuous smooth revolving)\n      if (isAutoplayActive && autoplay === \"Drift\") {\n        targetPosRef.current += speed * dt * 0.9;\n      }\n\n      // Smooth lerping to target position with inertia\n      const friction = 1 - Math.pow(0.001, dt * (1.1 - inertia * 0.5));\n      const posDiff = targetPosRef.current - position;\n\n      if (!isDraggingRef.current) {\n        if (snap) {\n          // Snap spring toward nearest integer\n          const targetSnap = Math.round(targetPosRef.current);\n          targetPosRef.current += (targetSnap - targetPosRef.current) * (0.08 + speed * 0.1);\n        }\n\n        velocityRef.current += posDiff * friction * 0.35;\n        velocityRef.current *= Math.pow(0.2, dt);\n        setPosition((prev) => prev + (targetPosRef.current - prev) * 0.14 + velocityRef.current * dt);\n      } else {\n        // Direct follow during drag\n        setPosition((prev) => prev + (targetPosRef.current - prev) * 0.35);\n      }\n\n      animId = requestAnimationFrame(loop);\n    };\n\n    animId = requestAnimationFrame(loop);\n    return () => cancelAnimationFrame(animId);\n  }, [autoplay, speed, inertia, snap, paused, pauseOnHover, position]);\n\n  // Autoplay: Step mode\n  React.useEffect(() => {\n    if (autoplay !== \"Step\" || paused) return;\n\n    const timer = setInterval(() => {\n      if (pauseOnHover && isHoveredRef.current) return;\n      if (isDraggingRef.current) return;\n      targetPosRef.current = Math.round(targetPosRef.current) + 1;\n    }, interval * 1000);\n\n    return () => clearInterval(timer);\n  }, [autoplay, interval, pauseOnHover, paused]);\n\n  /* ── Wheel scroll interaction (\"yea on scroll it will scroll\") ── */\n  const handleWheel = React.useCallback(\n    (e: React.WheelEvent) => {\n      if (!wheel) return;\n      // Accept vertical or horizontal mouse wheel / trackpad scroll\n      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;\n      if (Math.abs(delta) < 1) return;\n\n      e.preventDefault();\n      const sensitivity = 0.0022 * (speed > 0 ? speed * 6 : 1);\n      targetPosRef.current += delta * sensitivity;\n    },\n    [wheel, speed]\n  );\n\n  /* ── Pointer Drag interaction ── */\n  const handlePointerDown = (e: React.PointerEvent) => {\n    if (!draggable) return;\n    isDraggingRef.current = true;\n    dragStartXRef.current = e.clientX;\n    dragStartPosRef.current = targetPosRef.current;\n    lastDragTimeRef.current = performance.now();\n    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);\n  };\n\n  const handlePointerMove = (e: React.PointerEvent) => {\n    if (!isDraggingRef.current) return;\n    const dx = e.clientX - dragStartXRef.current;\n    const now = performance.now();\n    const dt = Math.max(now - lastDragTimeRef.current, 1);\n    lastDragTimeRef.current = now;\n\n    const dragSensitivity = 0.0028;\n    targetPosRef.current = dragStartPosRef.current - dx * dragSensitivity;\n    velocityRef.current = -(dx / dt) * 0.003;\n  };\n\n  const handlePointerUp = (e: React.PointerEvent) => {\n    if (!isDraggingRef.current) return;\n    isDraggingRef.current = false;\n    try {\n      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);\n    } catch {}\n\n    if (snap) {\n      targetPosRef.current = Math.round(targetPosRef.current);\n    }\n  };\n\n  const handlePrev = () => {\n    targetPosRef.current = Math.round(targetPosRef.current) - 1;\n  };\n\n  const handleNext = () => {\n    targetPosRef.current = Math.round(targetPosRef.current) + 1;\n  };\n\n  /* ── Render 3D Concave Arc Layout ── */\n  // View range: show 5-7 cards surrounding the center position\n  const visibleCardIndices: number[] = [];\n  const range = 3;\n  const centerInt = Math.round(position);\n\n  for (let offset = -range; offset <= range; offset++) {\n    visibleCardIndices.push(centerInt + offset);\n  }\n\n  // Base card dimensions derived from size & aspect\n  const baseCardWidth = Math.round(360 * (size / 0.46));\n  const baseCardHeight = Math.round(baseCardWidth / aspect);\n\n  // Perspective camera distance in px\n  const perspectivePx = Math.round(distance * 280);\n\n  // Active item details for caption display\n  const currentActiveItem = items[activeIndex];\n\n  return (\n    <div\n      ref={containerRef}\n      onWheel={handleWheel}\n      onPointerDown={handlePointerDown}\n      onPointerMove={handlePointerMove}\n      onPointerUp={handlePointerUp}\n      onPointerCancel={handlePointerUp}\n      onMouseEnter={() => {\n        isHoveredRef.current = true;\n      }}\n      onMouseLeave={() => {\n        isHoveredRef.current = false;\n      }}\n      className={cn(\n        \"relative w-full overflow-hidden select-none flex flex-col items-center justify-center py-10 sm:py-16 cursor-grab active:cursor-grabbing\",\n        className\n      )}\n      style={{\n        backgroundColor: background,\n        ...style,\n      }}\n      {...props}\n    >\n      {/* 3D Scene Viewport with Concave Perspective */}\n      <div\n        className=\"relative w-full flex items-center justify-center\"\n        style={{\n          perspective: `${perspectivePx}px`,\n          perspectiveOrigin: \"50% 50%\",\n          height: `${baseCardHeight + 140}px`,\n        }}\n      >\n        {/* Concave Arc Container */}\n        <div\n          className=\"relative w-full h-full flex items-center justify-center\"\n          style={{\n            transformStyle: \"preserve-3d\",\n            transform: `rotateX(${tilt}deg)`,\n          }}\n        >\n          {visibleCardIndices.map((virtualIdx) => {\n            // Modulo wrapped real item index\n            const realIdx = ((virtualIdx % totalItems) + totalItems) % totalItems;\n            const item = items[realIdx];\n            if (!item) return null;\n\n            // Offset from fractional center position\n            const offset = virtualIdx - position;\n\n            // Arc Geometry:\n            // When effectiveCurvature > 0: concave (sides bend backward into screen, z < 0)\n            // When effectiveCurvature < 0: convex / forward-bending (sides bend forward toward viewer, z > 0)\n            const spacing = baseCardWidth + gap;\n            const x = offset * spacing;\n            const z = -Math.abs(offset) * (effectiveCurvature * 120) - Math.pow(offset, 2) * (effectiveCurvature * 38);\n            const rotateY = -offset * (effectiveCurvature * 24); // cylindrical arc turn\n\n            // Distance dimming\n            const cardDim = Math.max(0.15, 1 - Math.abs(offset) * dim);\n\n            // Dynamic depth sorting: when bending forward (negative curvature), outer cards are physically closer in Z\n            const zIndexVal = effectiveCurvature < 0\n              ? Math.round(100 + Math.abs(offset) * 10)\n              : Math.round(100 - Math.abs(offset) * 10);\n\n            return (\n              <div\n                key={virtualIdx}\n                className=\"absolute will-change-transform transition-opacity duration-150\"\n                style={{\n                  width: `${baseCardWidth}px`,\n                  height: `${baseCardHeight}px`,\n                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg)`,\n                  transformStyle: \"preserve-3d\",\n                  opacity: cardDim,\n                  zIndex: zIndexVal,\n                }}\n              >\n                {/* 1. Main Artwork Card */}\n                <div\n                  className=\"relative w-full h-full overflow-hidden border border-white/10 shadow-2xl transition-all duration-300\"\n                  style={{\n                    borderRadius: `${radius}px`,\n                    background: item.gradient || \"linear-gradient(135deg, #ff007f 0%, #7928ca 100%)\",\n                    boxShadow: \"0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)\",\n                  }}\n                >\n                  {/* Internal ambient highlight sheen */}\n                  <div className=\"absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/15 pointer-events-none\" />\n\n                  {/* High quality custom image artwork if present */}\n                  {item.image && (\n                    <img\n                      src={item.image}\n                      alt={item.title || \"Carousel item\"}\n                      className=\"w-full h-full object-cover pointer-events-none\"\n                    />\n                  )}\n                </div>\n\n                {/* 2. Mirrored Surface Floor Reflection (matching Image 2 & reflection slider) */}\n                {reflection > 0 && (\n                  <div\n                    aria-hidden=\"true\"\n                    className=\"absolute left-0 right-0 pointer-events-none overflow-hidden\"\n                    style={{\n                      top: `${baseCardHeight + 8}px`,\n                      height: `${baseCardHeight * 0.45}px`,\n                      borderRadius: `${radius}px`,\n                      background: item.gradient || \"linear-gradient(135deg, #ff007f 0%, #7928ca 100%)\",\n                      transform: \"scaleY(-1)\",\n                      opacity: reflection,\n                      maskImage: \"linear-gradient(to top, transparent 0%, rgba(0,0,0,0.8) 100%)\",\n                      WebkitMaskImage: \"linear-gradient(to top, transparent 0%, rgba(0,0,0,0.8) 100%)\",\n                      filter: \"blur(2px)\",\n                    }}\n                  />\n                )}\n              </div>\n            );\n          })}\n        </div>\n      </div>\n\n      {/* Dynamic Captions Under Active Center Item matching Image 2 */}\n      {captions && currentActiveItem && (\n        <div className=\"relative z-20 flex flex-col items-center justify-center text-center mt-3 mb-4 space-y-1 transition-opacity duration-300 pointer-events-none\">\n          <h3 className=\"text-sm sm:text-base font-semibold text-white tracking-tight\">\n            {currentActiveItem.title}\n          </h3>\n          <p className=\"text-xs text-neutral-400 font-normal\">\n            {currentActiveItem.subtitle}\n          </p>\n        </div>\n      )}\n\n      {/* Bottom Navigation Controls `< 06 / 08 >` matching Image 2 */}\n      {controls && (\n        <div className=\"relative z-20 inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-lg\">\n          <button\n            type=\"button\"\n            onClick={handlePrev}\n            className=\"p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer\"\n            aria-label=\"Previous item\"\n          >\n            <ChevronLeft className=\"h-4 w-4\" />\n          </button>\n\n          <span className=\"font-mono text-xs text-neutral-300 font-medium tabular-nums px-1\">\n            {String(activeIndex + 1).padStart(2, \"0\")} / {String(totalItems).padStart(2, \"0\")}\n          </span>\n\n          <button\n            type=\"button\"\n            onClick={handleNext}\n            className=\"p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer\"\n            aria-label=\"Next item\"\n          >\n            <ChevronRight className=\"h-4 w-4\" />\n          </button>\n        </div>\n      )}\n    </div>\n  );\n}\n"
      }
    ]
  },
  "content-slider": {
    "name": "content-slider",
    "category": "Navigation",
    "title": "TOC Content Slider",
    "description": "Table of contents content slider with active section indicator rail, cursor-following hover slider with rubber band physics, and text translation on hover.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { ContentSlider } from \"@/components/ui/content-slider\";\n\nexport function ContentSliderDemo() {\n  return (\n    <ContentSlider\n      title=\"On this page\"\n    />\n  );\n}",
    "props": [
      {
        "name": "title",
        "type": "string",
        "defaultValue": "'On this page'",
        "description": "Table of contents header label."
      },
      {
        "name": "activeId",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Controlled active section identifier."
      },
      {
        "name": "rubberBandEffect",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables cubic-bezier rubber band overshoot animation on sliders and text."
      },
      {
        "name": "items",
        "type": "TOCItem[]",
        "defaultValue": "DEFAULT_TOC_ITEMS",
        "description": "Hierarchical array of sections and sub-sections."
      },
      {
        "name": "onSelect",
        "type": "(id: string) => void",
        "defaultValue": "undefined",
        "description": "Callback triggered when a section is clicked."
      }
    ],
    "files": [
      {
        "name": "content-slider.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { AlignLeft, Check } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface TOCItem {\n  id: string;\n  label: string;\n  level?: 1 | 2; // 1 = main section, 2 = sub-section / nested\n  description?: string;\n}\n\nexport interface ContentSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onSelect\"> {\n  title?: string;\n  items?: TOCItem[];\n  activeId?: string;\n  onSelect?: (id: string) => void;\n  rubberBandEffect?: boolean;\n}\n\nexport const DEFAULT_TOC_ITEMS: TOCItem[] = [\n  { id: \"installation\", label: \"Installation\", level: 1 },\n  { id: \"usage\", label: \"Usage\", level: 1 },\n  { id: \"check-animation\", label: \"Check animation\", level: 2 },\n  { id: \"animation\", label: \"Animation\", level: 1 },\n  { id: \"api-reference\", label: \"API Reference\", level: 1 },\n  {\n    id: \"api-primitives\",\n    label: \"Root, Trigger, Portal, Group, Label, RadioGroup, Separator, Arrow, Sub\",\n    level: 2,\n  },\n  {\n    id: \"api-items\",\n    label: \"Item, CheckboxItem, RadioItem, SubTrigger\",\n    level: 2,\n  },\n  {\n    id: \"api-content\",\n    label: \"Content, SubContent\",\n    level: 2,\n  },\n  {\n    id: \"api-indicator\",\n    label: \"ItemIndicator\",\n    level: 2,\n  },\n];\n\nexport const ContentSlider = React.forwardRef<HTMLDivElement, ContentSliderProps>(\n  (\n    {\n      className,\n      title = \"On this page\",\n      items = DEFAULT_TOC_ITEMS,\n      activeId: controlledActiveId,\n      onSelect,\n      rubberBandEffect = true,\n      ...props\n    },\n    ref\n  ) => {\n    const [internalActiveId, setInternalActiveId] = React.useState<string>(\n      controlledActiveId || items[0]?.id || \"\"\n    );\n    const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;\n\n    // Hover state tracking\n    const [hoveredId, setHoveredId] = React.useState<string | null>(null);\n\n    // Refs to track pixel coordinates of each item relative to the container\n    const listRef = React.useRef<HTMLDivElement>(null);\n    const itemRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());\n\n    // Coordinate positions for the Big Slider (Active indicator) and Small Slider (Hover indicator)\n    const [activeIndicatorStyle, setActiveIndicatorStyle] = React.useState<{\n      top: number;\n      height: number;\n    }>({ top: 0, height: 18 });\n\n    const [hoverIndicatorStyle, setHoverIndicatorStyle] = React.useState<{\n      top: number;\n      height: number;\n      opacity: number;\n    }>({ top: 0, height: 10, opacity: 0 });\n\n    // Update the Big Slider position whenever activeId changes\n    const updateActivePosition = React.useCallback(() => {\n      if (!listRef.current) return;\n      const el = itemRefs.current.get(activeId);\n      if (el) {\n        const listTop = listRef.current.getBoundingClientRect().top;\n        const elRect = el.getBoundingClientRect();\n        const top = elRect.top - listTop + (elRect.height - 18) / 2;\n        setActiveIndicatorStyle({ top, height: 18 });\n      }\n    }, [activeId]);\n\n    // Update the Small Slider position whenever hoveredId changes\n    const updateHoverPosition = React.useCallback(() => {\n      if (!listRef.current || !hoveredId) {\n        setHoverIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));\n        return;\n      }\n      const el = itemRefs.current.get(hoveredId);\n      if (el) {\n        const listTop = listRef.current.getBoundingClientRect().top;\n        const elRect = el.getBoundingClientRect();\n        const top = elRect.top - listTop + (elRect.height - 10) / 2;\n        setHoverIndicatorStyle({ top, height: 10, opacity: 1 });\n      } else {\n        setHoverIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));\n      }\n    }, [hoveredId]);\n\n    React.useEffect(() => {\n      updateActivePosition();\n      window.addEventListener(\"resize\", updateActivePosition);\n      return () => window.removeEventListener(\"resize\", updateActivePosition);\n    }, [updateActivePosition]);\n\n    React.useEffect(() => {\n      updateHoverPosition();\n    }, [updateHoverPosition]);\n\n    const handleItemClick = (id: string) => {\n      setInternalActiveId(id);\n      onSelect?.(id);\n    };\n\n    return (\n      <nav\n        ref={ref}\n        aria-label=\"Table of contents\"\n        className={cn(\n          \"w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-lg select-none\",\n          className\n        )}\n        {...props}\n      >\n        {/* Header Icon + \"On this page\" matching Image 3 */}\n        <div className=\"flex items-center gap-2.5 pb-3 mb-2 border-b border-[var(--border)]/60\">\n          <div className=\"h-6 w-6 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)]\">\n            <AlignLeft className=\"h-3.5 w-3.5\" />\n          </div>\n          <span className=\"font-mono text-xs font-semibold text-[var(--text-secondary)] tracking-tight\">\n            {title}\n          </span>\n        </div>\n\n        {/* Vertical Rail + Items Container */}\n        <div\n          ref={listRef}\n          onMouseLeave={() => setHoveredId(null)}\n          className=\"relative pl-4 space-y-1 py-1\"\n        >\n          {/* Continuous Vertical Rail Line */}\n          <div\n            aria-hidden=\"true\"\n            className=\"absolute left-0 top-1 bottom-1 w-px bg-[var(--border)] pointer-events-none\"\n          />\n\n          {/* 1. BIG SLIDER (Active Section Indicator) with rubber band smooth animation */}\n          <div\n            aria-hidden=\"true\"\n            className={cn(\n              \"absolute left-[-1.5px] w-[3px] rounded-full bg-[var(--text-primary)] z-20 pointer-events-none shadow-xs will-change-[transform,top]\",\n              rubberBandEffect\n                ? \"transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]\"\n                : \"transition-all duration-200\"\n            )}\n            style={{\n              top: `${activeIndicatorStyle.top}px`,\n              height: `${activeIndicatorStyle.height}px`,\n            }}\n          />\n\n          {/* 2. SMALL SLIDER (Hover tracker) moving along the cursor with rubber band animation */}\n          <div\n            aria-hidden=\"true\"\n            className={cn(\n              \"absolute left-[-1.5px] w-[3px] rounded-full bg-[var(--accent-green)] z-10 pointer-events-none shadow-xs will-change-[transform,top,opacity]\",\n              rubberBandEffect\n                ? \"transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]\"\n                : \"transition-all duration-150\"\n            )}\n            style={{\n              top: `${hoverIndicatorStyle.top}px`,\n              height: `${hoverIndicatorStyle.height}px`,\n              opacity: hoverIndicatorStyle.opacity,\n            }}\n          />\n\n          {/* TOC Items List */}\n          {items.map((item) => {\n            const isActive = item.id === activeId;\n            const isHovered = item.id === hoveredId;\n            const isNested = item.level === 2;\n\n            return (\n              <button\n                key={item.id}\n                type=\"button\"\n                ref={(el) => {\n                  if (el) itemRefs.current.set(item.id, el);\n                  else itemRefs.current.delete(item.id);\n                }}\n                onClick={() => handleItemClick(item.id)}\n                onMouseEnter={() => setHoveredId(item.id)}\n                className={cn(\n                  \"group flex items-start text-left w-full py-1.5 px-2 rounded-md transition-all duration-200 cursor-pointer text-xs\",\n                  isNested ? \"pl-5 text-[11px]\" : \"font-medium text-xs\",\n                  isActive\n                    ? \"text-[var(--text-primary)] font-semibold\"\n                    : \"text-[var(--text-muted)] hover:text-[var(--text-primary)]\"\n                )}\n              >\n                {/* Text moves slightly to the right on hover with rubber band spring ease! */}\n                <span\n                  className={cn(\n                    \"inline-block transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] leading-relaxed\",\n                    isHovered ? \"translate-x-1.5 text-[var(--text-primary)]\" : \"translate-x-0\",\n                    isActive && !isHovered && \"text-[var(--text-primary)] font-semibold\"\n                  )}\n                >\n                  {item.label}\n                </span>\n              </button>\n            );\n          })}\n        </div>\n\n        {/* Subtle active status tag at bottom */}\n        <div className=\"mt-4 pt-2.5 border-t border-[var(--border)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]\">\n          <span>Active Section:</span>\n          <span className=\"text-[var(--accent-green)] font-semibold truncate max-w-[150px]\">\n            {items.find((i) => i.id === activeId)?.label || activeId}\n          </span>\n        </div>\n      </nav>\n    );\n  }\n);\n\nContentSlider.displayName = \"ContentSlider\";\n"
      }
    ]
  },
  "footer": {
    "name": "footer",
    "category": "Media & Layout",
    "title": "Overflown Blended Footer",
    "description": "Production-ready footer component with huge overflown brand typography and feathered frosted-glass bottom blur blend that can be toggled or removed.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { Footer } from \"@/components/ui/footer\";\n\nexport function FooterDemo() {\n  return (\n    <Footer\n      brandText=\"kilo/ui\"\n      blurBlend={true}\n    />\n  );\n}",
    "props": [
      {
        "name": "brandText",
        "type": "string",
        "defaultValue": "'kilo/ui'",
        "description": "Large brand signature typography overflowing at the bottom."
      },
      {
        "name": "tagline",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Sub-headline description positioned under the brand badge."
      },
      {
        "name": "blurBlend",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Controls whether the soft frosted-glass gradient blur blend is active at the bottom."
      },
      {
        "name": "blurHeight",
        "type": "'sm' | 'md' | 'lg'",
        "defaultValue": "'md'",
        "description": "Height extent of the feathered bottom blur gradient."
      },
      {
        "name": "showNewsletter",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Renders the interactive email subscription form."
      },
      {
        "name": "columns",
        "type": "FooterColumn[]",
        "defaultValue": "DEFAULT_COLUMNS",
        "description": "Hierarchical columns of navigation links."
      }
    ],
    "files": [
      {
        "name": "footer.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport Link from \"next/link\";\nimport { ArrowUpRight, Check, Copy, Sparkles, Terminal } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\nfunction GitHubIcon(props: React.SVGProps<SVGSVGElement>) {\n  return (\n    <svg viewBox=\"0 0 24 24\" fill=\"currentColor\" {...props}>\n      <path\n        fillRule=\"evenodd\"\n        clipRule=\"evenodd\"\n        d=\"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z\"\n      />\n    </svg>\n  );\n}\n\nfunction KiloLogo({ className = \"h-6 w-6\" }: { className?: string }) {\n  return (\n    <svg\n      version=\"1.2\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      viewBox=\"0 0 512 512\"\n      className={`${className} overflow-visible group/logo select-none shrink-0`}\n    >\n      <path\n        d=\"m144.4 264.7l-5.6 12.1v106.2h-79.6v-251.1h79.6v110.6l56.8-110.6h92.9l-72 120.4 72 130.7h-92.9z\"\n        fill=\"var(--text-primary)\"\n        className=\"transition-colors duration-200\"\n      />\n      <path\n        d=\"m385.2 127.1h85.2l-73.8 261.1h-79.6z\"\n        fill=\"var(--accent-green)\"\n        className=\"transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/logo:-translate-y-4 group-hover/logo:translate-x-2\"\n      />\n    </svg>\n  );\n}\n\nexport interface FooterLink {\n  label: string;\n  href: string;\n  external?: boolean;\n  badge?: string;\n}\n\nexport interface FooterColumn {\n  title: string;\n  links: FooterLink[];\n}\n\nexport interface FooterProps extends React.HTMLAttributes<HTMLElement> {\n  brandText?: string;\n  tagline?: string;\n  blurBlend?: boolean;\n  blurHeight?: \"sm\" | \"md\" | \"lg\";\n  showNewsletter?: boolean;\n  columns?: FooterColumn[];\n}\n\nconst DEFAULT_COLUMNS: FooterColumn[] = [\n  {\n    title: \"Primitives\",\n    links: [\n      { label: \"Blurred Carousel\", href: \"/components?category=Media%20%26%20Layout\" },\n      { label: \"Content Slider\", href: \"/components?category=Navigation\" },\n      { label: \"Scroll Marquee\", href: \"/components?category=Media%20%26%20Layout\", badge: \"New\" },\n      { label: \"Directional Marquee\", href: \"/components?category=Media%20%26%20Layout\", badge: \"New\" },\n      { label: \"Kinetic Text\", href: \"/components?category=Media%20%26%20Layout\", badge: \"New\" },\n      { label: \"Expanding Card\", href: \"/components?category=Media%20%26%20Layout\" },\n    ],\n  },\n  {\n    title: \"Architecture\",\n    links: [\n      { label: \"Next.js 16 App Router\", href: \"https://nextjs.org\", external: true },\n      { label: \"Tailwind CSS v4\", href: \"https://tailwindcss.com\", external: true },\n      { label: \"Hardware Accelerated CSS\", href: \"#\" },\n      { label: \"Zero-Bundle Primitives\", href: \"#\" },\n      { label: \"TypeScript Strict Mode\", href: \"#\" },\n    ],\n  },\n  {\n    title: \"Resources\",\n    links: [\n      { label: \"Documentation\", href: \"/docs\" },\n      { label: \"Component Registry\", href: \"/components\" },\n      { label: \"GitHub Repository\", href: \"https://github.com/sourodip-1/kiloUI\", external: true },\n      { label: \"CLI Generator\", href: \"/docs#cli\" },\n      { label: \"Changelog\", href: \"/docs#changelog\" },\n    ],\n  },\n  {\n    title: \"Legal & Trust\",\n    links: [\n      { label: \"MIT License\", href: \"https://github.com/sourodip-1/kiloUI/blob/main/LICENSE\", external: true },\n      { label: \"Privacy Policy\", href: \"#\" },\n      { label: \"Brand Assets\", href: \"#\" },\n      { label: \"Security Report\", href: \"#\" },\n    ],\n  },\n];\n\nexport const Footer = React.forwardRef<HTMLElement, FooterProps>(\n  (\n    {\n      className,\n      brandText = \"kilo/ui\",\n      tagline = \"Modern, copy-pasteable UI primitives engineered for high-performance React & Next.js applications.\",\n      blurBlend = true,\n      blurHeight = \"md\",\n      showNewsletter = true,\n      columns = DEFAULT_COLUMNS,\n      ...props\n    },\n    ref\n  ) => {\n    const [copied, setCopied] = React.useState(false);\n    const [email, setEmail] = React.useState(\"\");\n    const [subscribed, setSubscribed] = React.useState(false);\n\n    const handleCopyCli = () => {\n      navigator.clipboard?.writeText(\"npx kilo-ui add footer\");\n      setCopied(true);\n      setTimeout(() => setCopied(false), 2000);\n    };\n\n    const handleSubscribe = (e: React.FormEvent) => {\n      e.preventDefault();\n      if (!email || !email.includes(\"@\")) return;\n      setSubscribed(true);\n      setTimeout(() => {\n        setEmail(\"\");\n        setSubscribed(false);\n      }, 3500);\n    };\n\n    const blurHeightClass = {\n      sm: \"h-5 sm:h-7\",\n      md: \"h-8 sm:h-12\",\n      lg: \"h-12 sm:h-16\",\n    }[blurHeight];\n\n    return (\n      <footer\n        ref={ref}\n        className={cn(\n          \"relative w-full overflow-hidden border-t border-[var(--border)] bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200\",\n          className\n        )}\n        {...props}\n      >\n        {/* Subtle Ambient Radial Glow */}\n        <div\n          className=\"pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[42rem] max-w-full rounded-full bg-[var(--accent-green)]/5 blur-3xl opacity-60\"\n          aria-hidden=\"true\"\n        />\n\n        <div className=\"relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12\">\n          {/* Top Section: Branding, Tagline & CLI copy */}\n          <div className=\"grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[var(--border)]/70\">\n            {/* Brand column */}\n            <div className=\"lg:col-span-5 space-y-4\">\n              <div className=\"flex items-center gap-3\">\n                <Link\n                  href=\"/\"\n                  className=\"font-mono text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2.5 group/logo\"\n                >\n                  <KiloLogo className=\"h-6 w-6\" />\n                  <span>{brandText}</span>\n                </Link>\n              </div>\n\n              <p className=\"text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md\">\n                {tagline}\n              </p>\n\n              {/* CLI command snippet pill */}\n              <div className=\"pt-2\">\n                <button\n                  type=\"button\"\n                  onClick={handleCopyCli}\n                  className=\"group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-green)]/50 transition-all font-mono text-xs text-[var(--text-secondary)] cursor-pointer\"\n                  title=\"Copy installation command\"\n                >\n                  <Terminal className=\"h-3.5 w-3.5 text-[var(--accent-green)]\" />\n                  <span>npx kilo-ui add footer</span>\n                  <span className=\"ml-auto pl-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]\">\n                    {copied ? (\n                      <Check className=\"h-3.5 w-3.5 text-emerald-400\" />\n                    ) : (\n                      <Copy className=\"h-3.5 w-3.5\" />\n                    )}\n                  </span>\n                </button>\n              </div>\n            </div>\n\n            {/* Newsletter & Updates Column */}\n            {showNewsletter && (\n              <div className=\"lg:col-span-7 flex flex-col justify-between space-y-4\">\n                <div className=\"space-y-1.5\">\n                  <div className=\"flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-green)]\">\n                    <Sparkles className=\"h-3.5 w-3.5\" />\n                    <span>Sync with Registry Releases</span>\n                  </div>\n                  <p className=\"text-xs text-[var(--text-secondary)]\">\n                    Receive immediate updates when new primitives, motions, and interactive templates drop.\n                  </p>\n                </div>\n\n                <form onSubmit={handleSubscribe} className=\"flex flex-col sm:flex-row gap-2 max-w-md\">\n                  <input\n                    type=\"email\"\n                    value={email}\n                    onChange={(e) => setEmail(e.target.value)}\n                    placeholder=\"developer@company.com\"\n                    required\n                    className=\"flex-1 h-10 px-3.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] transition-colors font-sans\"\n                  />\n                  <button\n                    type=\"submit\"\n                    className=\"h-10 px-4 rounded-lg bg-[var(--text-primary)] text-[var(--bg-main)] hover:bg-[var(--text-primary)]/90 text-xs font-mono font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap\"\n                  >\n                    {subscribed ? \"Subscribed!\" : \"Subscribe\"}\n                  </button>\n                </form>\n              </div>\n            )}\n          </div>\n\n          {/* Navigation Columns Grid */}\n          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-8 py-12\">\n            {columns.map((col, idx) => (\n              <div key={idx} className=\"space-y-3\">\n                <h3 className=\"font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]\">\n                  {col.title}\n                </h3>\n                <ul className=\"space-y-2\">\n                  {col.links.map((link, lIdx) => (\n                    <li key={lIdx}>\n                      {link.external ? (\n                        <a\n                          href={link.href}\n                          target=\"_blank\"\n                          rel=\"noopener noreferrer\"\n                          className=\"inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group\"\n                        >\n                          <span>{link.label}</span>\n                          <ArrowUpRight className=\"h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform\" />\n                        </a>\n                      ) : (\n                        <Link\n                          href={link.href}\n                          className=\"inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors\"\n                        >\n                          <span>{link.label}</span>\n                          {link.badge && (\n                            <span className=\"px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-[var(--accent-green)]/15 text-[var(--accent-green)] border border-[var(--accent-green)]/30\">\n                              {link.badge}\n                            </span>\n                          )}\n                        </Link>\n                      )}\n                    </li>\n                  ))}\n                </ul>\n              </div>\n            ))}\n          </div>\n\n          {/* Bottom Metabar */}\n          <div className=\"pt-6 border-t border-[var(--border)]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]\">\n            <div>\n              © 2026 kilo/ui • Open-source under MIT License.\n            </div>\n            <div className=\"flex items-center gap-5\">\n              <a\n                href=\"https://github.com/sourodip-1/kiloUI\"\n                target=\"_blank\"\n                rel=\"noreferrer\"\n                className=\"flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors\"\n              >\n                <GitHubIcon className=\"h-3.5 w-3.5\" />\n                <span>GitHub</span>\n              </a>\n              <span>•</span>\n              <span>100% Free Primitives</span>\n              <span>•</span>\n              <span>v1.0.4</span>\n            </div>\n          </div>\n        </div>\n\n        {/* OVERFLOWING BRAND SIGNATURE TYPOGRAPHY - CLEAR & PROMINENT */}\n        <div\n          className=\"relative w-full overflow-hidden flex justify-center items-end select-none pt-4 sm:pt-6 md:pt-8 -mb-3 sm:-mb-5 md:-mb-7 pointer-events-none\"\n          aria-hidden=\"true\"\n        >\n          <span\n            className=\"font-mono font-black text-[20vw] sm:text-[19vw] lg:text-[210px] tracking-tighter leading-none whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)]/85 via-[var(--text-primary)]/75 to-[var(--text-primary)]/50 transition-all duration-500 select-none\"\n            style={{\n              WebkitTextStroke: \"1px rgba(255, 255, 255, 0.12)\",\n              textShadow: \"0 0 50px rgba(139, 196, 154, 0.12)\",\n            }}\n          >\n            {brandText}\n          </span>\n        </div>\n\n        {/* SOFT BOTTOM BLUR BLEND (ONLY SUBTLE BOTTOM RIM FEATHERING) */}\n        {blurBlend && (\n          <div\n            className={cn(\n              \"pointer-events-none absolute bottom-0 left-0 right-0 w-full z-20 transition-all duration-300\",\n              blurHeightClass\n            )}\n            style={{\n              backdropFilter: \"blur(5px)\",\n              WebkitBackdropFilter: \"blur(5px)\",\n              maskImage: \"linear-gradient(to top, black 0%, transparent 100%)\",\n              WebkitMaskImage: \"linear-gradient(to top, black 0%, transparent 100%)\",\n            }}\n            aria-hidden=\"true\"\n          >\n            {/* Subtle feathered bottom tint */}\n            <div className=\"w-full h-full bg-gradient-to-t from-[var(--bg-main)]/50 to-transparent\" />\n          </div>\n        )}\n      </footer>\n    );\n  }\n);\n\nFooter.displayName = \"Footer\";\n"
      }
    ]
  },
  "scroll-marquee": {
    "name": "scroll-marquee",
    "category": "Media & Layout",
    "title": "Scroll Marquee",
    "description": "High-performance scroll-driven marquee component that translates text horizontally based on scroll speed, with left, right, dual, and velocity skew variants.",
    "variants": [
      "scroll-left",
      "scroll-right",
      "dual-scroll",
      "velocity-skew"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { ScrollMarquee } from \"@/components/ui/scroll-marquee\";\n\nexport function ScrollMarqueeDemo() {\n  return (\n    <ScrollMarquee\n      text=\"HIGH PERFORMANCE • ZERO DEPENDENCY • MINIMAL\"\n      variant=\"scroll-left\"\n    />\n  );\n}",
    "props": [
      {
        "name": "text",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Primary continuous headline text."
      },
      {
        "name": "textSecondary",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Secondary text used for dual-scroll variant."
      },
      {
        "name": "variant",
        "type": "'scroll-left' | 'scroll-right' | 'dual-scroll' | 'velocity-skew'",
        "defaultValue": "'scroll-left'",
        "description": "Directional and kinetic deformation style on scroll."
      },
      {
        "name": "textColor",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Custom CSS text color or hex code for the marquee typography."
      },
      {
        "name": "blurColor",
        "type": "string",
        "defaultValue": "'mask'",
        "description": "Color of the edge gradient fade, or 'mask' for background-matching transparent fade."
      },
      {
        "name": "speed",
        "type": "number",
        "defaultValue": "1.2",
        "description": "Scroll multiplier factor governing translation speed."
      },
      {
        "name": "baseVelocity",
        "type": "number",
        "defaultValue": "0.4",
        "description": "Idle continuous cruise speed when not scrolling."
      },
      {
        "name": "skewIntensity",
        "type": "number",
        "defaultValue": "6",
        "description": "Maximum angular skew deformation during fast scroll."
      },
      {
        "name": "outlineText",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Renders outlined stroke typography instead of solid fill."
      },
      {
        "name": "interactiveWheel",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables direct scroll wheel interaction over the marquee container."
      }
    ],
    "files": [
      {
        "name": "scroll-marquee.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface ScrollMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {\n  text?: string;\n  textSecondary?: string;\n  variant?: \"scroll-left\" | \"scroll-right\" | \"dual-scroll\" | \"velocity-skew\";\n  speed?: number;\n  baseVelocity?: number;\n  skewIntensity?: number;\n  repeat?: number;\n  separator?: string;\n  outlineText?: boolean;\n  textColor?: string;\n  blurColor?: string; // \"mask\" (default CSS alpha gradient mask) or any CSS color\n  interactiveWheel?: boolean;\n}\n\nexport const ScrollMarquee = React.forwardRef<HTMLDivElement, ScrollMarqueeProps>(\n  (\n    {\n      className,\n      text = \"ENGINEERED FOR HIGH VELOCITY • MINIMAL BY DESIGN • HARDWARE ACCELERATED • ZERO RUNTIME OVERHEAD •\",\n      textSecondary = \"CRAFTED WITH PRECISION • TAILWIND CSS • NEXT.JS 16 • SYSTEM LEVEL DESIGN •\",\n      variant = \"scroll-left\",\n      speed = 1.2,\n      baseVelocity = 0.5,\n      skewIntensity = 6,\n      repeat = 4,\n      separator = \"✦\",\n      outlineText = false,\n      textColor,\n      blurColor = \"mask\",\n      interactiveWheel = true,\n      ...props\n    },\n    ref\n  ) => {\n    const [offset1, setOffset1] = React.useState(0);\n    const [offset2, setOffset2] = React.useState(0);\n    const [currentSkew, setCurrentSkew] = React.useState(0);\n\n    const prevScrollY = React.useRef(0);\n    const targetOffset1 = React.useRef(0);\n    const targetOffset2 = React.useRef(0);\n    const targetSkew = React.useRef(0);\n    const animFrameId = React.useRef<number | null>(null);\n\n    // Track block width measurement for seamless infinite wrapping\n    const track1Ref = React.useRef<HTMLDivElement>(null);\n    const track2Ref = React.useRef<HTMLDivElement>(null);\n    const [track1Width, setTrack1Width] = React.useState(0);\n    const [track2Width, setTrack2Width] = React.useState(0);\n\n    const updateWidths = React.useCallback(() => {\n      if (track1Ref.current) {\n        setTrack1Width(track1Ref.current.scrollWidth / 2 || 1600);\n      }\n      if (track2Ref.current) {\n        setTrack2Width(track2Ref.current.scrollWidth / 2 || 1600);\n      }\n    }, []);\n\n    React.useEffect(() => {\n      updateWidths();\n      window.addEventListener(\"resize\", updateWidths);\n      return () => window.removeEventListener(\"resize\", updateWidths);\n    }, [updateWidths, text, textSecondary, repeat]);\n\n    // Handle scroll on window\n    React.useEffect(() => {\n      let isMounted = true;\n\n      const handleScroll = () => {\n        if (typeof window === \"undefined\") return;\n        const currentY = window.scrollY;\n        const delta = currentY - prevScrollY.current;\n        prevScrollY.current = currentY;\n\n        const isLeft = variant === \"scroll-left\" || variant === \"velocity-skew\" || variant === \"dual-scroll\";\n        const factor1 = isLeft ? -1 : 1;\n        const factor2 = 1;\n\n        targetOffset1.current += delta * speed * factor1;\n        targetOffset2.current += delta * speed * factor2;\n\n        if (variant === \"velocity-skew\") {\n          const clampedDelta = Math.max(-45, Math.min(45, delta));\n          targetSkew.current = -clampedDelta * 0.35 * (skewIntensity / 6);\n        }\n      };\n\n      window.addEventListener(\"scroll\", handleScroll, { passive: true });\n\n      // Physics loop with smooth lerp\n      const updatePhysics = () => {\n        if (!isMounted) return;\n\n        const isLeft = variant === \"scroll-left\" || variant === \"velocity-skew\" || variant === \"dual-scroll\";\n        targetOffset1.current += (isLeft ? -1 : 1) * baseVelocity;\n        targetOffset2.current += baseVelocity;\n\n        // Smooth spring dampening\n        setOffset1((prev) => prev + (targetOffset1.current - prev) * 0.12);\n        setOffset2((prev) => prev + (targetOffset2.current - prev) * 0.12);\n\n        if (variant === \"velocity-skew\") {\n          targetSkew.current *= 0.86;\n          setCurrentSkew((prev) => prev + (targetSkew.current - prev) * 0.18);\n        }\n\n        animFrameId.current = requestAnimationFrame(updatePhysics);\n      };\n\n      animFrameId.current = requestAnimationFrame(updatePhysics);\n\n      return () => {\n        isMounted = false;\n        window.removeEventListener(\"scroll\", handleScroll);\n        if (animFrameId.current) cancelAnimationFrame(animFrameId.current);\n      };\n    }, [variant, speed, baseVelocity, skewIntensity]);\n\n    // Handle interactive wheel on the component or preview panel\n    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {\n      if (!interactiveWheel) return;\n      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;\n      if (Math.abs(delta) < 0.5) return;\n\n      const isLeft = variant === \"scroll-left\" || variant === \"velocity-skew\" || variant === \"dual-scroll\";\n      const factor1 = isLeft ? -1 : 1;\n      const factor2 = 1;\n\n      targetOffset1.current += delta * speed * 0.8 * factor1;\n      targetOffset2.current += delta * speed * 0.8 * factor2;\n\n      if (variant === \"velocity-skew\") {\n        const clampedDelta = Math.max(-50, Math.min(50, delta));\n        targetSkew.current = -clampedDelta * 0.4 * (skewIntensity / 6);\n      }\n    };\n\n    // Seamless infinite modulo wrapping\n    const w1 = track1Width || 2000;\n    const w2 = track2Width || 2000;\n    const wrap1 = ((offset1 % w1) + w1) % w1 - w1;\n    const wrap2 = ((offset2 % w2) + w2) % w2 - w2;\n\n    const singleItems = React.useMemo(() => {\n      return Array.from({ length: repeat }).map(() => text);\n    }, [text, repeat]);\n\n    const singleItemsSec = React.useMemo(() => {\n      return Array.from({ length: repeat }).map(() => textSecondary);\n    }, [textSecondary, repeat]);\n\n    // Double sets of items for seamless infinite wrap\n    const duplicatedItems = React.useMemo(() => [...singleItems, ...singleItems], [singleItems]);\n    const duplicatedItemsSec = React.useMemo(() => [...singleItemsSec, ...singleItemsSec], [singleItemsSec]);\n\n    const isMaskBlur = !blurColor || blurColor === \"mask\";\n\n    return (\n      <div\n        ref={ref}\n        onWheel={handleWheel}\n        className={cn(\n          \"relative w-full overflow-hidden select-none py-6 sm:py-10 flex flex-col justify-center gap-4 sm:gap-6 cursor-grab active:cursor-grabbing\",\n          className\n        )}\n        style={\n          isMaskBlur\n            ? {\n                WebkitMaskImage:\n                  \"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)\",\n                maskImage:\n                  \"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)\",\n              }\n            : undefined\n        }\n        {...props}\n      >\n        {/* Optional custom-color edge fade masks when blurColor is not \"mask\" */}\n        {!isMaskBlur && (\n          <>\n            <div\n              className=\"pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10\"\n              style={{\n                background: `linear-gradient(to right, ${blurColor}, transparent)`,\n              }}\n              aria-hidden=\"true\"\n            />\n            <div\n              className=\"pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10\"\n              style={{\n                background: `linear-gradient(to left, ${blurColor}, transparent)`,\n              }}\n              aria-hidden=\"true\"\n            />\n          </>\n        )}\n\n        {/* Track 1 */}\n        <div\n          ref={track1Ref}\n          className=\"flex whitespace-nowrap will-change-transform\"\n          style={{\n            transform: `translate3d(${wrap1}px, 0, 0) ${\n              variant === \"velocity-skew\" ? `skewX(${currentSkew}deg)` : \"\"\n            }`,\n          }}\n        >\n          {duplicatedItems.map((item, index) => (\n            <div key={index} className=\"flex items-center shrink-0\">\n              <span\n                style={textColor ? { color: textColor } : undefined}\n                className={cn(\n                  \"font-mono font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase px-4 transition-colors\",\n                  outlineText\n                    ? \"text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] hover:[-webkit-text-stroke:1.5px_var(--accent-green)]\"\n                    : !textColor && \"text-[var(--text-primary)] hover:text-[var(--accent-green)]\"\n                )}\n              >\n                {item}\n              </span>\n              <span className=\"text-xl sm:text-3xl text-[var(--accent-green)] mx-3 opacity-75\">\n                {separator}\n              </span>\n            </div>\n          ))}\n        </div>\n\n        {/* Track 2 for Dual Scroll Variant */}\n        {variant === \"dual-scroll\" && (\n          <div\n            ref={track2Ref}\n            className=\"flex whitespace-nowrap will-change-transform\"\n            style={{\n              transform: `translate3d(${wrap2}px, 0, 0)`,\n            }}\n          >\n            {duplicatedItemsSec.map((item, index) => (\n              <div key={index} className=\"flex items-center shrink-0\">\n                <span\n                  style={textColor ? { color: textColor } : undefined}\n                  className={cn(\n                    \"font-mono font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase px-4 transition-colors\",\n                    outlineText\n                      ? !textColor && \"text-[var(--text-primary)]\"\n                      : \"text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] hover:[-webkit-text-stroke:1.5px_var(--accent-green)]\"\n                  )}\n                >\n                  {item}\n                </span>\n                <span className=\"text-xl sm:text-3xl text-[var(--accent-green)] mx-3 opacity-75\">\n                  {separator}\n                </span>\n              </div>\n            ))}\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nScrollMarquee.displayName = \"ScrollMarquee\";\n"
      }
    ]
  },
  "directional-marquee": {
    "name": "directional-marquee",
    "category": "Media & Layout",
    "title": "Directional Marquee",
    "description": "Continuous dual-track revolving marquee that dynamically reverses slider directions when scrolling up versus scrolling down, with inertial velocity physics.",
    "dependencies": [
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { DirectionalMarquee } from \"@/components/ui/directional-marquee\";\n\nexport function DirectionalMarqueeDemo() {\n  return (\n    <DirectionalMarquee\n      manualDirection=\"auto\"\n      showHud={true}\n    />\n  );\n}",
    "props": [
      {
        "name": "track1Text",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Text content for top continuous track."
      },
      {
        "name": "track2Text",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Text content for bottom continuous track."
      },
      {
        "name": "manualDirection",
        "type": "'up' | 'down' | 'auto'",
        "defaultValue": "'auto'",
        "description": "Direction override: down (T1 ➔ / T2 ⬅) or up (T1 ⬅ / T2 ➔), or auto scroll detection."
      },
      {
        "name": "textColor",
        "type": "string",
        "defaultValue": "undefined",
        "description": "Custom CSS text color or hex code for the marquee typography."
      },
      {
        "name": "blurColor",
        "type": "string",
        "defaultValue": "'mask'",
        "description": "Color of the edge gradient fade, or 'mask' for background-matching transparent fade."
      },
      {
        "name": "baseSpeed",
        "type": "number",
        "defaultValue": "1.2",
        "description": "Base continuous revolving velocity."
      },
      {
        "name": "scrollMultiplier",
        "type": "number",
        "defaultValue": "2.4",
        "description": "Velocity acceleration factor during page scroll."
      },
      {
        "name": "showHud",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Displays directional compass HUD with live scroll indicator."
      },
      {
        "name": "interactiveWheel",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables direct scroll wheel interaction over the marquee container."
      }
    ],
    "files": [
      {
        "name": "directional-marquee.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { ArrowDown, ArrowUp, Compass } from \"lucide-react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface DirectionalMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {\n  track1Text?: string;\n  track2Text?: string;\n  baseSpeed?: number;\n  scrollMultiplier?: number;\n  manualDirection?: \"up\" | \"down\" | \"auto\";\n  showHud?: boolean;\n  repeat?: number;\n  separator?: string;\n  textColor?: string;\n  blurColor?: string; // \"mask\" (default CSS alpha gradient mask) or any CSS color\n  interactiveWheel?: boolean;\n}\n\nexport const DirectionalMarquee = React.forwardRef<HTMLDivElement, DirectionalMarqueeProps>(\n  (\n    {\n      className,\n      track1Text = \"HYPER SPEED • NEURAL ENGINE • SUB-MILLISECOND LATENCY • PARALLEL COMPUTE •\",\n      track2Text = \"CONTINUOUS DISCOVERY • QUANTUM GRAPHICS • SPATIAL INTERFACES • VECTOR PRECISION •\",\n      baseSpeed = 1.2,\n      scrollMultiplier = 2.4,\n      manualDirection = \"auto\",\n      showHud = true,\n      repeat = 4,\n      separator = \"✦\",\n      textColor,\n      blurColor = \"mask\",\n      interactiveWheel = true,\n      ...props\n    },\n    ref\n  ) => {\n    // Current scroll direction state: \"down\" or \"up\"\n    const [scrollDir, setScrollDir] = React.useState<\"down\" | \"up\">(\"down\");\n    const [isScrolling, setIsScrolling] = React.useState(false);\n\n    // Track offsets\n    const [offset1, setOffset1] = React.useState(0);\n    const [offset2, setOffset2] = React.useState(0);\n\n    const prevScrollY = React.useRef(0);\n    const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);\n    const velocityBoost = React.useRef(0);\n    const effectiveDir = React.useRef<\"down\" | \"up\">(\"down\");\n    const animId = React.useRef<number | null>(null);\n\n    // Track block width measurement for seamless infinite wrapping\n    const track1Ref = React.useRef<HTMLDivElement>(null);\n    const track2Ref = React.useRef<HTMLDivElement>(null);\n    const [track1Width, setTrack1Width] = React.useState(0);\n    const [track2Width, setTrack2Width] = React.useState(0);\n\n    const updateWidths = React.useCallback(() => {\n      if (track1Ref.current) {\n        setTrack1Width(track1Ref.current.scrollWidth / 2 || 1600);\n      }\n      if (track2Ref.current) {\n        setTrack2Width(track2Ref.current.scrollWidth / 2 || 1600);\n      }\n    }, []);\n\n    React.useEffect(() => {\n      updateWidths();\n      window.addEventListener(\"resize\", updateWidths);\n      return () => window.removeEventListener(\"resize\", updateWidths);\n    }, [updateWidths, track1Text, track2Text, repeat]);\n\n    // Sync manualDirection with effectiveDir\n    React.useEffect(() => {\n      if (manualDirection !== \"auto\") {\n        effectiveDir.current = manualDirection;\n        setScrollDir(manualDirection);\n      }\n    }, [manualDirection]);\n\n    // Track window scroll velocity and direction\n    React.useEffect(() => {\n      if (manualDirection !== \"auto\") return;\n\n      const handleScroll = () => {\n        if (typeof window === \"undefined\") return;\n        const currentY = window.scrollY;\n        const delta = currentY - prevScrollY.current;\n        prevScrollY.current = currentY;\n\n        if (Math.abs(delta) > 1.2) {\n          const dir = delta > 0 ? \"down\" : \"up\";\n          effectiveDir.current = dir;\n          setScrollDir(dir);\n          setIsScrolling(true);\n\n          velocityBoost.current = Math.min(8, Math.abs(delta) * 0.25);\n\n          if (scrollTimeout.current) clearTimeout(scrollTimeout.current);\n          scrollTimeout.current = setTimeout(() => {\n            setIsScrolling(false);\n          }, 180);\n        }\n      };\n\n      window.addEventListener(\"scroll\", handleScroll, { passive: true });\n      return () => {\n        window.removeEventListener(\"scroll\", handleScroll);\n        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);\n      };\n    }, [manualDirection]);\n\n    // Handle interactive mouse wheel\n    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {\n      if (!interactiveWheel) return;\n      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;\n      if (Math.abs(delta) < 0.5) return;\n\n      if (manualDirection === \"auto\") {\n        const dir = delta > 0 ? \"down\" : \"up\";\n        effectiveDir.current = dir;\n        setScrollDir(dir);\n        setIsScrolling(true);\n      }\n\n      velocityBoost.current = Math.min(10, Math.abs(delta) * 0.35);\n\n      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);\n      scrollTimeout.current = setTimeout(() => {\n        setIsScrolling(false);\n      }, 200);\n    };\n\n    // Constant rotation animation loop with dynamic directional physics\n    React.useEffect(() => {\n      let isMounted = true;\n\n      const loop = () => {\n        if (!isMounted) return;\n\n        // Smooth velocity boost decay\n        velocityBoost.current *= 0.94;\n        const currentSpeed = baseSpeed + velocityBoost.current * scrollMultiplier;\n\n        // When moving DOWN: Track 1 slides RIGHT (+), Track 2 slides LEFT (-)\n        // When moving UP: Track 1 slides LEFT (-), Track 2 slides RIGHT (+)\n        const isDown = effectiveDir.current === \"down\";\n        const dir1 = isDown ? 1 : -1;\n        const dir2 = isDown ? -1 : 1;\n\n        setOffset1((prev) => prev + dir1 * currentSpeed);\n        setOffset2((prev) => prev + dir2 * currentSpeed);\n\n        animId.current = requestAnimationFrame(loop);\n      };\n\n      animId.current = requestAnimationFrame(loop);\n\n      return () => {\n        isMounted = false;\n        if (animId.current) cancelAnimationFrame(animId.current);\n      };\n    }, [baseSpeed, scrollMultiplier]);\n\n    // Mathematical modulo wrap: never runs out, never cuts off\n    const w1 = track1Width || 2000;\n    const w2 = track2Width || 2000;\n    const wrap1 = ((offset1 % w1) + w1) % w1 - w1;\n    const wrap2 = ((offset2 % w2) + w2) % w2 - w2;\n\n    const singleItems1 = React.useMemo(() => {\n      return Array.from({ length: repeat }).map(() => track1Text);\n    }, [track1Text, repeat]);\n\n    const singleItems2 = React.useMemo(() => {\n      return Array.from({ length: repeat }).map(() => track2Text);\n    }, [track2Text, repeat]);\n\n    // Double sets of items for seamless infinite wrap\n    const duplicatedItems1 = React.useMemo(() => [...singleItems1, ...singleItems1], [singleItems1]);\n    const duplicatedItems2 = React.useMemo(() => [...singleItems2, ...singleItems2], [singleItems2]);\n\n    const isMaskBlur = !blurColor || blurColor === \"mask\";\n\n    return (\n      <div\n        ref={ref}\n        onWheel={handleWheel}\n        className={cn(\n          \"relative w-full overflow-hidden select-none py-8 sm:py-12 flex flex-col justify-center gap-4 sm:gap-6 cursor-grab active:cursor-grabbing\",\n          className\n        )}\n        style={\n          isMaskBlur\n            ? {\n                WebkitMaskImage:\n                  \"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)\",\n                maskImage:\n                  \"linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)\",\n              }\n            : undefined\n        }\n        {...props}\n      >\n        {/* Optional custom-color edge fade masks when blurColor is not \"mask\" */}\n        {!isMaskBlur && (\n          <>\n            <div\n              className=\"pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20\"\n              style={{\n                background: `linear-gradient(to right, ${blurColor}, transparent)`,\n              }}\n              aria-hidden=\"true\"\n            />\n            <div\n              className=\"pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20\"\n              style={{\n                background: `linear-gradient(to left, ${blurColor}, transparent)`,\n              }}\n              aria-hidden=\"true\"\n            />\n          </>\n        )}\n\n        {/* Dynamic Directional HUD */}\n        {showHud && (\n          <div className=\"flex items-center justify-between px-4 sm:px-8 z-30 pointer-events-none\">\n            <div className=\"inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-xs shadow-sm\">\n              <Compass className=\"h-3.5 w-3.5 text-[var(--accent-green)] animate-spin [animation-duration:8s]\" />\n              <span className=\"text-[var(--text-secondary)]\">Scroll Direction:</span>\n              <span\n                className={cn(\n                  \"font-bold flex items-center gap-1 transition-colors\",\n                  scrollDir === \"down\" ? \"text-cyan-400\" : \"text-amber-400\"\n                )}\n              >\n                {scrollDir === \"down\" ? (\n                  <>\n                    <ArrowDown className=\"h-3 w-3\" />\n                    <span>DOWN (T1 ➔ / T2 ⬅)</span>\n                  </>\n                ) : (\n                  <>\n                    <ArrowUp className=\"h-3 w-3\" />\n                    <span>UP (T1 ⬅ / T2 ➔)</span>\n                  </>\n                )}\n              </span>\n              {isScrolling && (\n                <span className=\"h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-ping ml-1\" />\n              )}\n            </div>\n\n            <div className=\"hidden sm:inline-flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)]\">\n              <span>Scroll wheel or page to flip tracks</span>\n            </div>\n          </div>\n        )}\n\n        {/* Track 1: Moves RIGHT on Down, LEFT on Up */}\n        <div\n          ref={track1Ref}\n          className=\"flex whitespace-nowrap will-change-transform\"\n          style={{\n            transform: `translate3d(${wrap1}px, 0, 0)`,\n          }}\n        >\n          {duplicatedItems1.map((item, index) => (\n            <div key={index} className=\"flex items-center shrink-0\">\n              <span\n                style={textColor ? { color: textColor } : undefined}\n                className={cn(\n                  \"font-mono font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase px-3 transition-colors\",\n                  !textColor && \"text-[var(--text-primary)] hover:text-[var(--accent-green)]\"\n                )}\n              >\n                {item}\n              </span>\n              <span className=\"text-xl sm:text-2xl text-[var(--accent-green)] mx-2 opacity-75\">\n                {separator}\n              </span>\n            </div>\n          ))}\n        </div>\n\n        {/* Track 2: Moves LEFT on Down, RIGHT on Up */}\n        <div\n          ref={track2Ref}\n          className=\"flex whitespace-nowrap will-change-transform\"\n          style={{\n            transform: `translate3d(${wrap2}px, 0, 0)`,\n          }}\n        >\n          {duplicatedItems2.map((item, index) => (\n            <div key={index} className=\"flex items-center shrink-0\">\n              <span\n                style={textColor ? { color: textColor } : undefined}\n                className={cn(\n                  \"font-mono font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase px-3 transition-colors\",\n                  !textColor &&\n                    \"text-transparent [-webkit-text-stroke:1px_var(--text-primary)] hover:[-webkit-text-stroke:1px_var(--accent-green)]\"\n                )}\n              >\n                {item}\n              </span>\n              <span className=\"text-xl sm:text-2xl text-[var(--accent-green)] mx-2 opacity-75\">\n                {separator}\n              </span>\n            </div>\n          ))}\n        </div>\n      </div>\n    );\n  }\n);\n\nDirectionalMarquee.displayName = \"DirectionalMarquee\";\n"
      }
    ]
  },
  "kinetic-text": {
    "name": "kinetic-text",
    "category": "Media & Layout",
    "title": "Kinetic Motion Text",
    "description": "Interactive text and motion UI component featuring character spring mechanics, rubber band bounce, wave ripple, magnetic tilt, and cyberpunk scramble decoding.",
    "variants": [
      "rubber-band",
      "wave-ripple",
      "scramble-decode",
      "magnetic-tilt"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { KineticText } from \"@/components/ui/kinetic-text\";\n\nexport function KineticTextDemo() {\n  return (\n    <KineticText\n      text=\"KILO / MOTION UI\"\n      variant=\"rubber-band\"\n    />\n  );\n}",
    "props": [
      {
        "name": "text",
        "type": "string",
        "defaultValue": "'KILO / MOTION UI'",
        "description": "The string content rendered with kinetic physics."
      },
      {
        "name": "variant",
        "type": "'rubber-band' | 'wave-ripple' | 'scramble-decode' | 'magnetic-tilt'",
        "defaultValue": "'rubber-band'",
        "description": "Character motion physics style."
      },
      {
        "name": "as",
        "type": "'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'",
        "defaultValue": "'div'",
        "description": "Semantic HTML tag used for text wrapper."
      }
    ],
    "files": [
      {
        "name": "kinetic-text.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface KineticTextProps extends React.HTMLAttributes<HTMLDivElement> {\n  text?: string;\n  variant?: \"rubber-band\" | \"wave-ripple\" | \"scramble-decode\" | \"magnetic-tilt\";\n  className?: string;\n  charClassName?: string;\n  as?: \"h1\" | \"h2\" | \"h3\" | \"p\" | \"span\" | \"div\";\n}\n\nconst GLYPHS = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?\";\n\nexport const KineticText = React.forwardRef<HTMLDivElement, KineticTextProps>(\n  (\n    {\n      className,\n      charClassName,\n      text = \"KILO / MOTION UI\",\n      variant = \"rubber-band\",\n      as: Component = \"div\",\n      ...props\n    },\n    ref\n  ) => {\n    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);\n    const [scrambledText, setScrambledText] = React.useState<string>(text);\n    const [isScrambling, setIsScrambling] = React.useState<boolean>(false);\n\n    // Scramble decode effect\n    const triggerScramble = React.useCallback(() => {\n      if (isScrambling) return;\n      setIsScrambling(true);\n\n      let iteration = 0;\n      const original = text;\n      const interval = setInterval(() => {\n        setScrambledText(\n          original\n            .split(\"\")\n            .map((char, index) => {\n              if (char === \" \") return \" \";\n              if (index < iteration) {\n                return original[index];\n              }\n              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];\n            })\n            .join(\"\")\n        );\n\n        if (iteration >= original.length) {\n          clearInterval(interval);\n          setIsScrambling(false);\n          setScrambledText(original);\n        }\n\n        iteration += 1 / 2;\n      }, 35);\n    }, [text, isScrambling]);\n\n    React.useEffect(() => {\n      setScrambledText(text);\n      if (variant === \"scramble-decode\") {\n        triggerScramble();\n      }\n    }, [text, variant, triggerScramble]);\n\n    const characters = (variant === \"scramble-decode\" ? scrambledText : text).split(\"\");\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\"inline-flex flex-wrap items-center justify-center select-none py-2\", className)}\n        {...props}\n      >\n        <Component\n          className=\"flex flex-wrap items-center justify-center font-mono font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase\"\n          onMouseEnter={variant === \"scramble-decode\" ? triggerScramble : undefined}\n        >\n          {characters.map((char, idx) => {\n            const isHovered = hoveredIndex === idx;\n\n            // Compute variant animations\n            let transformStyle = \"\";\n            let animClass = \"\";\n\n            if (variant === \"rubber-band\") {\n              animClass = isHovered\n                ? \"scale-y-125 scale-x-90 -translate-y-2 text-[var(--accent-green)]\"\n                : \"scale-100 translate-y-0 text-[var(--text-primary)]\";\n            } else if (variant === \"wave-ripple\") {\n              const delay = idx * 60;\n              animClass = \"animate-bounce [animation-duration:1.4s]\";\n              transformStyle = `animation-delay: ${delay}ms`;\n            } else if (variant === \"magnetic-tilt\") {\n              animClass = isHovered\n                ? \"rotate-12 scale-110 text-[var(--accent-green)]\"\n                : \"rotate-0 scale-100 text-[var(--text-primary)]\";\n            } else {\n              animClass = \"text-[var(--text-primary)]\";\n            }\n\n            return (\n              <span\n                key={idx}\n                onMouseEnter={() => setHoveredIndex(idx)}\n                onMouseLeave={() => setHoveredIndex(null)}\n                style={variant === \"wave-ripple\" ? { animationDelay: `${idx * 80}ms` } : undefined}\n                className={cn(\n                  \"inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer px-[1px]\",\n                  char === \" \" ? \"w-3 sm:w-4\" : \"\",\n                  animClass,\n                  charClassName\n                )}\n              >\n                {char === \" \" ? \"\\u00A0\" : char}\n              </span>\n            );\n          })}\n        </Component>\n      </div>\n    );\n  }\n);\n\nKineticText.displayName = \"KineticText\";\n"
      }
    ]
  },
  "prismatic-slats-bg": {
    "name": "prismatic-slats-bg",
    "category": "Backgrounds & Shaders",
    "title": "Reactive Slates",
    "description": "Cursor-reactive prismatic diagonal slats background rendered on a high-performance Canvas. Features smooth colour-shifting iridescent slat bands that respond to cursor proximity with glow, specular highlights, ambient drift, and a cinematic radial vignette.",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { PrismaticSlatsBg } from \"@/registry/ui/prismatic-slats-bg\";\n\nexport function PrismaticSlatsBgDemo() {\n  return (\n    <div style={{ width: \"100%\", height: 420, borderRadius: 8, overflow: \"hidden\" }}>\n      <PrismaticSlatsBg\n        slatCount={14}\n        slatAngle={35}\n        prismIntensity={0.7}\n        interactive={true}\n      >\n        <div style={{ display: \"flex\", alignItems: \"center\", justifyContent: \"center\", height: \"100%\" }}>\n          <p style={{ color: \"white\", fontFamily: \"monospace\", fontSize: 13, opacity: 0.6 }}>Move cursor to interact</p>\n        </div>\n      </PrismaticSlatsBg>\n    </div>\n  );\n}",
    "props": [
      {
        "name": "preset",
        "type": "'Violet' | 'Cyan' | 'Sunset' | 'Emerald'",
        "defaultValue": "'Violet'",
        "description": "Color and lighting preset treatment."
      },
      {
        "name": "background",
        "type": "string",
        "defaultValue": "'#050505'",
        "description": "Base dark background CSS color."
      },
      {
        "name": "primary",
        "type": "string",
        "defaultValue": "'#5227FF'",
        "description": "Primary violet beam color hex."
      },
      {
        "name": "secondary",
        "type": "string",
        "defaultValue": "'#FF9FFC'",
        "description": "Secondary magenta chromatic fringe hex."
      },
      {
        "name": "angle",
        "type": "number",
        "defaultValue": "28",
        "description": "Angle in degrees of the diagonal fluted slats."
      },
      {
        "name": "flutes",
        "type": "number",
        "defaultValue": "8",
        "description": "Number of parallel fluted slats."
      },
      {
        "name": "refraction",
        "type": "number",
        "defaultValue": "4.0",
        "description": "Refraction dispersion strength across flutes."
      },
      {
        "name": "aberration",
        "type": "number",
        "defaultValue": "0.61",
        "description": "Chromatic aberration spatial separation."
      },
      {
        "name": "softness",
        "type": "number",
        "defaultValue": "0.50",
        "description": "Falloff softness of the refracted light beam."
      },
      {
        "name": "wave",
        "type": "number",
        "defaultValue": "0.06",
        "description": "Wave undulation amplitude."
      },
      {
        "name": "waveFrequency",
        "type": "number",
        "defaultValue": "1.5",
        "description": "Frequency of wave undulation."
      },
      {
        "name": "drift",
        "type": "number",
        "defaultValue": "0.00",
        "description": "Autonomous light sweep drift speed."
      },
      {
        "name": "highlight",
        "type": "number",
        "defaultValue": "0.12",
        "description": "Specular bevel edge highlight intensity."
      },
      {
        "name": "highlightSoftness",
        "type": "number",
        "defaultValue": "0.30",
        "description": "Softness of specular rim highlights."
      },
      {
        "name": "lightAngle",
        "type": "number",
        "defaultValue": "-90",
        "description": "Angular direction of the light beam in degrees."
      },
      {
        "name": "radius",
        "type": "number",
        "defaultValue": "6.5",
        "description": "Radius scale multiplier of the light field."
      },
      {
        "name": "momentum",
        "type": "number",
        "defaultValue": "13",
        "description": "Physics inertia of cursor light tracking."
      },
      {
        "name": "swirl",
        "type": "number",
        "defaultValue": "0",
        "description": "Swirl distortion factor."
      },
      {
        "name": "intensity",
        "type": "number",
        "defaultValue": "1.00",
        "description": "Overall illumination intensity."
      },
      {
        "name": "trail",
        "type": "number",
        "defaultValue": "1.00",
        "description": "Trailing persistence of the light beam."
      },
      {
        "name": "texture",
        "type": "number",
        "defaultValue": "0.60",
        "description": "Surface texture roughness."
      },
      {
        "name": "grain",
        "type": "number",
        "defaultValue": "0.050",
        "description": "Film grain opacity overlay."
      },
      {
        "name": "speed",
        "type": "number",
        "defaultValue": "1.00",
        "description": "Animation time progression speed."
      },
      {
        "name": "interactive",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Whether slats react to pointer movement."
      },
      {
        "name": "paused",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Pauses all time-based animations."
      },
      {
        "name": "autoplay",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Enables continuous automatic light sweep across slats."
      }
    ],
    "files": [
      {
        "name": "prismatic-slats-bg.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\n/* ─────────────────────────────────────────────────────────────────── */\n/* Types matching Image 5 controls                                      */\n/* ─────────────────────────────────────────────────────────────────── */\nexport interface PrismaticSlatsBgProps extends React.HTMLAttributes<HTMLDivElement> {\n  preset?: \"Violet\" | \"Cyan\" | \"Sunset\" | \"Emerald\";\n  background?: string;\n  primary?: string;\n  secondary?: string;\n  angle?: number;\n  flutes?: number;\n  refraction?: number;\n  aberration?: number;\n  softness?: number;\n  wave?: number;\n  waveFrequency?: number;\n  drift?: number;\n  highlight?: number;\n  highlightSoftness?: number;\n  lightAngle?: number;\n  radius?: number;\n  momentum?: number;\n  swirl?: number;\n  intensity?: number;\n  trail?: number;\n  texture?: number;\n  grain?: number;\n  speed?: number;\n  interactive?: boolean;\n  paused?: boolean;\n  autoplay?: boolean;\n  children?: React.ReactNode;\n\n  // Backwards compatible aliases\n  slatCount?: number;\n  slatWidth?: number;\n  slatAngle?: number;\n  prismIntensity?: number;\n  influenceRadius?: number;\n  bgColor?: string;\n  showGrain?: boolean;\n}\n\nexport type ReactiveSlatesProps = PrismaticSlatsBgProps;\n\n/* ─────────────────────────────────────────────────────────────────── */\n/* PrismaticSlatsBg Component (React Bits Pro inspired shader engine)   */\n/* ─────────────────────────────────────────────────────────────────── */\nexport function PrismaticSlatsBg({\n  preset = \"Violet\",\n  background,\n  primary = \"#5227FF\",\n  secondary = \"#FF9FFC\",\n  angle,\n  flutes,\n  refraction = 4.0,\n  aberration = 0.61,\n  softness = 0.50,\n  wave = 0.06,\n  waveFrequency = 1.5,\n  drift = 0.00,\n  highlight = 0.12,\n  highlightSoftness = 0.30,\n  lightAngle = -90,\n  radius = 6.5,\n  momentum = 13,\n  swirl = 0,\n  intensity = 1.00,\n  trail = 1.00,\n  texture = 0.60,\n  grain = 0.050,\n  speed = 1.00,\n  interactive = true,\n  paused = false,\n  autoplay = false,\n  children,\n  className,\n  style,\n\n  // Backwards compat props\n  bgColor,\n  slatAngle,\n  slatCount,\n  prismIntensity,\n  influenceRadius,\n  showGrain,\n  ...props\n}: PrismaticSlatsBgProps) {\n  const containerRef = React.useRef<HTMLDivElement>(null);\n  const canvasRef = React.useRef<HTMLCanvasElement>(null);\n\n  // Resolution of effective props\n  const effectiveBg = background || bgColor || \"#050505\";\n  const effectiveAngle = angle !== undefined ? angle : (slatAngle !== undefined ? slatAngle : 28);\n  const effectiveFlutes = flutes !== undefined ? flutes : (slatCount !== undefined ? slatCount : 8);\n  const effectiveIntensity = intensity * (prismIntensity !== undefined ? prismIntensity : 1.0);\n\n  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({\n    x: -9999,\n    y: -9999,\n    isOver: false,\n  });\n\n  const smoothPosRef = React.useRef<{\n    x: number;\n    y: number;\n    vx: number;\n    vy: number;\n    glowIntensity: number;\n  }>({\n    x: 0,\n    y: 0,\n    vx: 0,\n    vy: 0,\n    glowIntensity: 0.35,\n  });\n\n  const rafRef = React.useRef<number>(0);\n  const timeRef = React.useRef<number>(0);\n\n  /* ── Canvas Render Loop ── */\n  React.useEffect(() => {\n    const canvas = canvasRef.current;\n    const container = containerRef.current;\n    if (!canvas || !container) return;\n    const ctx = canvas.getContext(\"2d\");\n    if (!ctx) return;\n\n    const dpr = typeof window !== \"undefined\" ? window.devicePixelRatio || 1 : 1;\n\n    const resize = () => {\n      const { width, height } = container.getBoundingClientRect();\n      canvas.width = Math.round(width * dpr);\n      canvas.height = Math.round(height * dpr);\n      canvas.style.width = `${width}px`;\n      canvas.style.height = `${height}px`;\n\n      if (smoothPosRef.current.x === 0 && smoothPosRef.current.y === 0) {\n        smoothPosRef.current.x = width * 0.42;\n        smoothPosRef.current.y = height * 0.48;\n      }\n    };\n    resize();\n\n    const ro = new ResizeObserver(resize);\n    ro.observe(container);\n\n    let lastTimestamp = performance.now();\n\n    const render = (timestamp: number) => {\n      const dt = Math.min((timestamp - lastTimestamp) * 0.001, 0.1);\n      lastTimestamp = timestamp;\n\n      if (!paused) {\n        timeRef.current += dt * speed;\n      }\n      const t = timeRef.current;\n\n      const W = canvas.width;\n      const H = canvas.height;\n      const w = W / dpr;\n      const h = H / dpr;\n\n      ctx.save();\n      ctx.scale(dpr, dpr);\n      ctx.clearRect(0, 0, w, h);\n\n      // Target light position\n      const isOver = mouseRef.current.isOver && interactive;\n      let targetX = w * 0.45;\n      let targetY = h * 0.48;\n      let targetGlow = 0.45;\n\n      if (isOver) {\n        targetX = mouseRef.current.x;\n        targetY = mouseRef.current.y;\n        targetGlow = 1.0;\n      } else if (autoplay || drift > 0) {\n        // Continuous organic sweep across slates\n        const driftSpeed = drift > 0 ? drift : 0.4;\n        targetX = w * 0.5 + Math.cos(t * driftSpeed) * (w * 0.32);\n        targetY = h * 0.5 + Math.sin(t * driftSpeed * 0.8) * (h * 0.28);\n        targetGlow = 0.85;\n      } else {\n        // Ambient resting breathing light\n        targetX = w * 0.45 + Math.cos(t * 0.4) * (w * 0.14);\n        targetY = h * 0.48 + Math.sin(t * 0.3) * (h * 0.12);\n        targetGlow = 0.45;\n      }\n\n      // Momentum physics & trailing lag\n      const cur = smoothPosRef.current;\n      const springK = Math.max(0.02, (15 - Math.min(momentum, 14)) * 0.008);\n      const damping = Math.max(0.78, 0.94 - trail * 0.06);\n\n      const ax = (targetX - cur.x) * springK;\n      const ay = (targetY - cur.y) * springK;\n\n      cur.vx = (cur.vx + ax) * damping;\n      cur.vy = (cur.vy + ay) * damping;\n      cur.x += cur.vx;\n      cur.y += cur.vy;\n      cur.glowIntensity += (targetGlow - cur.glowIntensity) * 0.06;\n\n      const lx = cur.x;\n      const ly = cur.y;\n      const currentIntensity = cur.glowIntensity * effectiveIntensity;\n\n      /* ============================================================ */\n      /* 1. LAYER 1: BASE MATTE BACKGROUND                            */\n      /* ============================================================ */\n      ctx.fillStyle = effectiveBg;\n      ctx.fillRect(0, 0, w, h);\n\n      /* ============================================================ */\n      /* 2. LAYER 2: CHROMATIC LIGHT FIELD (REFRACTION + ABERRATION)   */\n      /* ============================================================ */\n      // Base light field radius based on radius slider\n      const lightBeamRadius = Math.max(w, h) * 0.55 * (radius / 6.5);\n\n      // Light angle in radians (default -90deg is vertical sweep)\n      const lightRad = (lightAngle * Math.PI) / 180;\n      const lightDirX = Math.cos(lightRad);\n      const lightDirY = Math.sin(lightRad);\n\n      // 1. Primary Violet Glow Beam (#5227FF)\n      const primaryGlow = ctx.createRadialGradient(\n        lx,\n        ly,\n        0,\n        lx + lightDirX * 30,\n        ly + lightDirY * 30,\n        lightBeamRadius\n      );\n      primaryGlow.addColorStop(0.0, `${primary}99`); // high intensity core\n      primaryGlow.addColorStop(0.25 * (1 + softness * 0.4), `${primary}66`);\n      primaryGlow.addColorStop(0.6 * (1 + softness * 0.3), `${primary}26`);\n      primaryGlow.addColorStop(1.0, \"rgba(0, 0, 0, 0)\");\n\n      ctx.fillStyle = primaryGlow;\n      ctx.fillRect(0, 0, w, h);\n\n      // 2. Secondary Magenta/Pink Chromatic Aberration Fringe (#FF9FFC)\n      // Aberration shifts the secondary fringe along the light perpendicular axis\n      const aberOffset = aberration * 48;\n      const secX = lx + perp(lightDirX, lightDirY)[0] * aberOffset;\n      const secY = ly + perp(lightDirX, lightDirY)[1] * aberOffset;\n\n      const secGlow = ctx.createRadialGradient(\n        secX,\n        secY,\n        0,\n        secX,\n        secY,\n        lightBeamRadius * 0.8\n      );\n      secGlow.addColorStop(0.0, `${secondary}73`);\n      secGlow.addColorStop(0.35, `${secondary}38`);\n      secGlow.addColorStop(0.8, `${secondary}0f`);\n      secGlow.addColorStop(1.0, \"rgba(0, 0, 0, 0)\");\n\n      ctx.fillStyle = secGlow;\n      ctx.fillRect(0, 0, w, h);\n\n      /* ============================================================ */\n      /* 3. LAYER 3: FLUTED DIAGONAL SLATS (IMAGE 4)                  */\n      /* ============================================================ */\n      const rad = (effectiveAngle * Math.PI) / 180;\n      const cosA = Math.cos(rad);\n      const sinA = Math.sin(rad);\n      const perpX = -sinA;\n      const perpY = cosA;\n\n      const span = Math.hypot(w, h) * 2.2;\n      const cx = w * 0.5;\n      const cy = h * 0.5;\n\n      // Pitch of flutes\n      const totalWidth = Math.max(w, h) * 1.6;\n      const fluteStep = totalWidth / Math.max(4, effectiveFlutes);\n      const fluteWidth = fluteStep * 0.78;\n      const fluteGap = fluteStep * 0.22;\n\n      const numSlats = Math.ceil(span / fluteStep) + 6;\n\n      for (let i = 0; i < numSlats; i++) {\n        const offset = (i - numSlats / 2) * fluteStep;\n\n        // Wave undulation factor along flutes\n        const waveOffset = Math.sin(offset * 0.05 * waveFrequency + t * 2) * (wave * 60);\n\n        const ox = cx + perpX * (offset + waveOffset);\n        const oy = cy + perpY * (offset + waveOffset);\n\n        // Calculate proximity of this slat to the refracted light beam\n        const dmx = lx - ox;\n        const dmy = ly - oy;\n        const distPerp = dmx * perpX + dmy * perpY;\n        const distSlat = dmx * cosA + dmy * sinA;\n        const distToCursor = Math.hypot(distPerp, distSlat * 0.42);\n\n        const influence = Math.max(0, 1 - distToCursor / (lightBeamRadius * 0.9));\n        const curveInfluence = Math.pow(influence, 1.2) * currentIntensity;\n\n        const halfW = fluteWidth * 0.5;\n\n        // Quad corners of the slat\n        const p0x = ox - cosA * span - perpX * halfW;\n        const p0y = oy - sinA * span - perpY * halfW;\n        const p1x = ox + cosA * span - perpX * halfW;\n        const p1y = oy + sinA * span - perpY * halfW;\n        const p2x = ox + cosA * span + perpX * halfW;\n        const p2y = oy + sinA * span + perpY * halfW;\n        const p3x = ox - cosA * span + perpX * halfW;\n        const p3y = oy - sinA * span + perpY * halfW;\n\n        // Physical Flute Slat Face (deep charcoal cylinder shading)\n        const g0x = ox - perpX * halfW;\n        const g0y = oy - perpY * halfW;\n        const g1x = ox + perpX * halfW;\n        const g1y = oy + perpY * halfW;\n\n        const slatGrad = ctx.createLinearGradient(g0x, g0y, g1x, g1y);\n        // Beveled curvature: lighter charcoal -> dark matte body -> deep recessed shadow\n        slatGrad.addColorStop(0.0, \"rgba(24, 24, 30, 0.98)\");\n        slatGrad.addColorStop(0.12, \"rgba(16, 16, 20, 0.96)\");\n        slatGrad.addColorStop(0.65, \"rgba(8, 8, 11, 0.98)\");\n        slatGrad.addColorStop(1.0, \"rgba(4, 4, 6, 1.0)\");\n\n        ctx.beginPath();\n        ctx.moveTo(p0x, p0y);\n        ctx.lineTo(p1x, p1y);\n        ctx.lineTo(p2x, p2y);\n        ctx.lineTo(p3x, p3y);\n        ctx.closePath();\n        ctx.fillStyle = slatGrad;\n        ctx.fill();\n\n        // Refraction sheen on slat surface\n        if (curveInfluence > 0.01) {\n          const sheenGrad = ctx.createLinearGradient(g0x, g0y, g1x, g1y);\n          const sheenA = Math.min(0.28, curveInfluence * (refraction / 4.0) * 0.22);\n          sheenGrad.addColorStop(0.0, `rgba(255, 159, 252, ${sheenA * 0.9})`);\n          sheenGrad.addColorStop(0.25, `rgba(82, 39, 255, ${sheenA * 1.2})`);\n          sheenGrad.addColorStop(0.85, \"rgba(0, 0, 0, 0)\");\n\n          ctx.fillStyle = sheenGrad;\n          ctx.fill();\n        }\n\n        // Specular Edge Highlight (Razor leading bevel edge)\n        if (highlight > 0) {\n          ctx.beginPath();\n          ctx.moveTo(p0x, p0y);\n          ctx.lineTo(p1x, p1y);\n          const edgeAlpha = (highlight * 0.5 + curveInfluence * highlight * 2.2) * (1 - highlightSoftness * 0.4);\n          ctx.strokeStyle = `rgba(255, 220, 255, ${Math.min(0.9, edgeAlpha)})`;\n          ctx.lineWidth = 1.0 + highlight * 1.5;\n          ctx.stroke();\n        }\n\n        // Drop shadow cast into recessed groove\n        const shadowExtent = Math.min(fluteGap, 22);\n        const s0x = p3x;\n        const s0y = p3y;\n        const s1x = p2x;\n        const s1y = p2y;\n        const s2x = p2x + perpX * shadowExtent;\n        const s2y = p2y + perpY * shadowExtent;\n        const s3x = p3x + perpX * shadowExtent;\n        const s3y = p3y + perpY * shadowExtent;\n\n        const shadowGrad = ctx.createLinearGradient(\n          ox + perpX * halfW,\n          oy + perpY * halfW,\n          ox + perpX * (halfW + shadowExtent),\n          oy + perpY * (halfW + shadowExtent)\n        );\n        shadowGrad.addColorStop(0.0, \"rgba(0, 0, 0, 0.82)\");\n        shadowGrad.addColorStop(0.4, \"rgba(0, 0, 0, 0.42)\");\n        shadowGrad.addColorStop(1.0, \"rgba(0, 0, 0, 0)\");\n\n        ctx.beginPath();\n        ctx.moveTo(s0x, s0y);\n        ctx.lineTo(s1x, s1y);\n        ctx.lineTo(s2x, s2y);\n        ctx.lineTo(s3x, s3y);\n        ctx.closePath();\n        ctx.fillStyle = shadowGrad;\n        ctx.fill();\n      }\n\n      /* ============================================================ */\n      /* 4. LAYER 4: VIGNETTE & FILM GRAIN                            */\n      /* ============================================================ */\n      const vig = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.8);\n      vig.addColorStop(0.0, \"rgba(0, 0, 0, 0)\");\n      vig.addColorStop(0.65, \"rgba(0, 0, 0, 0.38)\");\n      vig.addColorStop(1.0, \"rgba(0, 0, 0, 0.82)\");\n      ctx.fillStyle = vig;\n      ctx.fillRect(0, 0, w, h);\n\n      if (grain > 0) {\n        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));\n        grd.addColorStop(0, `rgba(255, 255, 255, ${grain * 0.6})`);\n        grd.addColorStop(1, \"rgba(255, 255, 255, 0)\");\n        ctx.globalCompositeOperation = \"screen\";\n        ctx.fillStyle = grd;\n        ctx.fillRect(0, 0, w, h);\n        ctx.globalCompositeOperation = \"source-over\";\n      }\n\n      ctx.restore();\n      rafRef.current = requestAnimationFrame(render);\n    };\n\n    rafRef.current = requestAnimationFrame(render);\n\n    return () => {\n      cancelAnimationFrame(rafRef.current);\n      ro.disconnect();\n    };\n  }, [\n    effectiveBg,\n    primary,\n    secondary,\n    effectiveAngle,\n    effectiveFlutes,\n    refraction,\n    aberration,\n    softness,\n    wave,\n    waveFrequency,\n    drift,\n    highlight,\n    highlightSoftness,\n    lightAngle,\n    radius,\n    momentum,\n    swirl,\n    effectiveIntensity,\n    trail,\n    texture,\n    grain,\n    speed,\n    interactive,\n    paused,\n    autoplay,\n  ]);\n\n  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const rect = canvas.getBoundingClientRect();\n    mouseRef.current = {\n      x: e.clientX - rect.left,\n      y: e.clientY - rect.top,\n      isOver: true,\n    };\n  };\n\n  const handleMouseEnter = () => {\n    mouseRef.current.isOver = true;\n  };\n\n  const handleMouseLeave = () => {\n    mouseRef.current.isOver = false;\n  };\n\n  return (\n    <div\n      ref={containerRef}\n      className={cn(\"relative w-full h-full overflow-hidden select-none\", className)}\n      style={{ background: effectiveBg, ...style }}\n      onMouseMove={handleMouseMove}\n      onMouseEnter={handleMouseEnter}\n      onMouseLeave={handleMouseLeave}\n      {...props}\n    >\n      <canvas\n        ref={canvasRef}\n        className=\"absolute inset-0 w-full h-full pointer-events-none z-0 block\"\n        aria-hidden=\"true\"\n      />\n      {children && (\n        <div className=\"relative z-10 w-full h-full pointer-events-auto\">\n          {children}\n        </div>\n      )}\n    </div>\n  );\n}\n\nfunction perp(x: number, y: number): [number, number] {\n  return [-y, x];\n}\n\nexport const ReactiveSlates = PrismaticSlatsBg;\n"
      }
    ]
  },
  "grainy-grid-shader": {
    "name": "grainy-grid-shader",
    "category": "Backgrounds & Shaders",
    "title": "Grainy Grid Shader",
    "description": "Cursor-reactive 2x2 App Grid matrix that spins 90° and morphs into geometric crosshairs. Textured with procedural turbulent noise and analog film grain for a rough, tactile matte finish.",
    "variants": [
      "rough-matte",
      "tactile-kraft",
      "cyber-mesh"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { GrainyGridShader } from \"@/registry/ui/grainy-grid-shader\";\n\nexport function GrainyGridShaderDemo() {\n  return (\n    <div style={{ width: \"100%\", height: 420, borderRadius: 12, overflow: \"hidden\" }}>\n      <GrainyGridShader\n        variant=\"rough-matte\"\n        grain={0.25}\n        roughness={1.0}\n        columns={6}\n        rows={4}\n        interactive={true}\n      >\n        <div style={{ textAlign: \"center\", color: \"white\" }}>\n          <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: \"-0.02em\" }}>Rough Grid Shader</h2>\n          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>Tactile noise • 2x2 App Grid Spin to X</p>\n        </div>\n      </GrainyGridShader>\n    </div>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'rough-matte' | 'tactile-kraft' | 'cyber-mesh'",
        "defaultValue": "'rough-matte'",
        "description": "Visual material style and color palette."
      },
      {
        "name": "grain",
        "type": "number",
        "defaultValue": "0.22",
        "description": "Procedural film grain and noise intensity (0.0 to 0.6)."
      },
      {
        "name": "roughness",
        "type": "number",
        "defaultValue": "1.0",
        "description": "Tactile noise grit scale and frequency."
      },
      {
        "name": "columns",
        "type": "number",
        "defaultValue": "6",
        "description": "Number of 2x2 grid modules along horizontal axis."
      },
      {
        "name": "rows",
        "type": "number",
        "defaultValue": "4",
        "description": "Number of 2x2 grid modules along vertical axis."
      },
      {
        "name": "cellSize",
        "type": "number",
        "defaultValue": "52",
        "description": "Dimensions in pixels of each 2x2 morphing unit."
      },
      {
        "name": "speed",
        "type": "number",
        "defaultValue": "1.0",
        "description": "Rotation and wave animation velocity multiplier."
      },
      {
        "name": "influenceRadius",
        "type": "number",
        "defaultValue": "140",
        "description": "Cursor interaction reach in pixels."
      },
      {
        "name": "autoWave",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables continuous ambient traveling wave morphing."
      },
      {
        "name": "interactive",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Enables cursor tracking and click shockwave ripples."
      },
      {
        "name": "showBoxes",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Whether to render 2x2 grid boxes (false for pure grainy backdrop)."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "Optional content rendered directly on the shader canvas."
      }
    ],
    "files": [
      {
        "name": "grainy-grid-shader.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface GrainyGridShaderProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Visual variant styling */\n  variant?: \"rough-matte\" | \"tactile-kraft\" | \"cyber-mesh\";\n  /** Procedural grain & noise intensity (0.0 to 0.6) */\n  grain?: number;\n  /** Roughness texture frequency / grit scale (0.2 to 2.0) */\n  roughness?: number;\n  /** Number of grid columns */\n  columns?: number;\n  /** Number of grid rows */\n  rows?: number;\n  /** Size in pixels of each 2x2 grid cell */\n  cellSize?: number;\n  /** Base background matte color */\n  bgColor?: string;\n  /** Idle stroke & block color */\n  primaryColor?: string;\n  /** Active morphed spin color */\n  accentColor?: string;\n  /** Cursor influence radius in pixels */\n  influenceRadius?: number;\n  /** Cursor influence radius alias */\n  interactiveRadius?: number;\n  /** Speed of rotational transitions and waves */\n  speed?: number;\n  /** Whether idle cells exhibit ambient traveling wave ripples */\n  autoWave?: boolean;\n  /** Whether cells react to cursor proximity and clicks */\n  interactive?: boolean;\n  /** Whether to render the 2x2 grid boxes (set to false for pure grainy backdrop) */\n  showBoxes?: boolean;\n  /** Content rendered above the grainy grid shader */\n  children?: React.ReactNode;\n}\n\ninterface GridCell {\n  col: number;\n  row: number;\n  x: number;\n  y: number;\n  currentMorph: number;\n  targetMorph: number;\n  rotation: number;\n  targetRotation: number;\n  waveOffset: number;\n}\n\ninterface Ripple {\n  x: number;\n  y: number;\n  radius: number;\n  maxRadius: number;\n  strength: number;\n}\n\n/**\n * GrainyGridShader:\n * An interactive canvas background featuring a matrix of 2x2 App Grid units\n * that spin 90° and morph between rounded app tiles and diagonal X crosshairs.\n * Coated in procedural film grain and turbulent noise for a rough, brutalist, tactile matte surface.\n */\nexport function GrainyGridShader({\n  variant = \"rough-matte\",\n  grain = 0.22,\n  roughness = 1.0,\n  columns = 6,\n  rows = 4,\n  cellSize = 52,\n  bgColor,\n  primaryColor,\n  accentColor,\n  influenceRadius = 140,\n  interactiveRadius,\n  speed = 1.0,\n  autoWave = true,\n  interactive = true,\n  showBoxes = true,\n  children,\n  className,\n  style,\n  ...props\n}: GrainyGridShaderProps) {\n  const effectiveRadius = interactiveRadius ?? influenceRadius ?? 140;\n  const containerRef = React.useRef<HTMLDivElement>(null);\n  const canvasRef = React.useRef<HTMLCanvasElement>(null);\n  const noiseCanvasRef = React.useRef<HTMLCanvasElement | null>(null);\n\n  // Variant default color themes\n  const themeColors = React.useMemo(() => {\n    switch (variant) {\n      case \"tactile-kraft\":\n        return {\n          bg: bgColor || \"#121110\",\n          primary: primaryColor || \"#d4af37\",\n          accent: accentColor || \"#f59e0b\",\n        };\n      case \"cyber-mesh\":\n        return {\n          bg: bgColor || \"#050608\",\n          primary: primaryColor || \"#00f0ff\",\n          accent: accentColor || \"#ec4899\",\n        };\n      case \"rough-matte\":\n      default:\n        return {\n          bg: bgColor || \"#090a0a\",\n          primary: primaryColor || \"#f4f4f5\",\n          accent: accentColor || \"#8bc49a\",\n        };\n    }\n  }, [variant, bgColor, primaryColor, accentColor]);\n\n  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({\n    x: -9999,\n    y: -9999,\n    isOver: false,\n  });\n\n  const ripplesRef = React.useRef<Ripple[]>([]);\n  const cellsRef = React.useRef<GridCell[]>([]);\n  const timeRef = React.useRef<number>(0);\n\n  // Initialize procedural noise pattern canvas\n  React.useEffect(() => {\n    const size = 128;\n    const nCanvas = document.createElement(\"canvas\");\n    nCanvas.width = size;\n    nCanvas.height = size;\n    const nCtx = nCanvas.getContext(\"2d\");\n    if (!nCtx) return;\n\n    const imgData = nCtx.createImageData(size, size);\n    const data = imgData.data;\n    const freq = Math.max(0.2, roughness);\n\n    for (let i = 0; i < data.length; i += 4) {\n      // High-frequency turbulent noise\n      const n = Math.random() * 255;\n      data[i] = n;     // R\n      data[i + 1] = n; // G\n      data[i + 2] = n; // B\n      data[i + 3] = Math.floor(grain * 140 * Math.min(1.5, freq)); // Alpha\n    }\n    nCtx.putImageData(imgData, 0, 0);\n    noiseCanvasRef.current = nCanvas;\n  }, [grain, roughness]);\n\n  // Main animation and physics render loop\n  React.useEffect(() => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const ctx = canvas.getContext(\"2d\", { alpha: false });\n    if (!ctx) return;\n\n    let animId: number;\n    let width = 0;\n    let height = 0;\n\n    const resize = () => {\n      if (!canvas) return;\n      const rect = canvas.getBoundingClientRect();\n      const dpr = Math.min(2, window.devicePixelRatio || 1);\n      width = rect.width;\n      height = rect.height;\n      canvas.width = Math.floor(width * dpr);\n      canvas.height = Math.floor(height * dpr);\n      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);\n\n      // Re-initialize cells layout\n      const cells: GridCell[] = [];\n      const totalWidth = columns * cellSize;\n      const totalHeight = rows * cellSize;\n      const startX = (width - totalWidth) / 2 + cellSize / 2;\n      const startY = (height - totalHeight) / 2 + cellSize / 2;\n\n      for (let r = 0; r < rows; r++) {\n        for (let c = 0; c < columns; c++) {\n          const cx = startX + c * cellSize;\n          const cy = startY + r * cellSize;\n          cells.push({\n            col: c,\n            row: r,\n            x: cx,\n            y: cy,\n            currentMorph: 0,\n            targetMorph: 0,\n            rotation: 0,\n            targetRotation: 0,\n            waveOffset: (c + r) * 0.45,\n          });\n        }\n      }\n      cellsRef.current = cells;\n    };\n\n    resize();\n    window.addEventListener(\"resize\", resize);\n\n    // Render frame\n    const render = () => {\n      timeRef.current += 0.02 * speed;\n      const t = timeRef.current;\n\n      // 1. Background Fill\n      ctx.fillStyle = themeColors.bg;\n      ctx.fillRect(0, 0, width, height);\n\n      // 2. Subtle ambient grid background lines\n      ctx.save();\n      ctx.strokeStyle = \"rgba(255, 255, 255, 0.035)\";\n      ctx.lineWidth = 1;\n      const step = cellSize;\n      for (let x = 0; x <= width; x += step) {\n        ctx.beginPath();\n        ctx.moveTo(x, 0);\n        ctx.lineTo(x, height);\n        ctx.stroke();\n      }\n      for (let y = 0; y <= height; y += step) {\n        ctx.beginPath();\n        ctx.moveTo(0, y);\n        ctx.lineTo(width, y);\n        ctx.stroke();\n      }\n      ctx.restore();\n\n      // 3. Update ripples\n      const activeRipples = ripplesRef.current;\n      for (let i = activeRipples.length - 1; i >= 0; i--) {\n        const rp = activeRipples[i];\n        rp.radius += 5.5 * speed;\n        rp.strength *= 0.95;\n        if (rp.radius > rp.maxRadius || rp.strength < 0.01) {\n          activeRipples.splice(i, 1);\n        }\n      }\n\n      // 4. Update & Draw Grid Cells\n      const mouse = mouseRef.current;\n      const cells = cellsRef.current;\n      const baseSize = cellSize * 0.68;\n      const halfSize = baseSize / 2;\n\n      cells.forEach((cell) => {\n        // Calculate interaction influence\n        let hoverInfluence = 0;\n        if (interactive && mouse.isOver) {\n          const dx = cell.x - mouse.x;\n          const dy = cell.y - mouse.y;\n          const dist = Math.sqrt(dx * dx + dy * dy);\n          if (dist < effectiveRadius) {\n            hoverInfluence = 1 - dist / effectiveRadius;\n            // Ease in cubic\n            hoverInfluence = hoverInfluence * hoverInfluence * (3 - 2 * hoverInfluence);\n          }\n        }\n\n        // Calculate ripple impulses\n        let rippleInfluence = 0;\n        activeRipples.forEach((rp) => {\n          const dx = cell.x - rp.x;\n          const dy = cell.y - rp.y;\n          const dist = Math.sqrt(dx * dx + dy * dy);\n          const ringDist = Math.abs(dist - rp.radius);\n          if (ringDist < 60) {\n            const inf = (1 - ringDist / 60) * rp.strength;\n            rippleInfluence = Math.max(rippleInfluence, inf);\n          }\n        });\n\n        // Ambient traveling wave\n        let wave = 0;\n        if (autoWave) {\n          wave = (Math.sin(t + cell.waveOffset) + 1) * 0.5;\n          // Only subtle morph pulse\n          wave = Math.max(0, wave - 0.7) * 0.7;\n        }\n\n        // Determine target morph state (0 = 2x2 grid, 1 = X cross)\n        cell.targetMorph = Math.min(1, hoverInfluence * 1.3 + rippleInfluence * 1.5 + wave);\n        cell.targetRotation = (cell.targetMorph * Math.PI) / 2 + (rippleInfluence * Math.PI);\n\n        // Spring interpolation\n        cell.currentMorph += (cell.targetMorph - cell.currentMorph) * (0.14 * speed);\n        cell.rotation += (cell.targetRotation - cell.rotation) * (0.14 * speed);\n\n        if (!showBoxes) return;\n\n        const morph = cell.currentMorph;\n        const rot = cell.rotation;\n\n        ctx.save();\n        ctx.translate(cell.x, cell.y);\n        ctx.rotate(rot);\n\n        // Compute dynamic colors between primary and accent\n        const strokeColor = morph > 0.15 ? themeColors.accent : themeColors.primary;\n        const fillAlpha = morph * 0.12;\n\n        ctx.strokeStyle = strokeColor;\n        ctx.fillStyle = morph > 0.15 ? `rgba(139, 196, 154, ${fillAlpha})` : \"transparent\";\n        ctx.lineWidth = 1.75;\n        ctx.lineCap = \"round\";\n        ctx.lineJoin = \"round\";\n\n        /* ── Part A: 4 Rectangles (.b1, .b2, .b3, .b4) ── */\n        // In idle state: full size. As morph -> 1: scale drops to 0.2 and opacity drops to 0\n        const boxOpacity = Math.max(0, 1 - morph * 1.3);\n        if (boxOpacity > 0.01) {\n          ctx.save();\n          ctx.globalAlpha = boxOpacity;\n\n          const boxSize = halfSize * 0.76;\n          const offset = halfSize * 0.52;\n          const r = Math.max(1, boxSize * 0.26);\n\n          // Helper to draw rounded rectangle\n          const drawRoundRect = (x: number, y: number, w: number, h: number, radius: number) => {\n            ctx.beginPath();\n            ctx.moveTo(x + radius, y);\n            ctx.lineTo(x + w - radius, y);\n            ctx.arcTo(x + w, y, x + w, y + radius, radius);\n            ctx.lineTo(x + w, y + h - radius);\n            ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);\n            ctx.lineTo(x + radius, y + h);\n            ctx.arcTo(x, y + h, x, y + h - radius, radius);\n            ctx.lineTo(x, y + radius);\n            ctx.arcTo(x, y, x + radius, y, radius);\n            ctx.closePath();\n            ctx.stroke();\n          };\n\n          // b1: Top-Left\n          drawRoundRect(-offset - boxSize / 2, -offset - boxSize / 2, boxSize, boxSize, r);\n          // b2: Top-Right\n          drawRoundRect(offset - boxSize / 2, -offset - boxSize / 2, boxSize, boxSize, r);\n          // b3: Bottom-Left\n          drawRoundRect(-offset - boxSize / 2, offset - boxSize / 2, boxSize, boxSize, r);\n          // b4: Bottom-Right\n          drawRoundRect(offset - boxSize / 2, offset - boxSize / 2, boxSize, boxSize, r);\n\n          ctx.restore();\n        }\n\n        /* ── Part B: X Crosshair Lines (.x) ── */\n        // In idle state: opacity 0, scale 0.4. As morph -> 1: scale 1, opacity 1\n        const xOpacity = Math.min(1, Math.max(0, (morph - 0.15) * 1.3));\n        if (xOpacity > 0.01) {\n          ctx.save();\n          ctx.globalAlpha = xOpacity;\n          const xSpan = halfSize * 0.85 * (0.4 + 0.6 * morph);\n\n          ctx.beginPath();\n          ctx.moveTo(-xSpan, -xSpan);\n          ctx.lineTo(xSpan, xSpan);\n          ctx.stroke();\n\n          ctx.beginPath();\n          ctx.moveTo(xSpan, -xSpan);\n          ctx.lineTo(-xSpan, xSpan);\n          ctx.stroke();\n\n          ctx.restore();\n        }\n\n        ctx.restore();\n      });\n\n      // 5. Procedural Grain & Rough Texture Overlay\n      const noise = noiseCanvasRef.current;\n      if (noise && grain > 0) {\n        ctx.save();\n        ctx.globalCompositeOperation = \"screen\";\n        const pat = ctx.createPattern(noise, \"repeat\");\n        if (pat) {\n          ctx.fillStyle = pat;\n          ctx.fillRect(0, 0, width, height);\n        }\n        ctx.restore();\n      }\n\n      // 6. Tactical Vignette Mask\n      ctx.save();\n      const vignette = ctx.createRadialGradient(\n        width / 2,\n        height / 2,\n        Math.min(width, height) * 0.28,\n        width / 2,\n        height / 2,\n        Math.max(width, height) * 0.72\n      );\n      vignette.addColorStop(0, \"rgba(0, 0, 0, 0)\");\n      vignette.addColorStop(1, \"rgba(0, 0, 0, 0.68)\");\n      ctx.fillStyle = vignette;\n      ctx.fillRect(0, 0, width, height);\n      ctx.restore();\n\n      animId = requestAnimationFrame(render);\n    };\n\n    animId = requestAnimationFrame(render);\n\n    return () => {\n      cancelAnimationFrame(animId);\n      window.removeEventListener(\"resize\", resize);\n    };\n  }, [\n    themeColors,\n    grain,\n    roughness,\n    columns,\n    rows,\n    cellSize,\n    effectiveRadius,\n    speed,\n    autoWave,\n    interactive,\n    showBoxes,\n  ]);\n\n  // Mouse move handler\n  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const rect = canvas.getBoundingClientRect();\n    mouseRef.current = {\n      x: e.clientX - rect.left,\n      y: e.clientY - rect.top,\n      isOver: true,\n    };\n  };\n\n  const handleMouseEnter = () => {\n    mouseRef.current.isOver = true;\n  };\n\n  const handleMouseLeave = () => {\n    mouseRef.current.isOver = false;\n  };\n\n  // Shockwave ripple on click\n  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const rect = canvas.getBoundingClientRect();\n    const x = e.clientX - rect.left;\n    const y = e.clientY - rect.top;\n\n    ripplesRef.current.push({\n      x,\n      y,\n      radius: 0,\n      maxRadius: Math.max(rect.width, rect.height) * 0.85,\n      strength: 1.0,\n    });\n  };\n\n  return (\n    <div\n      ref={containerRef}\n      className={cn(\n        \"relative w-full h-full min-h-[380px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] select-none\",\n        className\n      )}\n      style={style}\n      {...props}\n    >\n      {/* High performance 60fps Morphing Grid Canvas */}\n      <canvas\n        ref={canvasRef}\n        onMouseMove={handleMouseMove}\n        onMouseEnter={handleMouseEnter}\n        onMouseLeave={handleMouseLeave}\n        onClick={handleClick}\n        className=\"absolute inset-0 w-full h-full cursor-crosshair block z-0\"\n      />\n\n      {/* Rough Analog Film Grain Filter Overlay */}\n      {grain > 0 && (\n        <div\n          aria-hidden=\"true\"\n          className=\"absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay\"\n          style={{\n            backgroundImage: `url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.45'/%3E%3C/svg%3E\")`,\n          }}\n        />\n      )}\n\n      {/* Optional Children slot (Hero content, headlines, tags) */}\n      {children && (\n        <div className=\"relative z-20 pointer-events-auto h-full w-full flex items-center justify-center p-6\">\n          {children}\n        </div>\n      )}\n    </div>\n  );\n}\n"
      }
    ]
  },
  "grainy-horizon-shader": {
    "name": "grainy-horizon-shader",
    "category": "Backgrounds & Shaders",
    "title": "Grainy Horizon Shader",
    "description": "Cinematic curved dark eclipse horizon shader illuminated by deep radiant chromatic glow and enveloped in tactile analog film grain and procedural noise.",
    "variants": [
      "ultraviolet",
      "aurora-green",
      "solar-amber",
      "cyber-cyan",
      "monochrome"
    ],
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "registryDependencies": [
      "utils"
    ],
    "usage": "import { GrainyHorizonShader } from \"@/registry/ui/grainy-horizon-shader\";\n\nexport function GrainyHorizonShaderDemo() {\n  return (\n    <div style={{ width: \"100%\", height: 440, borderRadius: 16, overflow: \"hidden\" }}>\n      <GrainyHorizonShader\n        variant=\"ultraviolet\"\n        grain={0.26}\n        roughness={1.2}\n        glowIntensity={1.2}\n        curvature={0.52}\n        interactive={true}\n      >\n        <div style={{ display: \"flex\", flexDirection: \"column\", alignItems: \"center\", justifyContent: \"center\", height: \"100%\", gap: 12 }}>\n          <h2 style={{ color: \"white\", fontSize: 26, fontWeight: 600, letterSpacing: \"-0.02em\" }}>Grainy Horizon Shader</h2>\n          <p style={{ color: \"rgba(255,255,255,0.6)\", fontSize: 13, fontFamily: \"monospace\" }}>Tactile analog film grain • Luminous horizon glow</p>\n        </div>\n      </GrainyHorizonShader>\n    </div>\n  );\n}",
    "props": [
      {
        "name": "variant",
        "type": "'ultraviolet' | 'aurora-green' | 'solar-amber' | 'cyber-cyan' | 'monochrome'",
        "defaultValue": "'ultraviolet'",
        "description": "Curated ambient color palette and radiant chromatic glow."
      },
      {
        "name": "grain",
        "type": "number",
        "defaultValue": "0.26",
        "description": "Procedural noise & analog film grain density (0.0 to 0.6)."
      },
      {
        "name": "roughness",
        "type": "number",
        "defaultValue": "1.2",
        "description": "Tactile noise roughness and grit scale."
      },
      {
        "name": "glowIntensity",
        "type": "number",
        "defaultValue": "1.2",
        "description": "Brightness multiplier of the radiant horizon backlighting."
      },
      {
        "name": "curvature",
        "type": "number",
        "defaultValue": "0.52",
        "description": "Depth of the dark eclipse horizon curve."
      },
      {
        "name": "glowSpread",
        "type": "number",
        "defaultValue": "1.1",
        "description": "Vertical reach and spread of the radiant backlight."
      },
      {
        "name": "speed",
        "type": "number",
        "defaultValue": "0.8",
        "description": "Wave undulation and breathing rhythm velocity."
      },
      {
        "name": "drift",
        "type": "number",
        "defaultValue": "0.35",
        "description": "Lateral ambient horizon swaying speed."
      },
      {
        "name": "interactive",
        "type": "boolean",
        "defaultValue": "true",
        "description": "Whether cursor proximity attracts the light and tilts the horizon."
      },
      {
        "name": "inverted",
        "type": "boolean",
        "defaultValue": "false",
        "description": "Inverts curve orientation (crescent dome vs bowl)."
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "description": "Optional content rendered directly on the shader canvas."
      }
    ],
    "files": [
      {
        "name": "grainy-horizon-shader.tsx",
        "type": "components:ui",
        "content": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"@/lib/utils\";\n\nexport interface GrainyHorizonShaderProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Visual preset color palette */\n  variant?: \"ultraviolet\" | \"aurora-green\" | \"solar-amber\" | \"cyber-cyan\" | \"monochrome\";\n  /** Procedural noise & film grain density (0.0 to 0.6) */\n  grain?: number;\n  /** Roughness texture frequency / grit scale (0.5 to 3.0) */\n  roughness?: number;\n  /** Brightness multiplier of the radiant glow (0.2 to 2.5) */\n  glowIntensity?: number;\n  /** Curvature depth of the dark eclipse horizon (-1.0 to 1.0) */\n  curvature?: number;\n  /** Vertical spread and reach of the backlighting glow (0.2 to 2.0) */\n  glowSpread?: number;\n  /** Primary glow illumination color (hex) */\n  primaryColor?: string;\n  /** Secondary rim light / aberration color (hex) */\n  secondaryColor?: string;\n  /** Dark base background color (hex) */\n  bgColor?: string;\n  /** Wave undulation & breathing speed (0.1 to 3.0) */\n  speed?: number;\n  /** Ambient lateral drift speed (0.0 to 2.0) */\n  drift?: number;\n  /** Whether the horizon reacts to pointer proximity and clicks */\n  interactive?: boolean;\n  /** Invert curve orientation (crescent dome vs bowl) */\n  inverted?: boolean;\n  /** Optional children overlay (hero text, CTA, badges) */\n  children?: React.ReactNode;\n}\n\n/**\n * GrainyHorizonShader:\n * A cinematic background shader featuring an organic curved dark horizon / eclipse silhouette\n * illuminated by a deep radiant chromatic glow and enveloped in tactile analog film grain and noise.\n * Inspired by modern brutalist aesthetics and high-end lighting documentation.\n */\nexport function GrainyHorizonShader({\n  variant = \"ultraviolet\",\n  grain = 0.26,\n  roughness = 1.2,\n  glowIntensity = 1.2,\n  curvature = 0.52,\n  glowSpread = 1.1,\n  primaryColor,\n  secondaryColor,\n  bgColor,\n  speed = 0.8,\n  drift = 0.35,\n  interactive = true,\n  inverted = false,\n  children,\n  className,\n  style,\n  ...props\n}: GrainyHorizonShaderProps) {\n  const containerRef = React.useRef<HTMLDivElement>(null);\n  const canvasRef = React.useRef<HTMLCanvasElement>(null);\n  const noiseCanvasRef = React.useRef<HTMLCanvasElement | null>(null);\n\n  // Preset color mappings matching reference image aesthetics\n  const theme = React.useMemo(() => {\n    switch (variant) {\n      case \"aurora-green\":\n        return {\n          bg: bgColor || \"#040907\",\n          primary: primaryColor || \"#10b981\",\n          secondary: secondaryColor || \"#34d399\",\n          highlight: \"#6ee7b7\",\n          darkBody: \"#020705\",\n        };\n      case \"solar-amber\":\n        return {\n          bg: bgColor || \"#090503\",\n          primary: primaryColor || \"#f59e0b\",\n          secondary: secondaryColor || \"#f43f5e\",\n          highlight: \"#fcd34d\",\n          darkBody: \"#060302\",\n        };\n      case \"cyber-cyan\":\n        return {\n          bg: bgColor || \"#03080c\",\n          primary: primaryColor || \"#06b6d4\",\n          secondary: secondaryColor || \"#3b82f6\",\n          highlight: \"#67e8f9\",\n          darkBody: \"#020508\",\n        };\n      case \"monochrome\":\n        return {\n          bg: bgColor || \"#08080a\",\n          primary: primaryColor || \"#d4d4d8\",\n          secondary: secondaryColor || \"#71717a\",\n          highlight: \"#f4f4f5\",\n          darkBody: \"#040405\",\n        };\n      case \"ultraviolet\":\n      default:\n        // Deep purple / ultraviolet matching media_1792862001252.png\n        return {\n          bg: bgColor || \"#05040a\",\n          primary: primaryColor || \"#7c3aed\",\n          secondary: secondaryColor || \"#4f46e5\",\n          highlight: \"#c084fc\",\n          darkBody: \"#020106\",\n        };\n    }\n  }, [variant, bgColor, primaryColor, secondaryColor]);\n\n  // Pointer state & physics tracking\n  const mouseRef = React.useRef<{ x: number; y: number; isOver: boolean }>({\n    x: -9999,\n    y: -9999,\n    isOver: false,\n  });\n\n  const smoothPosRef = React.useRef<{\n    x: number;\n    y: number;\n    vx: number;\n    vy: number;\n    glowEnergy: number;\n  }>({\n    x: 0,\n    y: 0,\n    vx: 0,\n    vy: 0,\n    glowEnergy: 1.0,\n  });\n\n  const shockwaveRef = React.useRef<number>(0);\n\n  // Generate procedural noise tile\n  React.useEffect(() => {\n    const size = 320;\n    const noiseCanvas = document.createElement(\"canvas\");\n    noiseCanvas.width = size;\n    noiseCanvas.height = size;\n    const nctx = noiseCanvas.getContext(\"2d\");\n    if (!nctx) return;\n\n    const imgData = nctx.createImageData(size, size);\n    const data = imgData.data;\n\n    // Multi-frequency noise synthesis\n    const freq = Math.max(0.4, roughness);\n    for (let i = 0; i < data.length; i += 4) {\n      const px = (i / 4) % size;\n      const py = Math.floor(i / 4 / size);\n\n      // Pseudo-random high-frequency white noise + gradient modulation\n      const r1 = Math.random();\n      const r2 = Math.sin(px * 0.12 * freq) * Math.cos(py * 0.12 * freq) * 0.5 + 0.5;\n      const combined = r1 * 0.75 + r2 * 0.25;\n\n      const val = Math.floor(combined * 255);\n      data[i] = val;\n      data[i + 1] = val;\n      data[i + 2] = val;\n      data[i + 3] = 255;\n    }\n\n    nctx.putImageData(imgData, 0, 0);\n    noiseCanvasRef.current = noiseCanvas;\n  }, [roughness]);\n\n  // Main Render Loop\n  React.useEffect(() => {\n    const canvas = canvasRef.current;\n    const container = containerRef.current;\n    if (!canvas || !container) return;\n    const ctx = canvas.getContext(\"2d\");\n    if (!ctx) return;\n\n    let animId: number;\n    let time = 0;\n    let lastStamp = performance.now();\n\n    const dpr = typeof window !== \"undefined\" ? window.devicePixelRatio || 1 : 1;\n\n    const resize = () => {\n      const rect = container.getBoundingClientRect();\n      const w = Math.max(300, Math.floor(rect.width));\n      const h = Math.max(200, Math.floor(rect.height));\n\n      canvas.width = Math.round(w * dpr);\n      canvas.height = Math.round(h * dpr);\n      canvas.style.width = `${w}px`;\n      canvas.style.height = `${h}px`;\n\n      if (smoothPosRef.current.x === 0 && smoothPosRef.current.y === 0) {\n        smoothPosRef.current.x = w * 0.5;\n        smoothPosRef.current.y = h * 0.72;\n      }\n    };\n\n    resize();\n    const ro = new ResizeObserver(resize);\n    ro.observe(container);\n\n    const render = (timestamp: number) => {\n      const dt = Math.min((timestamp - lastStamp) * 0.001, 0.1);\n      lastStamp = timestamp;\n      time += dt * speed;\n\n      const W = canvas.width;\n      const H = canvas.height;\n      const w = W / dpr;\n      const h = H / dpr;\n\n      ctx.save();\n      ctx.scale(dpr, dpr);\n      ctx.clearRect(0, 0, w, h);\n\n      // Shockwave decay\n      if (shockwaveRef.current > 0) {\n        shockwaveRef.current = Math.max(0, shockwaveRef.current - dt * 2.5);\n      }\n\n      // Physics momentum & smoothing\n      const isOver = interactive && mouseRef.current.isOver;\n      let targetX = w * 0.5;\n      let targetY = h * 0.74;\n\n      if (isOver) {\n        targetX = mouseRef.current.x;\n        targetY = mouseRef.current.y;\n      } else {\n        // Natural hypnotic drift\n        targetX = w * 0.5 + Math.sin(time * 0.5 * (drift || 0.35)) * (w * 0.16);\n        targetY = h * 0.72 + Math.cos(time * 0.4 * (drift || 0.35)) * (h * 0.06);\n      }\n\n      const cur = smoothPosRef.current;\n      const springK = isOver ? 0.08 : 0.035;\n      const damping = 0.86;\n\n      const ax = (targetX - cur.x) * springK;\n      const ay = (targetY - cur.y) * springK;\n\n      cur.vx = (cur.vx + ax) * damping;\n      cur.vy = (cur.vy + ay) * damping;\n      cur.x += cur.vx;\n      cur.y += cur.vy;\n\n      const targetEnergy = isOver ? 1.35 : 1.0;\n      cur.glowEnergy += (targetEnergy - cur.glowEnergy) * 0.06;\n\n      const lx = cur.x;\n      const ly = cur.y;\n      const effIntensity = glowIntensity * cur.glowEnergy * (1.0 + shockwaveRef.current * 0.6);\n\n      /* ============================================================ */\n      /* 1. LAYER 1: BASE MATTE BACKGROUND                            */\n      /* ============================================================ */\n      ctx.fillStyle = theme.bg;\n      ctx.fillRect(0, 0, w, h);\n\n      /* ============================================================ */\n      /* 2. LAYER 2: CHROMATIC RADIANT BACKLIGHT GLOW                 */\n      /* ============================================================ */\n      // Base glow radius modulated by spread prop\n      const glowR = Math.max(w, h) * 0.65 * glowSpread;\n\n      // Primary radiant core gradient\n      const coreGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, glowR);\n      coreGrad.addColorStop(0.0, `${theme.primary}e6`);\n      coreGrad.addColorStop(0.2, `${theme.primary}aa`);\n      coreGrad.addColorStop(0.5, `${theme.secondary}55`);\n      coreGrad.addColorStop(0.8, `${theme.secondary}15`);\n      coreGrad.addColorStop(1.0, \"rgba(0, 0, 0, 0)\");\n\n      ctx.save();\n      ctx.globalAlpha = Math.min(1, effIntensity * 0.95);\n      ctx.fillStyle = coreGrad;\n      ctx.fillRect(0, 0, w, h);\n      ctx.restore();\n\n      // Secondary wide ambient aura along lower base\n      const auraGrad = ctx.createLinearGradient(0, h * 0.35, 0, h);\n      auraGrad.addColorStop(0.0, \"rgba(0, 0, 0, 0)\");\n      auraGrad.addColorStop(0.6, `${theme.secondary}30`);\n      auraGrad.addColorStop(1.0, `${theme.primary}66`);\n\n      ctx.save();\n      ctx.globalAlpha = Math.min(1, effIntensity * 0.85);\n      ctx.fillStyle = auraGrad;\n      ctx.fillRect(0, 0, w, h);\n      ctx.restore();\n\n      /* ============================================================ */\n      /* 3. LAYER 3: DARK SILHOUETTE HORIZON / ECLIPSE DOME           */\n      /* ============================================================ */\n      // Calculate horizon curve control points\n      // In reference image: upper portion is a large dark body dipping downward into the purple glow\n      const baseApexY = inverted ? h * 0.35 : h * 0.68;\n      const curveDepth = curvature * (h * 0.38);\n\n      // Lateral shift influenced by light tracking\n      const apexX = w * 0.5 + (lx - w * 0.5) * 0.35;\n      const apexY = baseApexY + (ly - h * 0.7) * 0.25 + Math.sin(time * 0.8) * 8 + (inverted ? -curveDepth : curveDepth);\n\n      const leftY = inverted ? h * 0.75 : h * 0.22;\n      const rightY = inverted ? h * 0.75 : h * 0.22;\n\n      ctx.save();\n      ctx.beginPath();\n\n      if (!inverted) {\n        // Curve: Top edges curve downward in center, covering the top half\n        ctx.moveTo(0, 0);\n        ctx.lineTo(0, leftY);\n        ctx.bezierCurveTo(\n          w * 0.25, leftY + curveDepth * 0.8,\n          w * 0.38, apexY,\n          apexX, apexY\n        );\n        ctx.bezierCurveTo(\n          w * 0.62, apexY,\n          w * 0.75, rightY + curveDepth * 0.8,\n          w, rightY\n        );\n        ctx.lineTo(w, 0);\n        ctx.closePath();\n      } else {\n        // Inverted: Bottom upward dome\n        ctx.moveTo(0, h);\n        ctx.lineTo(0, leftY);\n        ctx.bezierCurveTo(\n          w * 0.25, leftY - curveDepth * 0.8,\n          w * 0.38, apexY,\n          apexX, apexY\n        );\n        ctx.bezierCurveTo(\n          w * 0.62, apexY,\n          w * 0.75, rightY - curveDepth * 0.8,\n          w, rightY\n        );\n        ctx.lineTo(w, h);\n        ctx.closePath();\n      }\n\n      // Fill dark occluding body with rich velvety charcoal-black gradient\n      const bodyGrad = ctx.createLinearGradient(0, 0, 0, h);\n      bodyGrad.addColorStop(0.0, theme.darkBody);\n      bodyGrad.addColorStop(0.7, `${theme.darkBody}f5`);\n      bodyGrad.addColorStop(1.0, theme.darkBody);\n\n      ctx.fillStyle = bodyGrad;\n      ctx.fill();\n\n      // Shadow depth & ambient occlusion cast onto the horizon rim\n      ctx.restore();\n\n      /* ============================================================ */\n      /* 4. LAYER 4: HORIZON RIM ILLUMINATION (EDGE GLOW)             */\n      /* ============================================================ */\n      ctx.save();\n      ctx.beginPath();\n      ctx.moveTo(0, leftY);\n      if (!inverted) {\n        ctx.bezierCurveTo(\n          w * 0.25, leftY + curveDepth * 0.8,\n          w * 0.38, apexY,\n          apexX, apexY\n        );\n        ctx.bezierCurveTo(\n          w * 0.62, apexY,\n          w * 0.75, rightY + curveDepth * 0.8,\n          w, rightY\n        );\n      } else {\n        ctx.bezierCurveTo(\n          w * 0.25, leftY - curveDepth * 0.8,\n          w * 0.38, apexY,\n          apexX, apexY\n        );\n        ctx.bezierCurveTo(\n          w * 0.62, apexY,\n          w * 0.75, rightY - curveDepth * 0.8,\n          w, rightY\n        );\n      }\n\n      // Soft rim glow stroke\n      ctx.strokeStyle = `${theme.highlight}40`;\n      ctx.lineWidth = 4.5;\n      ctx.lineCap = \"round\";\n      ctx.stroke();\n\n      // Razor sharp central edge\n      ctx.strokeStyle = `${theme.highlight}99`;\n      ctx.lineWidth = 1.25;\n      ctx.stroke();\n      ctx.restore();\n\n      /* ============================================================ */\n      /* 5. LAYER 5: TACTILE ANALOG FILM GRAIN & PROCEDURAL NOISE    */\n      /* ============================================================ */\n      const noise = noiseCanvasRef.current;\n      if (noise && grain > 0) {\n        ctx.save();\n        // Multi-pass noise blending for rough texture without digital banding\n        const pat = ctx.createPattern(noise, \"repeat\");\n        if (pat) {\n          // Pass 1: Overlay for midtone tactile roughness\n          ctx.globalCompositeOperation = \"overlay\";\n          ctx.globalAlpha = Math.min(1, grain * 1.6);\n          ctx.fillStyle = pat;\n          ctx.fillRect(0, 0, w, h);\n\n          // Pass 2: Screen for luminous micro-grain specks in the glow\n          ctx.globalCompositeOperation = \"screen\";\n          ctx.globalAlpha = Math.min(1, grain * 0.75);\n          ctx.fillStyle = pat;\n          ctx.fillRect(0, 0, w, h);\n        }\n        ctx.restore();\n      }\n\n      /* ============================================================ */\n      /* 6. LAYER 6: CINEMATIC RADIAL VIGNETTE                         */\n      /* ============================================================ */\n      const vig = ctx.createRadialGradient(\n        w * 0.5,\n        h * 0.5,\n        Math.min(w, h) * 0.28,\n        w * 0.5,\n        h * 0.5,\n        Math.max(w, h) * 0.78\n      );\n      vig.addColorStop(0.0, \"rgba(0, 0, 0, 0)\");\n      vig.addColorStop(0.7, \"rgba(0, 0, 0, 0.42)\");\n      vig.addColorStop(1.0, \"rgba(0, 0, 0, 0.88)\");\n\n      ctx.fillStyle = vig;\n      ctx.fillRect(0, 0, w, h);\n\n      ctx.restore();\n      animId = requestAnimationFrame(render);\n    };\n\n    animId = requestAnimationFrame(render);\n\n    return () => {\n      cancelAnimationFrame(animId);\n      ro.disconnect();\n    };\n  }, [\n    theme,\n    grain,\n    roughness,\n    glowIntensity,\n    curvature,\n    glowSpread,\n    speed,\n    drift,\n    interactive,\n    inverted,\n  ]);\n\n  // Mouse tracking handlers\n  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {\n    const canvas = canvasRef.current;\n    if (!canvas) return;\n    const rect = canvas.getBoundingClientRect();\n    mouseRef.current = {\n      x: e.clientX - rect.left,\n      y: e.clientY - rect.top,\n      isOver: true,\n    };\n  };\n\n  const handleMouseEnter = () => {\n    mouseRef.current.isOver = true;\n  };\n\n  const handleMouseLeave = () => {\n    mouseRef.current.isOver = false;\n  };\n\n  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {\n    shockwaveRef.current = 1.0;\n    props.onClick?.(e);\n  };\n\n  return (\n    <div\n      ref={containerRef}\n      className={cn(\"relative w-full h-full overflow-hidden select-none bg-black\", className)}\n      style={{ background: theme.bg, ...style }}\n      onMouseMove={handleMouseMove}\n      onMouseEnter={handleMouseEnter}\n      onMouseLeave={handleMouseLeave}\n      onClick={handleClick}\n      {...props}\n    >\n      <canvas\n        ref={canvasRef}\n        className=\"absolute inset-0 w-full h-full pointer-events-none z-0 block\"\n        aria-hidden=\"true\"\n      />\n      {children && (\n        <div className=\"relative z-10 w-full h-full pointer-events-auto\">\n          {children}\n        </div>\n      )}\n    </div>\n  );\n}\n\n// Aliases for convenience\nexport const GrainyGlowShader = GrainyHorizonShader;\nexport const GrainyAuraBg = GrainyHorizonShader;\n"
      }
    ]
  }
};
