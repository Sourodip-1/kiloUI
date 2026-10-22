const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../components/component-preview-stage.tsx");
let content = fs.readFileSync(filePath, "utf-8");

content = content.replace(/text-white\/50 hover:text-white/g, "text-[var(--text-muted)] hover:text-[var(--text-primary)]");
content = content.replace(/hover:text-white/g, "hover:text-[var(--text-primary)]");
content = content.replace(/text-xs text-white"/g, "text-xs text-[var(--text-primary)]\"");
content = content.replace(/text-white uppercase/g, "text-[var(--text-primary)] uppercase");
content = content.replace(/text-xs text-white</g, "text-xs text-[var(--text-primary)]<");
content = content.replace(/cursor-pointer text-white"/g, "cursor-pointer text-[var(--text-primary)]\"");

fs.writeFileSync(filePath, content, "utf-8");
console.log("Updated components/component-preview-stage.tsx");
