const CACHE_NAME = 'toko-motor-cache-v1';
const urlsToCache = [
    './', // Cache halaman utama
    './index.html',
    './style.css',
    './Gambar/LOGO.png',
    './Gambar/CBR250RR..webp',
    './Gambar/CRF150L.webp',
    './Gambar/CB150R.webp',
    './Gambar/Beat.jpg',
    './Gambar/Vario160.webp',
    './Gambar/Yamaha Aerox Alpha',
    './Gambar/Yamaha NMAX Neo',
    './Gambar/Yamaha R15M',
    './Gambar/Yamaha WR155R',
    './Gambar/Yamaha Fazzio Hybrid Neo',
    './Gambar/Suzuki GSX-R150.webp',
    './Gambar/Suzuki NEX_II.webp',
    './Gambar/Suzuki Satria F150 NEW.webp',
    './Gambar/Suzuki VSTROM 250 SX.webp',
    './Gambar/Suzuki NEX CROSSOVER.webp',
    './Gambar/Vespa Sprint 150 ABS',
    './Gambar/Vespa Sprint S 150 ABS.png',
    './Gambar/Vespa GTS CLASSIC 150 ABS',
    './Gambar/Vespa GTS Super Tech 300',
    './Gambar/Vespa Primavera 150 ABS',
    './Gambar/Kawasaki NINJA 250 ABS SE',
    './Gambar/Kawasaki KLX230R S',
    './Gambar/Kawasaki W175R',
    './Gambar/Kawasaki NINJA H2',
    './Gambar/Kawasaki VULCAN S',
    './Gambar/KTM Duke 200',
    './Gambar/KTM RC 250',
    './Gambar/KTM RC 200.webp',
    './Gambar/KTM 450 SX-F'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch and cache files
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return cached resource
                }
                return fetch(event.request); // Fetch from network
            })
    );
});

// Update Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
});
