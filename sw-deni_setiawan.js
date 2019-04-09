//Step 2 : inisialisasi variabel CACHE_NAME dengan value deni-cache
var CACHE_NAME = 'deni-cache';
//kemudian mengatur file mana saja yang akan diberikan cache pada browser
var urlsToCache = [
	'.',
	'index.html',
	'css/style.css'
];

//Step 3 :memberikan cache pada browser yang nantinya akan diload ulang ketika browser tidak ada koneksi
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
//Setep 4 : kemudian browser memberikan respon dengan menampilkan halaman yang telah termuat cachenya
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			return response || fetchAndCache(event.request);
		})
	);
});


function fetchAndCache(url) {
	return fetch(url)
	//Step 5 :menjalankan fungsi respon ketika browser diload ulang dalam koneksi off
	.then(function(response) {
	//Step 6 :mengecek apakah sudah menerima respon
		if (!response.ok) {
			throw Error(response.statusText);
		}
	return caches.open(CACHE_NAME)
	//Step 7 : jika respon sudah diterima maka cache akan ditampilkan
	.then(function(cache) {
		cache.put(url, response.clone());
		return response;
		});
	})
	//Step 7: jika respon atau rekues tidak diterima ,maka halaman page ketika di load akan menampilkan pesan error 404
	.catch(function(error) {
		console.log('Request failed:', error);
	});
}