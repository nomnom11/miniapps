const CACHE_NAME = "amplify-v1"
const urlsToCache = [
  "/",
  "/rewards",
  "/leaderboard",
  "/artist",
  "/amplify-logo.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/StockTune-Whispers%20Of%20Distant%20Stars_1758406666-h5Kgk9osOXEwu2503ezwbJlmzcxldy.mp3",
  "/electronic-music-album-cover-neon.png",
  "/space-stars-cosmic.jpg",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Background sync for offline rewards tracking
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync-rewards") {
    event.waitUntil(syncRewards())
  }
})

async function syncRewards() {
  try {
    // Sync pending rewards when back online
    const pendingRewards = await getStoredRewards()
    if (pendingRewards.length > 0) {
      await submitRewards(pendingRewards)
      await clearStoredRewards()
    }
  } catch (error) {
    console.error("[SW] Failed to sync rewards:", error)
  }
}

async function getStoredRewards() {
  // Implementation would retrieve stored rewards from IndexedDB
  return []
}

async function submitRewards(rewards) {
  // Implementation would submit rewards to backend
  console.log("[SW] Submitting rewards:", rewards)
}

async function clearStoredRewards() {
  // Implementation would clear stored rewards from IndexedDB
  console.log("[SW] Cleared stored rewards")
}
