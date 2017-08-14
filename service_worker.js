var CACHE_NAME = "sysleaf_v2";
var PRE_CACHE_URL = ['script.js', 'style.css'];

self.addEventListener('install', (evt) => {
  evt.waitUntil(precache());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(fromCacheOrNetwork(evt));
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(delOldCache());
});

//cache important resource at the time of installation of service worker.
function precache() {
  return caches.open(CACHE_NAME)
    .then(function(cache){
      return cache.addAll(PRE_CACHE_URL);
    })
}


//return the resource from cache, if not found in cache, return the resource from network fetch and update the cache
function fromCacheOrNetwork(evt){
  var request = evt.request;
  caches.match(request)
    .then(function(matching){
      if(matching)
        return matching;
      else{
        var netRequest = evt.request.clone();
        fetch(netRequest)
          .then( function(response){
            if (response.status === 200) {
              var netResponse = response.clone();
              caches.open(CACHE_NAME)
                .then(function(cache){
                  cache.put(request, netResponse);
                  return response;
                })
            }else{
              return response;
            }
          })
      }
    })
}


//delete old cache, on activation new updated service worker
function delOldCache(){
  var deletedCaches = [];
  caches.keys()
    .then(function(allCacheNames){
      allCacheNames.forEach((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          deletedCaches.push(caches.delete(cacheName));
        }
      });
    })
  return Promise.all(deletedCaches);
}


