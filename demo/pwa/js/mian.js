if ('serviceWorker' in navigator) {
  alert('test serviceWorker');
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (var item of registrations) {
          if (item.scope === 'http://localhost/fefeding/javascript/my_doc/demo/pwa/') {
             // item.unregister();
          }
      }
      // 注销掉污染 Service Worker 之后再重新注册...

      install();
  });


  function install() {
    // register service worker
    // scope很关健，只有它下面的资源才可以匹配
    navigator.serviceWorker.register('service-worker.js?20170117', {
      //scope: 'http://localhost/fefeding/javascript/my_doc/demo/pwa/'
    }).then(reg => {
      console.log(reg);
    }).catch(err => {
      console.error(err);
    });
  
  }
}