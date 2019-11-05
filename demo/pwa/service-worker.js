

const cacheName = 'v1';
// 安装服务工作线程
self.addEventListener('install', function(event){
    // 需要缓存的资源
    var cacheFiles = [
        './index.html',
        './images/72.png',
        './images/128.png',
        './images/256.png',
        'https://jiamao.github.io/jmgraph/src/jmGraph.js'
    ];
    console.log('service worker: run into install');
    event.waitUntil(caches.open(cacheName).then(function(cache)
    {
        return cache.addAll(cacheFiles);
    }));
});

// 新的service worker线程被激活（其实和离线包一样存在"二次生效"的机理）
self.addEventListener('activate', function (event) {
    console.log('service worker: run into activate');
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            // 注意这里cacheVersion也可以是一个数组
            if(cacheName !== cacheName){
                console.log('service worker: clear cache' + cacheName);
                return caches.delete(cacheName);
            }
        }));
    }));
});

// 拦截请求并响应
self.addEventListener('fetch', function (event) {
    console.log('service worker: run into fetch');
    event.respondWith(caches.match(event.request).then(function (response) {
        // 发现匹配的响应缓存
        if(response){
            console.log('service worker 匹配并读取缓存：' + event.request.url);
            if(/\.html$/.test(event.request.url)) fetchResource(event.request); // 如果是html，依然去请求一次，缓存起来
            return response;
        }
        console.log('没有匹配上：' + event.request.url);
        return fetchResource(event.request);
    }));
});

function fetchResource(request) {
    request = request.clone();    
    return fetch(request).then(function(response){
        if(!response || response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')){
            return response;
        }
        var responseToCache = response.clone();
        caches.open(cacheName).then(function (cache) {
            console.log(cache);
            cache.put(request, responseToCache);
        });
        return response;
    });
}