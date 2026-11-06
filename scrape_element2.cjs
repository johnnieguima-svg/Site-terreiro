const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  const targetSelector = 'div#root:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)';

  const views = [
    'Início',
    'Primeira Vez?',
    'Rituais',
    'Ervas Sagradas',
    'Orixás',
    'Quero Ser Médium',
    'Documentos'
  ];

  for (const view of views) {
    console.log("Checking view: " + view);
    await page.evaluate((v) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent && b.textContent.includes(v));
      if (btn) btn.click();
    }, view);
    
    await new Promise(r => setTimeout(r, 1000));
    
    const elementText = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.outerHTML : 'NOT_FOUND';
    }, targetSelector);
    
    if (elementText !== 'NOT_FOUND') {
      console.log("MATCHED_ELEMENT in " + view + ": \n" + elementText.substring(0, 500));
      break;
    }
  }
  
  await browser.close();
})();
