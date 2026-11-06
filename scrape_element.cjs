const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // We need to click on "Primeira Vez?" to change to visitor view.
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('Primeira Vez?'));
    if (btn) btn.click();
  });
  
  // Wait a bit for the view to render
  await new Promise(r => setTimeout(r, 2000));
  
  const targetSelector = 'div#root:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2)';
  
  const elementText = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? el.outerHTML : 'NOT_FOUND';
  }, targetSelector);
  
  console.log("MATCHED_ELEMENT: " + elementText);
  await browser.close();
})();
