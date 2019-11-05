if ('serviceWorker' in navigator) {
  /*
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (var item of registrations) {
          if (item.scope === 'http://localhost/fefeding/javascript/my_doc/demo/pwa/js/') {
              item.unregister();
          }
      }
      // 注销掉污染 Service Worker 之后再重新注册...
  });*/

    // register service worker
    // scope很关健，只有它下面的资源才可以匹配
    navigator.serviceWorker.register('service-worker.js?20191107', {
      //scope: 'http://localhost/fefeding/javascript/my_doc/demo/pwa/'
    }).then(reg => {
      console.log(reg);
    }).catch(err => {
      console.error(err);
    });
  
  }