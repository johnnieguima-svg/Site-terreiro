const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace very small text sizes with standard tailwind responsive text sizes
content = content.replace(/text-\[9px\]/g, 'text-[10px] md:text-xs');
content = content.replace(/text-\[10px\]/g, 'text-[11px] md:text-sm');
content = content.replace(/text-\[12px\]/g, 'text-xs md:text-sm');

// Reduce excessive letter spacing
content = content.replace(/tracking-\[0\.8em\]/g, 'tracking-widest');
content = content.replace(/tracking-\[0\.6em\]/g, 'tracking-[0.3em]');
content = content.replace(/tracking-\[0\.5em\]/g, 'tracking-[0.3em]');
content = content.replace(/tracking-\[0\.4em\]/g, 'tracking-[0.2em]');

// Improve contrast
content = content.replace(/text-charcoal\/50/g, 'text-charcoal/70');
content = content.replace(/text-charcoal\/60/g, 'text-charcoal/80');

// Replace very light weights for better readability on reading sizes
content = content.replace(/font-light text-lg md:text-xl/g, 'text-lg md:text-xl font-normal');

// Also adjust index.css for base font size if applicable
fs.writeFileSync('src/App.tsx', content);

console.log("Typography improvements applied.");
