const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The script should replace 'font-serif' from paragraph tags (except large quotes)
// We will look for <p className="... font-serif ..."> and replace ' font-serif' or 'font-serif ' with ''
// Then we'll ensure headings maintain font-serif
content = content.replace(/(<p className="[^"]*)font-serif([^"]*">)/g, (match, p1, p2) => {
    // If it's a large text like text-2xl, text-3xl, keep serif maybe? 
    // Actually the user wants "fluidez geral para melhor experiencia de leitura", so sans-serif is best for all standard paragraphs. 
    return p1 + p2.trim().replace(/\s{2,}/g, ' ') + '">';
});

// Since some p tags might have font-serif removed but have trailing/leading spaces in className
content = content.replace(/ className=" /g, ' className="');
content = content.replace(/  +"/g, ' "');

fs.writeFileSync('src/App.tsx', content);
