/* eslint-env browser */
/* eslint linebreak-style: [2, "windows"]*/
/* eslint no-unused-vars: 0*/
(function() {
  'use strict';

  var isSubscribed = false;
  var swRegistration;
  var pushButton = document.querySelector('#btnSubscribe');

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('service-worker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
})();
