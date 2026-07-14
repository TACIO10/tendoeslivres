const CACHE_NAME = "tendoes-livres-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./assets/hero-tendao-inflamado.webp",
  "./assets/antes-depois-musico.webp",
  "./assets/marina-infancia.webp",
  "./assets/marina-fisioterapeuta.webp",
  "./assets/protocolo-mockup.webp",
  "./assets/produto-principal.webp",
  "./assets/bonus-postura-sem-fundo.webp",
  "./assets/bonus-sono-sem-fundo.webp",
  "./assets/bonus-checklist-sem-fundo.webp",
  "./assets/bonus-grupo-vip-sem-fundo.webp",
  "./assets/selo-garantia-30-dias-sem-fundo.webp",
  "./assets/dor-dedos.webp",
  "./assets/dor-punho.webp",
  "./assets/dor-ombro.webp",
  "./assets/dor-pescoco.webp",
  "./assets/dor-costas.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
