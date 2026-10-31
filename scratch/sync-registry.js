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
  checkbox: [
    { name: "checked", type: "boolean", defaultValue: "false", description: "Controlled checked state." },
    { name: "defaultChecked", type: "boolean", defaultValue: "false", description: "Default initial checked state." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback fired when checked state changes." },
    { name: "indeterminate", type: "boolean", defaultValue: "false", description: "Displays an indeterminate dash state." },
    { name: "variant", type: "'default' | 'motion' | 'lineart' | 'strike' | 'card' | 'chip'", defaultValue: "'default'", description: "Visual and interaction animation aesthetic." },
    { name: "size", type: "'sm' | 'default' | 'lg'", defaultValue: "'default'", description: "Dimensions of checkbox element." },
    { name: "label", type: "React.ReactNode", description: "Primary text label next to the checkbox." },
    { name: "description", type: "React.ReactNode", description: "Secondary helper context below the label." },
    { name: "badge", type: "string", description: "Optional metadata badge tag." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and reduces opacity." },
    { name: "error", type: "string", description: "Validation error message that tints border red." }
  ],
  "search-bar": [
    { name: "placeholder", type: "string", defaultValue: "'Search components...'", description: "Placeholder text rendered inside the search input." },
    { name: "value", type: "string", description: "Controlled search query string." },
    { name: "defaultValue", type: "string", defaultValue: "''", description: "Initial search query in uncontrolled mode." },
    { name: "onChange", type: "(value: string) => void", description: "Callback triggered when search query text changes." },
    { name: "onSearch", type: "(query: string) => void", description: "Callback fired when user submits search or chooses a result." },
    { name: "items", type: "SearchBarItem[]", description: "Array of searchable items with id, title, description, and category." },
    { name: "onSelectResult", type: "(item: SearchBarItem) => void", description: "Callback invoked when a result item is selected." },
    { name: "expanded", type: "boolean", description: "Controlled boolean flag for expanded state." },
    { name: "defaultExpanded", type: "boolean", defaultValue: "false", description: "Whether the search panel begins in the expanded state." },
    { name: "onExpandedChange", type: "(expanded: boolean) => void", description: "Callback fired when expanding or collapsing." },
    { name: "variant", type: "'downward-expand' | 'circle-popout'", defaultValue: "'downward-expand'", description: "Visual presentation variant: 'downward-expand' (anchored pill with downward results expansion) or 'circle-popout' (circular search orb with pop-out pill extension)." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and reduces opacity." },
    { name: "showShortcut", type: "boolean", defaultValue: "true", description: "Whether to display the keyboard shortcut hint (Cmd+K)." }
  ],
  "minimalist-login": [
    { name: "variant", type: "'sharp-edges' | 'rounded-corners'", defaultValue: "'sharp-edges'", description: "Visual geometry variant: 'sharp-edges' for 0px corners or 'rounded-corners' for curved frames." },
    { name: "borderRadius", type: "number", defaultValue: "20", description: "Radius in pixels applied to container cards and elements when in rounded-corners variant." },
    { name: "sphereMotion", type: "boolean", defaultValue: "true", description: "Enables continuous 3D rotation and orbital physics on the particle sphere." },
    { name: "rotationSpeed", type: "number", defaultValue: "1", description: "Rotation velocity multiplier for the 3D particle sphere." },
    { name: "interactiveDots", type: "boolean", defaultValue: "true", description: "Enables interactive cursor tracking with dot bulge and radar rings." },
    { name: "portalTitle", type: "string", defaultValue: "'// ACCESS PORTAL'", description: "Technical tag displayed in the top bar of the spatial portal card." },
    { name: "portalSubtitle", type: "string", defaultValue: "'SPATIAL LOGIN'", description: "Sub-branding text adjacent to the animated audio equalizer." },
    { name: "welcomeTitle", type: "string", defaultValue: "'WELCOME BACK'", description: "Uppercase subtitle on the sign-in form card." },
    { name: "title", type: "string", defaultValue: "'Sign in'", description: "Primary heading on the sign-in form card." },
    { name: "emailLabel", type: "string", defaultValue: "'EMAIL'", description: "Field label for the email address input." },
    { name: "passwordLabel", type: "string", defaultValue: "'PASSWORD'", description: "Field label for the password input." },
    { name: "submitLabel", type: "string", defaultValue: "'Sign in'", description: "Text content for the high-contrast sign-in button." },
    { name: "forgotPasswordLabel", type: "string", defaultValue: "'Forgot password?'", description: "Text for the password recovery link." },
    { name: "createAccountLabel", type: "string", defaultValue: "'Create account'", description: "Text for the registration action link." },
    { name: "onSubmit", type: "(data: { email: string; password: string }) => void", description: "Callback invoked upon login form submission." },
    { name: "onSignUp", type: "(data: { name: string; email: string; password: string }) => void", description: "Callback invoked upon sign-up form submission." }
  ],
  "horizon-login": [
    { name: "defaultTab", type: "'login' | 'signup'", defaultValue: "'login'", description: "Active initial tab mode." },
    { name: "horizonSpeed", type: "number", defaultValue: "1", description: "Animation time speed multiplier for the atmospheric purple horizon." },
    { name: "glowIntensity", type: "number", defaultValue: "1", description: "Brightness and volumetric intensity scale of the horizon bands." },
    { name: "grain", type: "boolean", defaultValue: "true", description: "Enables subtle monochromatic film grain overlay to eliminate gradient banding." },
    { name: "onLogin", type: "(data: { email: string; password: string }) => Promise<void> | void", description: "Callback invoked on login form submission." },
    { name: "onSignUp", type: "(data: { name: string; email: string; password: string }) => Promise<void> | void", description: "Callback invoked on registration form submission." },
    { name: "onForgotPassword", type: "(email: string) => Promise<void> | void", description: "Callback invoked on password recovery link submission." }
  ],
  "blueprint-login": [
    { name: "defaultTab", type: "'login' | 'signup'", defaultValue: "'login'", description: "Active initial tab state." },
    { name: "expandRatio", type: "number", defaultValue: "1.42", description: "Expansion scale multiplier when a cylinder is hovered." },
    { name: "neighborWave", type: "boolean", defaultValue: "true", description: "Whether adjacent cylinders expand in a gentle mechanical wave." },
    { name: "rotationY", type: "number", defaultValue: "-26", description: "Y-axis rotation angle of the mechanical model in degrees." },
    { name: "rotationX", type: "number", defaultValue: "3", description: "X-axis pitch rotation angle of the mechanical model in degrees." },
    { name: "onLogin", type: "(data: { email: string; password: string }) => Promise<void> | void", description: "Callback invoked upon login form submission." },
    { name: "onSignUp", type: "(data: { name: string; email: string; password: string }) => Promise<void> | void", description: "Callback invoked upon registration form submission." },
    { name: "onForgotPassword", type: "(email: string) => Promise<void> | void", description: "Callback invoked upon password reset link submission." }
  ],
  "prismatic-slats-bg": [
    { name: "preset", type: "'Violet' | 'Cyan' | 'Sunset' | 'Emerald'", defaultValue: "'Violet'", description: "Color and lighting preset treatment." },
    { name: "background", type: "string", defaultValue: "'#050505'", description: "Base dark background CSS color." },
    { name: "primary", type: "string", defaultValue: "'#5227FF'", description: "Primary violet beam color hex." },
    { name: "secondary", type: "string", defaultValue: "'#FF9FFC'", description: "Secondary magenta chromatic fringe hex." },
    { name: "angle", type: "number", defaultValue: "28", description: "Angle in degrees of the diagonal fluted slats." },
    { name: "flutes", type: "number", defaultValue: "8", description: "Number of parallel fluted slats." },
    { name: "refraction", type: "number", defaultValue: "4.0", description: "Refraction dispersion strength across flutes." },
    { name: "aberration", type: "number", defaultValue: "0.61", description: "Chromatic aberration spatial separation." },
    { name: "softness", type: "number", defaultValue: "0.50", description: "Falloff softness of the refracted light beam." },
    { name: "wave", type: "number", defaultValue: "0.06", description: "Wave undulation amplitude." },
    { name: "waveFrequency", type: "number", defaultValue: "1.5", description: "Frequency of wave undulation." },
    { name: "drift", type: "number", defaultValue: "0.00", description: "Autonomous light sweep drift speed." },
    { name: "highlight", type: "number", defaultValue: "0.12", description: "Specular bevel edge highlight intensity." },
    { name: "highlightSoftness", type: "number", defaultValue: "0.30", description: "Softness of specular rim highlights." },
    { name: "lightAngle", type: "number", defaultValue: "-90", description: "Angular direction of the light beam in degrees." },
    { name: "radius", type: "number", defaultValue: "6.5", description: "Radius scale multiplier of the light field." },
    { name: "momentum", type: "number", defaultValue: "13", description: "Physics inertia of cursor light tracking." },
    { name: "swirl", type: "number", defaultValue: "0", description: "Swirl distortion factor." },
    { name: "intensity", type: "number", defaultValue: "1.00", description: "Overall illumination intensity." },
    { name: "trail", type: "number", defaultValue: "1.00", description: "Trailing persistence of the light beam." },
    { name: "texture", type: "number", defaultValue: "0.60", description: "Surface texture roughness." },
    { name: "grain", type: "number", defaultValue: "0.050", description: "Film grain opacity overlay." },
    { name: "speed", type: "number", defaultValue: "1.00", description: "Animation time progression speed." },
    { name: "interactive", type: "boolean", defaultValue: "true", description: "Whether slats react to pointer movement." },
    { name: "paused", type: "boolean", defaultValue: "false", description: "Pauses all time-based animations." },
    { name: "autoplay", type: "boolean", defaultValue: "false", description: "Enables continuous automatic light sweep across slats." }
  ],
  "notched-navbar": [
    { name: "variant", type: "'default' | 'down' | 'bottom' | 'left' | 'right' | 'compact' | 'deep-notch' | 'dark-slate'", defaultValue: "'default'", description: "Visual variant and notch position preset (default/top, down, left, right)." },
    { name: "position", type: "'top' | 'down' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: "Explicit placement of the notch cutout along the frame edge." },
    { name: "notchWidth", type: "number", defaultValue: "540", description: "Width or span in pixels of the recessed notch opening (540 horizontal, 280 vertical)." },
    { name: "notchHeight", type: "number", defaultValue: "42", description: "Vertical depth or inset in pixels of the notch cutout (42 horizontal, 54 vertical)." },
    { name: "filletWidth", type: "number", defaultValue: "24", description: "Span of the continuous cubic bezier S-curve fillet." },
    { name: "borderRadius", type: "number", defaultValue: "14", description: "Corner radius of the framed canvas." },
    { name: "whiteBoxPadding", type: "number", defaultValue: "8", description: "Inset padding around the dark frame exposing the backdrop." },
    { name: "frameBg", type: "string", defaultValue: "'#222326'", description: "Background color of the dark framed canvas." },
    { name: "backdropBg", type: "string", defaultValue: "'#ffffff'", description: "Background color of the container backdrop visible in the notch." },
    { name: "links", type: "NotchedNavbarLink[]", description: "Navigation links rendered in the notch cutout area." },
    { name: "activeLink", type: "string", description: "Controlled active tab identifier." },
    { name: "onLinkClick", type: "(id: string, link: NotchedNavbarLink) => void", description: "Callback triggered when a tab is selected." },
    { name: "children", type: "React.ReactNode", description: "Content rendered inside the dark canvas below/beside the notch." }
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
    { name: "variant", type: "'default' | 'slide' | 'liquid-pill' | 'island' | 'minimal'", defaultValue: "'default'", description: "Visual navigation architecture and indicator animation style." },
    { name: "pillStyle", type: "'liquid-glow' | 'solid' | 'glass' | 'accent'", defaultValue: "'liquid-glow'", description: "Color and glass treatment for liquid-pill and island variants." },
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
    { name: "variant", type: "'scrollable-categories' | 'default'", defaultValue: "'scrollable-categories'", description: "Controls whether categories scroll independently while top nav stays fixed ('scrollable-categories') or entire sidebar scrolls together ('default')." },
    { name: "collapsed", type: "boolean", defaultValue: "false", description: "Controls whether the sidebar is collapsed (64px) or expanded (256px)." },
    { name: "onCollapsedChange", type: "(collapsed: boolean) => void", defaultValue: "undefined", description: "Callback fired when the user toggles the sidebar (also supports ⌘B)." },
    { name: "mobileOpen", type: "boolean", defaultValue: "false", description: "Controls visibility of the mobile overlay navigation drawer." },
    { name: "onMobileOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback invoked to dismiss the mobile drawer." },
    { name: "activeComponent", type: "string", defaultValue: "undefined", description: "Name of the component currently active in documentation." },
    { name: "activeCategory", type: "string", defaultValue: "undefined", description: "Category currently active or filtered." },
    { name: "theme", type: "'dark' | 'light' | 'system'", defaultValue: "'dark'", description: "Controls logo and icon theme rendering." }
  ],
  "expanding-card": [
    { name: "title", type: "string", defaultValue: "'Components'", description: "Header title displayed at the bottom of the card." },
    { name: "subtitle", type: "string", defaultValue: "'Hover to reveal full showcase view'", description: "Secondary description text." },
    { name: "badge", type: "string", defaultValue: "undefined", description: "Optional pill badge in the card title." },
    { name: "forcedHover", type: "boolean", defaultValue: "false", description: "Forces the expanded full 4-card state without requiring user cursor hover." },
    { name: "images", type: "ExpandingCardImage[]", defaultValue: "DEFAULT_IMAGES", description: "Array of 4 image objects with src, alt, title, and tags." }
  ],
  "blurred-carousel": [
    { name: "title", type: "string", defaultValue: "'Featured Templates'", description: "Section title displayed above the carousel." },
    { name: "subtitle", type: "string", defaultValue: "undefined", description: "Optional subtitle description." },
    { name: "autoPlay", type: "boolean", defaultValue: "false", description: "Enables automated periodic sliding between cards." },
    { name: "intervalMs", type: "number", defaultValue: "4500", description: "Interval in milliseconds between automated slides." },
    { name: "items", type: "CarouselItem[]", defaultValue: "DEFAULT_CAROUSEL_ITEMS", description: "List of slide cards containing cover image, title, and stats." }
  ],
  "concave-carousel": [
    { name: "preset", type: "'Rotunda' | 'Tunnel' | 'Flat' | 'Panoramic' | 'Convex'", defaultValue: "'Rotunda'", description: "Geometry preset shaping the 3D curve (including forward-bending Convex)." },
    { name: "autoplay", type: "'Drift' | 'None' | 'Step'", defaultValue: "'Drift'", description: "Autonomous motion behavior: continuous fluid drift or timed discrete stepping." },
    { name: "background", type: "string", defaultValue: "'#0A0A0A'", description: "Background canvas CSS color." },
    { name: "aspect", type: "number", defaultValue: "1.25", description: "Aspect ratio width/height of the carousel cards." },
    { name: "size", type: "number", defaultValue: "0.46", description: "Scale multiplier factor governing card dimensions." },
    { name: "curvature", type: "number", defaultValue: "0.72", description: "Depth of the cylindrical curve arc (positive for concave, negative for forward-bending convex)." },
    { name: "distance", type: "number", defaultValue: "4.0", description: "3D camera perspective distance factor." },
    { name: "tilt", type: "number", defaultValue: "0.0", description: "X-axis angular pitch tilt in degrees." },
    { name: "gap", type: "number", defaultValue: "16", description: "Spacing in pixels between adjacent cards." },
    { name: "radius", type: "number", defaultValue: "14", description: "Border radius in pixels applied to cards." },
    { name: "reflection", type: "number", defaultValue: "0.06", description: "Opacity factor of the floor mirror reflection." },
    { name: "dim", type: "number", defaultValue: "0.35", description: "Distance falloff opacity factor for peripheral cards." },
    { name: "speed", type: "number", defaultValue: "0.16", description: "Continuous drift speed multiplier." },
    { name: "interval", type: "number", defaultValue: "4.0", description: "Step interval in seconds when autoplay is set to Step." },
    { name: "inertia", type: "number", defaultValue: "0.50", description: "Physics momentum and friction dampening." },
    { name: "snap", type: "boolean", defaultValue: "false", description: "Enables magnetic snapping to nearest card." },
    { name: "wheel", type: "boolean", defaultValue: "true", description: "Enables trackpad and mouse wheel scrolling along the 3D arc." },
    { name: "draggable", type: "boolean", defaultValue: "true", description: "Enables direct touch and pointer dragging." },
    { name: "pauseOnHover", type: "boolean", defaultValue: "true", description: "Pauses autoplay drift while pointer is over carousel." },
    { name: "captions", type: "boolean", defaultValue: "true", description: "Displays title and subtitle captions under active center card." },
    { name: "controls", type: "boolean", defaultValue: "true", description: "Displays minimal pagination controls." },
    { name: "items", type: "ConcaveCarouselItem[]", defaultValue: "DEFAULT_CONCAVE_ITEMS", description: "Array of items with title, subtitle, and gradient or image." }
  ],
  "content-slider": [
    { name: "title", type: "string", defaultValue: "'On this page'", description: "Table of contents header label." },
    { name: "activeId", type: "string", defaultValue: "undefined", description: "Controlled active section identifier." },
    { name: "rubberBandEffect", type: "boolean", defaultValue: "true", description: "Enables cubic-bezier rubber band overshoot animation on sliders and text." },
    { name: "items", type: "TOCItem[]", defaultValue: "DEFAULT_TOC_ITEMS", description: "Hierarchical array of sections and sub-sections." },
    { name: "onSelect", type: "(id: string) => void", defaultValue: "undefined", description: "Callback triggered when a section is clicked." }
  ],
  footer: [
    { name: "brandText", type: "string", defaultValue: "'kilo/ui'", description: "Large brand signature typography overflowing at the bottom." },
    { name: "tagline", type: "string", defaultValue: "undefined", description: "Sub-headline description positioned under the brand badge." },
    { name: "blurBlend", type: "boolean", defaultValue: "true", description: "Controls whether the soft frosted-glass gradient blur blend is active at the bottom." },
    { name: "blurHeight", type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: "Height extent of the feathered bottom blur gradient." },
    { name: "showNewsletter", type: "boolean", defaultValue: "true", description: "Renders the interactive email subscription form." },
    { name: "columns", type: "FooterColumn[]", defaultValue: "DEFAULT_COLUMNS", description: "Hierarchical columns of navigation links." }
  ],
  "scroll-marquee": [
    { name: "text", type: "string", defaultValue: "undefined", description: "Primary continuous headline text." },
    { name: "textSecondary", type: "string", defaultValue: "undefined", description: "Secondary text used for dual-scroll variant." },
    { name: "variant", type: "'scroll-left' | 'scroll-right' | 'dual-scroll' | 'velocity-skew'", defaultValue: "'scroll-left'", description: "Directional and kinetic deformation style on scroll." },
    { name: "textColor", type: "string", defaultValue: "undefined", description: "Custom CSS text color or hex code for the marquee typography." },
    { name: "blurColor", type: "string", defaultValue: "'mask'", description: "Color of the edge gradient fade, or 'mask' for background-matching transparent fade." },
    { name: "speed", type: "number", defaultValue: "1.2", description: "Scroll multiplier factor governing translation speed." },
    { name: "baseVelocity", type: "number", defaultValue: "0.4", description: "Idle continuous cruise speed when not scrolling." },
    { name: "skewIntensity", type: "number", defaultValue: "6", description: "Maximum angular skew deformation during fast scroll." },
    { name: "outlineText", type: "boolean", defaultValue: "false", description: "Renders outlined stroke typography instead of solid fill." },
    { name: "interactiveWheel", type: "boolean", defaultValue: "true", description: "Enables direct scroll wheel interaction over the marquee container." }
  ],
  "directional-marquee": [
    { name: "track1Text", type: "string", defaultValue: "undefined", description: "Text content for top continuous track." },
    { name: "track2Text", type: "string", defaultValue: "undefined", description: "Text content for bottom continuous track." },
    { name: "manualDirection", type: "'up' | 'down' | 'auto'", defaultValue: "'auto'", description: "Direction override: down (T1 ➔ / T2 ⬅) or up (T1 ⬅ / T2 ➔), or auto scroll detection." },
    { name: "textColor", type: "string", defaultValue: "undefined", description: "Custom CSS text color or hex code for the marquee typography." },
    { name: "blurColor", type: "string", defaultValue: "'mask'", description: "Color of the edge gradient fade, or 'mask' for background-matching transparent fade." },
    { name: "baseSpeed", type: "number", defaultValue: "1.2", description: "Base continuous revolving velocity." },
    { name: "scrollMultiplier", type: "number", defaultValue: "2.4", description: "Velocity acceleration factor during page scroll." },
    { name: "showHud", type: "boolean", defaultValue: "true", description: "Displays directional compass HUD with live scroll indicator." },
    { name: "interactiveWheel", type: "boolean", defaultValue: "true", description: "Enables direct scroll wheel interaction over the marquee container." }
  ],
  "kinetic-text": [
    { name: "text", type: "string", defaultValue: "'KILO / MOTION UI'", description: "The string content rendered with kinetic physics." },
    { name: "variant", type: "'rubber-band' | 'wave-ripple' | 'scramble-decode' | 'magnetic-tilt'", defaultValue: "'rubber-band'", description: "Character motion physics style." },
    { name: "as", type: "'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'", defaultValue: "'div'", description: "Semantic HTML tag used for text wrapper." }
  ],
  "grainy-grid-shader": [
    { name: "variant", type: "'rough-matte' | 'tactile-kraft' | 'cyber-mesh'", defaultValue: "'rough-matte'", description: "Visual material style and color palette." },
    { name: "grain", type: "number", defaultValue: "0.22", description: "Procedural film grain and noise intensity (0.0 to 0.6)." },
    { name: "roughness", type: "number", defaultValue: "1.0", description: "Tactile noise grit scale and frequency." },
    { name: "columns", type: "number", defaultValue: "6", description: "Number of 2x2 grid modules along horizontal axis." },
    { name: "rows", type: "number", defaultValue: "4", description: "Number of 2x2 grid modules along vertical axis." },
    { name: "cellSize", type: "number", defaultValue: "52", description: "Dimensions in pixels of each 2x2 morphing unit." },
    { name: "speed", type: "number", defaultValue: "1.0", description: "Wave pulse and ripple animation velocity multiplier." },
    { name: "influenceRadius", type: "number", defaultValue: "140", description: "Cursor interaction reach in pixels." },
    { name: "autoWave", type: "boolean", defaultValue: "true", description: "Enables continuous ambient traveling wave illumination." },
    { name: "interactive", type: "boolean", defaultValue: "true", description: "Enables cursor tracking and click shockwave ripples." },
    { name: "children", type: "React.ReactNode", description: "Optional content rendered directly on the shader canvas." }
  ],
  "grainy-horizon-shader": [
    { name: "variant", type: "'ultraviolet' | 'aurora-green' | 'solar-amber' | 'cyber-cyan' | 'monochrome'", defaultValue: "'ultraviolet'", description: "Curated ambient color palette and radiant chromatic glow." },
    { name: "color", type: "string", defaultValue: "undefined", description: "Custom primary color hex overriding the preset variant." },
    { name: "secondaryColor", type: "string", defaultValue: "undefined", description: "Custom secondary / cooling aura tint color hex." },
    { name: "grain", type: "number", defaultValue: "0", description: "Procedural noise & analog film grain density (0 for smooth shader)." },
    { name: "glowIntensity", type: "number", defaultValue: "1.0", description: "Brightness multiplier of the radiant horizon backlighting." },
    { name: "glowSpread", type: "number", defaultValue: "1.25", description: "Vertical reach and spread of the radiant backlight." },
    { name: "liquidCursor", type: "boolean", defaultValue: "true", description: "Enables interactive WebGL2 Navier-Stokes fluid physics cursor matching the aura color." },
    { name: "cursorIntensity", type: "number", defaultValue: "0.6", description: "Luminance intensity of the embedded liquid cursor." },
    { name: "cursorTrailWidth", type: "number", defaultValue: "3", description: "Stroke width in pixels of the fluid cursor trail." },
    { name: "children", type: "React.ReactNode", description: "Optional content rendered directly on the shader canvas." }
  ],
  "firefly-cursor": [
    { name: "preset", type: "'comet' | 'firefly' | 'nebula' | 'plasma' | 'aurora'", defaultValue: "'comet'", description: "Curated fluid physics and color preset." },
    { name: "color", type: "string", defaultValue: "'#5f8bff'", description: "Primary fluid dye color hex." },
    { name: "secondaryColor", type: "string", defaultValue: "undefined", description: "Secondary cooling/halo dye color hex." },
    { name: "intensity", type: "number", defaultValue: "0.6", description: "Shading luminance intensity multiplier." },
    { name: "trailWidth", type: "number", defaultValue: "3", description: "Fluid emitter trail thickness in pixels." },
    { name: "linger", type: "number", defaultValue: "1.4", description: "Dissipation duration factor in seconds." },
    { name: "glow", type: "number", defaultValue: "1.2", description: "Multi-stage bloom glow radiance multiplier." },
    { name: "hotspot", type: "number", defaultValue: "0.8", description: "Core specular heat concentration." },
    { name: "followSpeed", type: "number", defaultValue: "0.6", description: "Physics spring-mass cursor tracking responsiveness (0 to 1)." },
    { name: "grain", type: "number", defaultValue: "0", description: "Analog film grain noise overlay amount." },
    { name: "quality", type: "'low' | 'medium' | 'high'", defaultValue: "'high'", description: "Simulation and dye grid resolution preset." },
    { name: "clickBurst", type: "boolean", defaultValue: "true", description: "Whether clicking triggers outward radial fluid pressure bursts." },
    { name: "enabled", type: "boolean", defaultValue: "true", description: "Whether the fluid simulation actively spawns dye." },
    { name: "children", type: "React.ReactNode", description: "Optional content wrapped inside the fluid canvas viewport." }
  ],
  "ethereal-smoke-shader": [
    { name: "preset", type: "'chai-blue' | 'ethereal-violet' | 'solar-flare' | 'emerald-mist' | 'spectral-white'", defaultValue: "'chai-blue'", description: "Color and atmospheric scattering preset theme." },
    { name: "origin", type: "'right' | 'left' | 'center' | 'bottom'", defaultValue: "'right'", description: "Location where the incandescent smoke plume originates." },
    { name: "originX", type: "number", defaultValue: "0.98", description: "Precise horizontal source position (supports off-screen values e.g. -0.5 to 1.5)." },
    { name: "originY", type: "number", defaultValue: "0.50", description: "Precise vertical source position (supports off-screen values e.g. -0.5 to 1.5)." },
    { name: "coreColor", type: "string", defaultValue: "'#ffffff'", description: "Incandescent center source burst color hex." },
    { name: "smokeColor", type: "string", defaultValue: "'#5a88e5'", description: "Primary billowing volumetric smoke color hex." },
    { name: "atmoColor", type: "string", defaultValue: "'#171a3d'", description: "Ambient deep nebula wash / scatter color hex." },
    { name: "bgColor", type: "string", defaultValue: "'#05060a'", description: "Base dark background void color hex." },
    { name: "intensity", type: "number", defaultValue: "1.15", description: "Luminance and emission brightness multiplier." },
    { name: "spread", type: "number", defaultValue: "1.4", description: "Volumetric plume expansion across the screen." },
    { name: "turbulence", type: "number", defaultValue: "1.0", description: "Domain-warped curl noise and swirl complexity." },
    { name: "speed", type: "number", defaultValue: "0.8", description: "Flow and billowing progression velocity." },
    { name: "mouseStrength", type: "number", defaultValue: "0.85", description: "Mouse dispersion force that spreads the smoke." },
    { name: "mouseSpread", type: "number", defaultValue: "0.95", description: "Interactive mouse dispersion and smoke parting factor." },
    { name: "trailWidth", type: "number", defaultValue: "24", description: "Slim liquid trailing wake diameter in pixels (6 to 120)." },
    { name: "trailLinger", type: "number", defaultValue: "1.6", description: "Duration in seconds that the trailing wake advects and ripples." },
    { name: "mouseRadius", type: "number", defaultValue: "24", description: "Legacy alias for trailWidth in pixels." },
    { name: "grain", type: "number", defaultValue: "0.04", description: "Procedural film grain noise overlay amount." },
    { name: "vignette", type: "number", defaultValue: "0.45", description: "Vignette edge darkening falloff intensity." },
    { name: "interactive", type: "boolean", defaultValue: "true", description: "Whether mouse proximity actively spreads the smoke." },
    { name: "children", type: "React.ReactNode", description: "Optional content rendered on top of the smoke canvas." }
  ],
  "liquid-metal-background": [
    { name: "theme", type: "'dark' | 'light' | 'system'", defaultValue: "'system'", description: "Color and reflection treatment: 'dark' (obsidian & cobalt rim), 'light' (silver chrome & dark graphite), or 'system' (inherits active theme with smooth lerping)." },
    { name: "intensity", type: "'subtle' | 'balanced' | 'dramatic'", defaultValue: "'balanced'", description: "Luminance, specular gleam, and environment reflection intensity." },
    { name: "speed", type: "number", defaultValue: "1.0", description: "Animation time progression and harmonic swirl velocity multiplier." },
    { name: "interactive", type: "boolean", defaultValue: "true", description: "Enables spring-damped cursor parallax and highlight displacement." },
    { name: "colorTone", type: "'cobalt-chrome' | 'pure-silver' | 'liquid-gold' | 'titanium'", defaultValue: "'cobalt-chrome'", description: "Metallic color reflection tone and chromatic accent caustics." },
    { name: "children", type: "React.ReactNode", description: "Optional foreground UI overlay (hero typography, CTA buttons, badges)." }
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
  checkbox: `import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className="flex flex-col gap-4">
      {/* Physics bounce motion */}
      <Checkbox
        variant="motion"
        checked={checked}
        onCheckedChange={setChecked}
        label="Spring Motion Checkbox"
        description="Dynamic bounce with micro-spring easing"
        badge="Motion"
      />

      {/* Blueprint CAD lineart tick animation */}
      <Checkbox
        variant="lineart"
        defaultChecked
        label="CAD Lineart Checkbox"
        description="Calculated SVG path tracing animation"
        badge="Lineart"
      />
    </div>
  );
}`,
  "search-bar": `import { SearchBar } from "@/registry/ui/search-bar";
import * as React from "react";

export function SearchBarDemo() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="flex items-center justify-center p-8">
      <SearchBar
        placeholder="Search components..."
        variant="downward-expand"
        value={query}
        onChange={setQuery}
        onSelectResult={(item) => console.log("Selected:", item)}
      />
    </div>
  );
}`,
  "minimalist-login": `import { MinimalistLogin } from "@/registry/ui/minimalist-login";

export function MinimalistLoginDemo() {
  return (
    <MinimalistLogin
      variant="sharp-edges"
      onSubmit={(data) => console.log("Login submitted:", data)}
    />
  );
}`,
  "horizon-login": `import { HorizonLogin } from "@/registry/ui/horizon-login";

export function HorizonLoginDemo() {
  return (
    <HorizonLogin
      defaultTab="login"
      horizonSpeed={1}
      glowIntensity={1}
      grain={true}
      onLogin={(data) => console.log("Login submitted:", data)}
      onSignUp={(data) => console.log("Sign-up submitted:", data)}
    />
  );
}`,
  "blueprint-login": `import { BlueprintLogin } from "@/registry/ui/blueprint-login";

export function BlueprintLoginDemo() {
  return (
    <BlueprintLogin
      defaultTab="login"
      expandRatio={1.42}
      neighborWave={true}
      onLogin={(data) => console.log("Login submitted:", data)}
      onSignUp={(data) => console.log("Sign-up submitted:", data)}
    />
  );
}`,
  "notched-navbar": `import { NotchedNavbar } from "@/components/ui/notched-navbar";
import * as React from "react";

export function NotchedNavbarDemo() {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <NotchedNavbar
      activeLink={activeTab}
      onLinkClick={(id) => setActiveTab(id)}
      variant="default"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-semibold text-white">Infrastructure Telemetry</h3>
          <span className="text-[11px] font-mono text-emerald-400">Operational</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase">Requests</span>
            <div className="text-lg font-bold text-white">1.4M</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase">Latency</span>
            <div className="text-lg font-bold text-white">24ms</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[10px] text-neutral-400 uppercase">Uptime</span>
            <div className="text-lg font-bold text-white">99.9%</div>
          </div>
        </div>
      </div>
    </NotchedNavbar>
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
    <Tabs defaultValue="overview" variant="liquid-pill" pillStyle="liquid-glow">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="logs" badge="Live">Logs</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-xs p-4 text-[var(--text-secondary)]">Cluster healthy and operational across 8 zones.</p>
      </TabsContent>
      <TabsContent value="metrics">
        <p className="text-xs p-4 text-[var(--text-secondary)]">CPU: 12% • Memory: 1.4GB / 4GB</p>
      </TabsContent>
      <TabsContent value="logs">
        <p className="text-xs p-4 font-mono text-[var(--text-muted)]">[14:22:04] Ready on 0.0.0.0:3000</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-xs p-4 text-[var(--text-secondary)]">Workspace environment settings.</p>
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
}`,
  "expanding-card": `import { ExpandingCard } from "@/components/ui/expanding-card";

export function ExpandingCardDemo() {
  return (
    <ExpandingCard
      title="Components"
      subtitle="Hover to reveal full showcase view"
      badge="Featured"
    />
  );
}`,
  "blurred-carousel": `import { BlurredCarousel } from "@/components/ui/blurred-carousel";

export function BlurredCarouselDemo() {
  return (
    <BlurredCarousel
      title="Featured Templates"
      subtitle="Explore curated templates with smooth edge blur"
    />
  );
}`,
  "concave-carousel": `import { ConcaveCarousel } from "@/components/ui/concave-carousel";

export function ConcaveCarouselDemo() {
  return (
    <ConcaveCarousel
      preset="Rotunda"
      curvature={0.72}
      aspect={1.25}
      wheel={true}
      draggable={true}
      captions={true}
    />
  );
}`,
  "content-slider": `import { ContentSlider } from "@/components/ui/content-slider";

export function ContentSliderDemo() {
  return (
    <ContentSlider
      title="On this page"
    />
  );
}`,
  footer: `import { Footer } from "@/components/ui/footer";

export function FooterDemo() {
  return (
    <Footer
      brandText="kilo/ui"
      blurBlend={true}
    />
  );
}`,
  "scroll-marquee": `import { ScrollMarquee } from "@/components/ui/scroll-marquee";

export function ScrollMarqueeDemo() {
  return (
    <ScrollMarquee
      text="HIGH PERFORMANCE • ZERO DEPENDENCY • MINIMAL"
      variant="scroll-left"
    />
  );
}`,
  "directional-marquee": `import { DirectionalMarquee } from "@/components/ui/directional-marquee";

export function DirectionalMarqueeDemo() {
  return (
    <DirectionalMarquee
      manualDirection="auto"
      showHud={true}
    />
  );
}`,
  "kinetic-text": `import { KineticText } from "@/components/ui/kinetic-text";

export function KineticTextDemo() {
  return (
    <KineticText
      text="KILO / MOTION UI"
      variant="rubber-band"
    />
  );
}`,
  "prismatic-slats-bg": `import { PrismaticSlatsBg } from "@/registry/ui/prismatic-slats-bg";

export function PrismaticSlatsBgDemo() {
  return (
    <div style={{ width: "100%", height: 420, borderRadius: 8, overflow: "hidden" }}>
      <PrismaticSlatsBg
        slatCount={14}
        slatAngle={35}
        prismIntensity={0.7}
        interactive={true}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <p style={{ color: "white", fontFamily: "monospace", fontSize: 13, opacity: 0.6 }}>Move cursor to interact</p>
        </div>
      </PrismaticSlatsBg>
    </div>
  );
}`,
  "grainy-grid-shader": `import { GrainyGridShader } from "@/registry/ui/grainy-grid-shader";

export function GrainyGridShaderDemo() {
  return (
    <div style={{ width: "100%", height: 420, borderRadius: 12, overflow: "hidden" }}>
      <GrainyGridShader
        variant="rough-matte"
        grain={0.25}
        roughness={1.0}
        columns={6}
        rows={4}
        interactive={true}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em" }}>Tactile Grid Shader</h2>
          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>Tactile noise • Dynamic coordinate grid illumination</p>
        </div>
      </GrainyGridShader>
    </div>
  );
}`,
  "grainy-horizon-shader": `import { GrainyHorizonShader } from "@/registry/ui/grainy-horizon-shader";

export function GrainyHorizonShaderDemo() {
  return (
    <div style={{ width: "100%", height: 440, borderRadius: 16, overflow: "hidden" }}>
      <GrainyHorizonShader
        variant="ultraviolet"
        grain={0}
        glowIntensity={1.0}
        glowSpread={1.25}
        liquidCursor={true}
        cursorIntensity={0.6}
        cursorTrailWidth={3}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
          <h2 style={{ color: "white", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>Radiant Horizon Shader</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "monospace" }}>Smooth gradient radiance • [radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]</p>
        </div>
      </GrainyHorizonShader>
    </div>
  );
}`,
  "firefly-cursor": `import { FireflyCursor } from "@/registry/ui/firefly-cursor";

export function FireflyCursorDemo() {
  return (
    <div style={{ width: "100%", height: 440, borderRadius: 16, overflow: "hidden", position: "relative" }}>
      <FireflyCursor
        preset="comet"
        color="#5f8bff"
        intensity={0.6}
        trailWidth={3}
        linger={1.4}
        glow={1.2}
        hotspot={0.8}
        followSpeed={0.6}
        quality="high"
        clickBurst={true}
        enabled={true}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
          <h2 style={{ color: "white", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>Firefly Cursor</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "monospace" }}>Move cursor & click • WebGL2 Navier-Stokes liquid physics</p>
        </div>
      </FireflyCursor>
    </div>
  );
}`,
  "ethereal-smoke-shader": `import { EtherealSmokeShader } from "@/registry/ui/ethereal-smoke-shader";

export function EtherealSmokeShaderDemo() {
  return (
    <div style={{ width: "100%", height: 440, borderRadius: 16, overflow: "hidden", position: "relative" }}>
      <EtherealSmokeShader
        preset="chai-blue"
        origin="right"
        intensity={1.15}
        spread={1.4}
        turbulence={1.0}
        speed={0.8}
        mouseSpread={0.95}
        trailWidth={24}
        trailLinger={1.6}
        interactive={true}
      />
    </div>
  );
}`,
  "liquid-metal-background": `import { LiquidMetalBackground } from "@/registry/ui/liquid-metal-background";

export function LiquidMetalBackgroundDemo() {
  return (
    <div style={{ width: "100%", height: 480, borderRadius: 16, overflow: "hidden", position: "relative" }}>
      <LiquidMetalBackground
        intensity="balanced"
        colorTone="cobalt-chrome"
        speed={1.0}
        interactive={true}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>
            Next-Gen Raymarched SDFs
          </span>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Liquid Chrome Sculptures
          </h1>
          <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 440, textAlign: "center" }}>
            Continuously animated fluid metallic ribbons and merging mercury droplets with studio HDRI reflections.
          </p>
        </div>
      </LiquidMetalBackground>
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
  checkbox: {
    category: "Forms & Inputs",
    title: "Checkbox",
    description: "Multi-style accessible checkbox featuring physics-driven motion bounce, blueprint CAD lineart path drawing, strikethrough tasks, selectable card tiles, and interactive chips.",
    variants: ["default", "motion", "lineart", "strike", "card", "chip"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "search-bar": {
    category: "Forms & Inputs",
    title: "Search Bars",
    description: "Refractive optical liquid-glass search bar and clean minimal SaaS search components. Features 4 variants: downward-expand (liquid glass pill expanding downwards into a command palette), circle-popout (liquid glass orb extending into a pill), minimal-pill (Linear-style minimal SaaS pill), and minimal-expand (compact minimal SaaS expand trigger).",
    variants: ["downward-expand", "circle-popout", "minimal-pill", "minimal-expand"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "minimalist-login": {
    category: "Forms & Inputs",
    title: "Minimalist Login",
    description: "Spatial minimalist login form featuring a high-performance interactive 3D particle wireframe sphere with real-time motion and cursor hover radar reaction, minimal underline inputs, and customizable sharp or rounded corner geometry.",
    variants: ["sharp-edges", "rounded-corners"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "horizon-login": {
    category: "Forms & Inputs",
    title: "Horizon Login",
    description: "Production-quality minimal dark authentication card featuring an abstract animated purple horizon with multi-layered light bands, razor luminous filaments, tactile film grain, and accessible login/signup flows.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "blueprint-login": {
    category: "Forms & Inputs",
    title: "Blueprint Login",
    description: "Architectural blueprint authentication card featuring a static isometric mechanical drawing with interactive cylinder expansion and shrinking on cursor hover, technical HUD callouts, and clean editorial typography.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react", "three", "@types/three"],
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
    description: "Segmented tab controls supporting default, slide, liquid-pill, island, and minimal styles with subpixel indicator physics.",
    variants: ["default", "slide", "liquid-pill", "island", "minimal"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "notched-navbar": {
    category: "Navigation",
    title: "Notched Navbar",
    description: "Signature parametric S-curve notched navigation frame with contrast backdrop, continuous bezier fillets, and top, down, left, and right notch positions.",
    variants: ["default", "down", "left", "right"],
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
    description: "Production-grade navigation sidebar with collapse physics (⌘B), white-by-default icons, scrollable categories variant, and mobile drawer.",
    variants: ["scrollable-categories", "default"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils", "vector-icons"]
  },
  "expanding-card": {
    category: "Media & Layout",
    title: "Expanding Card",
    description: "Interactive 4-image showcase card where hovering smoothly expands the primary image to acquire the entire 4-card space with an animated bottom-right action arrow.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "blurred-carousel": {
    category: "Media & Layout",
    title: "Blurred Edge Carousel",
    description: "Hardware-accelerated horizontal template carousel with frosted glass blurred edge masks, minimal navigation controls, and 0.6s cubic-bezier sliding physics.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "concave-carousel": {
    category: "Media & Layout",
    title: "Concave Carousel",
    description: "Hardware-accelerated 3D cylindrical carousel featuring smooth scroll-wheel and drag inertia, floor mirror reflections, dynamic active captions, and rotunda geometry with positive (concave) and negative (forward-bending convex) curvature.",
    variants: ["Rotunda", "Tunnel", "Flat", "Panoramic", "Convex"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "content-slider": {
    category: "Navigation",
    title: "TOC Content Slider",
    description: "Table of contents content slider with active section indicator rail, cursor-following hover slider with rubber band physics, and text translation on hover.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  footer: {
    category: "Media & Layout",
    title: "Overflown Blended Footer",
    description: "Production-ready footer component with huge overflown brand typography and feathered frosted-glass bottom blur blend that can be toggled or removed.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "scroll-marquee": {
    category: "Media & Layout",
    title: "Scroll Marquee",
    description: "High-performance scroll-driven marquee component that translates text horizontally based on scroll speed, with left, right, dual, and velocity skew variants.",
    variants: ["scroll-left", "scroll-right", "dual-scroll", "velocity-skew"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "directional-marquee": {
    category: "Media & Layout",
    title: "Directional Marquee",
    description: "Continuous dual-track revolving marquee that dynamically reverses slider directions when scrolling up versus scrolling down, with inertial velocity physics.",
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
    registryDependencies: ["utils"]
  },
  "kinetic-text": {
    category: "Media & Layout",
    title: "Kinetic Motion Text",
    description: "Interactive text and motion UI component featuring character spring mechanics, rubber band bounce, wave ripple, magnetic tilt, and cyberpunk scramble decoding.",
    variants: ["rubber-band", "wave-ripple", "scramble-decode", "magnetic-tilt"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "prismatic-slats-bg": {
    category: "Backgrounds & Shaders",
    title: "Reactive Slates",
    description: "Cursor-reactive prismatic diagonal slats background rendered on a high-performance Canvas. Features smooth colour-shifting iridescent slat bands that respond to cursor proximity with glow, specular highlights, ambient drift, and a cinematic radial vignette.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "grainy-grid-shader": {
    category: "Backgrounds & Shaders",
    title: "Grainy Grid Shader",
    description: "Cursor-reactive tactile coordinate grid shader featuring responsive illumination, intersection crosshairs, and shockwave pulses. Textured with procedural turbulent noise and analog film grain for a rough, tactile matte finish.",
    variants: ["rough-matte", "tactile-kraft", "cyber-mesh"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "grainy-horizon-shader": {
    category: "Backgrounds & Shaders",
    title: "Grainy Horizon Shader",
    description: "Cinematic curved dark eclipse horizon shader featuring a softly blurred atmospheric boundary illuminated by deep radiant chromatic glow, dynamic color tinting, and embedded fluid aura physics.",
    variants: ["ultraviolet", "aurora-green", "solar-amber", "cyber-cyan", "monochrome"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "firefly-cursor": {
    category: "Cursors",
    title: "Firefly Cursor",
    description: "GPU-accelerated Navier-Stokes fluid dynamics cursor simulation featuring MacCormack advection, 5-stage bloom, pressure projection, and organic particle physics.",
    variants: ["comet", "firefly", "nebula", "plasma", "aurora"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "ethereal-smoke-shader": {
    category: "Backgrounds & Shaders",
    title: "Ethereal Smoke Shader",
    description: "Cinematic volumetric organic smoke shader inspired by Chai AI. Features incandescent source emission, domain-warped fractal curl noise, deep atmospheric scattering, and fluid mouse dispersion.",
    variants: ["chai-blue", "ethereal-violet", "solar-flare", "emerald-mist", "spectral-white"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "liquid-metal-background": {
    category: "Backgrounds & Shaders",
    title: "Liquid Metal Background",
    description: "High-end, interactive liquid-chrome hero background featuring raymarched SDF ribbons, orbiting mercury beads with smin fluid surface tension, studio HDRI reflections, cobalt-blue caustics, and dedicated light/dark mode treatments.",
    variants: ["cobalt-chrome", "pure-silver", "liquid-gold", "titanium"],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
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
  category: "Actions" | "Forms & Inputs" | "Overlays" | "Data Display" | "Navigation" | "Media & Layout" | "Backgrounds & Shaders" | "Cursors";
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
console.log(`Successfully synchronized registry-data.ts with all ${Object.keys(items).length} components and exact source code!`);
