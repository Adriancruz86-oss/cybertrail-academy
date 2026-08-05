export function registerServiceWorker() {
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { updateViaCache: 'none' }).then((registration) => registration.update()).catch((error) => {
      console.warn('Service worker registration failed:', error)
    })
  }
}
