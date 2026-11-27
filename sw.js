/* Agenda PS __APP_VERSION__ – service worker: funziona offline, si aggiorna quando c'è rete */
const CACHE = 'agenda-ps-__APP_VERSION__';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== 'share-inbox').map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  // Condivisione da altre app (Android: menu "Condividi" → Agenda PS)
  if (req.method === 'POST' && new URL(req.url).pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const fd = await req.formData(), files = [];
        for (const f of fd.getAll('file')) if (f && f.size < 2e6) files.push({ name: f.name || '', type: f.type || '', text: await f.text() });
        const data = { title: fd.get('title') || '', text: fd.get('text') || '', url: fd.get('url') || '', files, at: Date.now() };
        const c = await caches.open('share-inbox');
        await c.put('./share-inbox.json', new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } }));
      } catch (err) {}
      return Response.redirect('./?share=1', 303);
    })());
    return;
  }
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Pagina: prima la rete (per gli aggiornamenti), poi la cache (offline)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req, { cache: 'no-store' }).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Risorse statiche: cache, aggiornata in background
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok && !new URL(req.url).searchParams.has('v')) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
