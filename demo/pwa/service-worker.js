

const cacheName = 'v1';
var cacheInstance = null;

// 安装服务工作线程
self.addEventListener('install', function(event){
    // 需要缓存的资源
    var cacheFiles = [
        './index.html',
        './images/72.png',
        './images/128.png',
        './images/256.png',
        //'https://jiamao.github.io/jmgraph/src/jmGraph.js'
    ];
    console.log('service worker: run into install');
    
    event.waitUntil(caches.open(cacheName).then(function(cache)
    {
        cacheInstance = cache;
        cache.matchAll(cacheFiles).then(res => {
            console.log(res);
        });

        return Promise.all(cacheFiles.map(async function (k) {
            var res = await cache.match(k);
            // 缓存里没有才需要add 初始化
            if(res) {
                console.log(res);
            }
            else {
                return cache.add(k);
            }
            return Promise.resolve(res);
        }));

        //return cache.addAll(cacheFiles);
    }));
});

// 新的service worker线程被激活（其实和离线包一样存在"二次生效"的机理）
self.addEventListener('activate', function (event) {
    console.log('service worker: run into activate');
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (name) {
            // 注意这里cacheVersion也可以是一个数组
            if(name !== cacheName){
                console.log('service worker: clear cache' + name);
                return cacheInstance.delete(name);
            }
        }));
    }));
});

// 拦截请求并响应
self.addEventListener('fetch', function (event) {
    //console.log('service worker: run into fetch');
    return event.respondWith(new Promise((resolve, reject) => {
        var status = 0;
        fetchResource(event.request).then(res => {
            if(status) return;
            if(res.status == 200) {
                resolve && resolve(res);
                status = 1;
            }
        });

        cacheInstance.match(event.request).then(function (response) {
            if(status) return;
            // 发现匹配的响应缓存
            if(response){
                console.log(' service worker 匹配并读取缓存：' + event.request.url);
                //if(/\.html$/.test(event.request.url)) fetchResource(event.request); // 如果是html，依然去请求一次，缓存起来
                resolve && resolve(response);
                status = 1;
            }
        });
    }));
    var p1 = fetchResource(event.request);
    
    return event.respondWith(cacheInstance.match(event.request).then(function (response) {
        // 发现匹配的响应缓存
        if(response){
            console.log(' service worker 匹配并读取缓存：' + event.request.url);
            //if(/\.html$/.test(event.request.url)) fetchResource(event.request); // 如果是html，依然去请求一次，缓存起来
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
        //caches.open(cacheName).then(function (cache) {
            //console.log(cache);
            //cacheInstance.put(request, responseToCache);
        //});
        if(cacheInstance) {
            cacheInstance.put(request, responseToCache);
        }
        return response;
    });
}