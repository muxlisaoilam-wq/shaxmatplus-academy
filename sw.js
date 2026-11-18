/* Shaxmat Plus Academy — offlayn ishlash. Yangilanish chiqarganda VER raqamini oshiring. */
const VER='spa-v7';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VER).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin)return; /* telegram.org va boshqalar — to'g'ridan-to'g'ri internetdan */
 /* sahifa: avval internetdan (yangi versiya), bo'lmasa saqlangan nusxa */
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VER).then(x=>x.put('./index.html',c));return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(VER).then(x=>x.put(r,c))}return res})))});
