function istallServiceWorker() {
  console.log('Insalling service worker')
  //First check if browser support service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js').then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

istallServiceWorker();
