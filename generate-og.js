const puppeteer = require('puppeteer');
const path = require('path');

const files = [
  { svg: 'og-landing.svg', out: 'og-landing.png' },
  { svg: 'og-color.svg',   out: 'og-color.png'   },
  { svg: 'og-zoloto.svg',  out: 'og-zoloto.png'  },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 630, height: 630, deviceScaleFactor: 2 });

  for (const { svg, out } of files) {
    const url = 'file:///' + path.resolve(__dirname, svg).split('\\').join('/');
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 630, height: 630 } });
    console.log(out + ' OK');
  }

  await browser.close();
})();
