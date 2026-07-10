const CACHE='durianripe-20260710-103';
const ASSETS=[
  './','./index.html','./manifest.json',
  './icon-192.png','./icon-512.png',
  './icon-192-maskable.png','./icon-512-maskable.png',
  './icon-180.png','./icon-167.png','./icon-152.png'
];
// NOTE: we deliberately do NOT self.skipWaiting() here. A new worker stays in the
// "waiting" state so the page can notice it and ask the user before updating —
// avoiding a surprise mid-use reload. The page posts {type:'SKIP_WAITING'} when
// the user taps "update", which triggers activation (handler below).
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));
});
self.addEventListener('message',e=>{
  if(e.data && e.data.type==='SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin!==self.location.origin)return;
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
      const cp=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
      return resp;
    }).catch(()=>caches.match('./index.html')))
  );
});
