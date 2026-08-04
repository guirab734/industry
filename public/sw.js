/*
 * Service worker do Velora Sandbox.
 *
 * Objetivo único: o app abrir mesmo sem internet depois da primeira
 * visita — o que importa numa sala de aula com wi-fi ruim.
 *
 * Estratégia: rede primeiro, cache como rede reserva. Assim o conteúdo
 * fica sempre atualizado quando há sinal, e continua abrindo quando não há.
 */

const CACHE = "velora-sandbox-v1";
const ESSENCIAIS = ["/app", "/manifest.webmanifest"];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ESSENCIAIS))
      .catch(() => {
        /* offline na instalação: o cache enche na primeira navegação */
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(
          chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (evento) => {
  const { request } = evento;

  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== self.location.origin) return;

  evento.respondWith(
    fetch(request)
      .then((resposta) => {
        const copia = resposta.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copia));
        return resposta;
      })
      .catch(async () => {
        const emCache = await caches.match(request);
        if (emCache) return emCache;
        // Navegação sem rede e sem cache da rota: cai no app
        if (request.mode === "navigate") {
          const app = await caches.match("/app");
          if (app) return app;
        }
        return Response.error();
      }),
  );
});
