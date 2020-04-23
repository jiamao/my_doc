import { registerMicroApps, start } from 'qiankun';

function render({ appContent, loading }) {
  const container = document.getElementById('container');
  ReactDOM.render(<Framework loading={loading} content={appContent} />, container);
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    render,
    activeRule: genActiveRule('/react'),
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    render,
    activeRule: genActiveRule('/vue'),
  },
]);

start();