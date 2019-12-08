var CACHE_NAME = 'our-project-cache';
var urlsToCache = [
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/index.html',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/index.js',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/bg.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/bird.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/background.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/birdempty.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/fg.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/pipeBottom.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/pipeUp.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/rules.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/rune_haste.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/rune_score.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/rune_score1.jpg',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/runs.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/img/runs_empty.png',
  'https://greeny.cs.tlu.ee/~jevgpro/projekt/manifest.json'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
		console.log(urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
