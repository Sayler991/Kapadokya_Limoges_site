// node overlap.js URL OUTDIR TAG — mesure chevauchements d'images + défilement horizontal
const p = require('/workspace/terrasse/ibis_tlemcen_site/work/node_modules/puppeteer-core');
const [URL, OUT, TAG] = process.argv.slice(2);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const VPS = [[375, 812], [360, 780], [390, 844], [414, 896], [812, 375], [844, 390], [1440, 900]];
(async () => {
  const b = await p.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: 'new' });
  const all = {};
  for (const [W, H] of VPS) {
    const pg = await b.newPage(); const errs = [];
    pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await pg.setViewport({ width: W, height: H, isMobile: W < 900, hasTouch: W < 900, deviceScaleFactor: 1 });
    await pg.goto(URL + (URL.includes('?') ? '&' : '?') + 'v=' + Date.now(), { waitUntil: 'networkidle2' });
    await pg.waitForFunction(() => document.documentElement.dataset.live, { timeout: 20000 });
    // défile toute la page
    const total = await pg.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(H * .6)) { await pg.evaluate(y => scrollTo(0, y), y); await sleep(250); }
    await sleep(1500);
    const r = await pg.evaluate(() => {
      const boxes = [...document.querySelectorAll('main img, main figure, .sticker, .hero-frame, .gallery figure, .ph')].filter(e => e.offsetParent || getComputedStyle(e).position === 'fixed');
      const rect = e => { const r = e.getBoundingClientRect(); return { l: r.left + scrollX, t: r.top + scrollY, r: r.right + scrollX, b: r.bottom + scrollY, w: r.width, h: r.height }; };
      const name = e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + (e.getAttribute('src') ? '[' + e.getAttribute('src').split('/').pop() + ']' : '');
      const R = boxes.map(e => ({ e, k: rect(e) })).filter(x => x.k.w > 2 && x.k.h > 2);
      const over = [];
      for (let i = 0; i < R.length; i++) for (let j = i + 1; j < R.length; j++) {
        const a = R[i], c = R[j]; if (a.e.contains(c.e) || c.e.contains(a.e)) continue;
        const ix = Math.min(a.k.r, c.k.r) - Math.max(a.k.l, c.k.l), iy = Math.min(a.k.b, c.k.b) - Math.max(a.k.t, c.k.t);
        if (ix > 1 && iy > 1) over.push(name(a.e) + ' × ' + name(c.e) + ' (' + Math.round(ix) + '×' + Math.round(iy) + ')');
      }
      const vw = document.documentElement.clientWidth;
      const outside = R.filter(x => x.k.l < -1 || x.k.r > vw + 1).map(x => name(x.e) + ' l=' + Math.round(x.k.l) + ' r=' + Math.round(x.k.r));
      const broken = [...document.querySelectorAll('main img')].filter(i => !i.complete || !i.naturalWidth).length;
      return { hscroll: document.documentElement.scrollWidth - innerWidth, bodyScroll: document.body.scrollWidth - innerWidth, overlaps: over, outside, brokenImgs: broken, boxes: R.length };
    });
    r.errs = errs; all[W + 'x' + H] = r;
    for (const id of ['top', 'maison', 'galerie']) {
      await pg.evaluate(id => { const e = document.getElementById(id); scrollTo(0, e.getBoundingClientRect().top + scrollY - 70); }, id); await sleep(900);
      await pg.screenshot({ path: `${OUT}/${TAG}_${W}x${H}_${id}.png` });
    }
    await pg.close();
  }
  console.log(JSON.stringify(all, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
