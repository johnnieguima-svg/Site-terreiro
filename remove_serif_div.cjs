const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace font-serif from divs as well
content = content.replace(/(<div className="[^"]*)font-serif([^"]*">)/g, (match, p1, p2) => {
    return p1 + p2.trim().replace(/\s{2,}/g, ' ') + '">';
});

// Since some div tags might have font-serif removed but have trailing/leading spaces in className, we clean
content = content.replace(/ className=" /g, ' className="');
content = content.replace(/  +"/g, ' "');

// Clean duplicate "> if any"
content = content.replace(/">">/g, '">');

// We should also replace font-serif on spans that are just text bodies
content = content.replace(/(<span className="[^"]*)font-serif([^"]*">)/g, (match, p1, p2) => {
    return p1 + p2.trim().replace(/\s{2,}/g, ' ') + '">';
});
content = content.replace(/">">/g, '">');

fs.writeFileSync('src/App.tsx', content);
