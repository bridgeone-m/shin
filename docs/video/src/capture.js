const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');

(async () => {
  const mode = process.argv[2] || 'preview';
  const outDir = path.resolve(__dirname, mode === 'all' ? 'frames' : 'preview');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--force-device-scale-factor=1', '--hide-scrollbars', '--disable-lcd-text']
  });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(__dirname, 'index.html'));
  await page.waitForFunction(() => !!window.__render);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);

  const meta = await page.evaluate(() => window.__meta);
  const times = mode === 'all'
    ? Array.from({ length: meta.frames }, (_, i) => i / meta.fps)
    : (process.argv[3] ? process.argv[3].split(',').map(Number)
                       : [1.5, 4.5, 7.2, 9.8, 12.5, 16.2, 20, 24, 27, 30, 34, 36.7, 39.5, 43, 45.8, 48, 50.5, 53.5, 57, 60.5, 64.5, 68, 72, 75, 80]);

  for (let i = 0; i < times.length; i++) {
    await page.evaluate(t => window.__render(t), times[i]);
    const name = mode === 'all'
      ? `f_${String(i).padStart(5, '0')}.png`
      : `t_${times[i].toFixed(1)}.png`;
    await page.screenshot({ path: path.join(outDir, name) });
    if (mode === 'all' && i % 150 === 0) console.log(`  ${i}/${times.length}`);
  }
  await browser.close();
  console.log(`done: ${times.length} frames -> ${outDir}`);
})();
