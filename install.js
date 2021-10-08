var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'RetroChat',
  description: 'Node JS RetroChat server.',
  script: 'C:\\NodeApps\\RetroChat\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();