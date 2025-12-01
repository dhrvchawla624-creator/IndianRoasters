/// <reference lib="webworker" />

/* eslint-disable no-restricted-globals */
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'indian-roasters-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install a service worker
self.addEventListener('install', (event: ExtendableEvent) => {
  // Perform install steps.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response.
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// This export statement forces the file to be treated as a module,
// resolving the "Cannot redeclare block-scoped variable" error.
export {};
