/* eslint-env browser */
/* eslint linebreak-style: 0*/
/* eslint no-unused-vars: 0*/
/* eslint max-len: 0*/
/* eslint require-jsdoc: 0*/
(function() {
  'use strict';

  var isSubscribed = false;
  var swRegistration;
  var pushButton = document.querySelector('#btnSubscribe');
  var applicationRootPubKey = 'BMjnmT3wvHrM7jg1IOUTy-F3ee_Kld_HgsBrJJMeyQlbH-mEastxn6IuA-SOn4jvrG7oX6oUfnsM1JSXGWWduBg';

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('service-worker.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initialiseUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

  function initialiseUI() {
    pushButton.addEventListener('click', function() {
      pushButton.disabled = true;
      if (isSubscribed) {
      // Unsubscribe user
      } else {
        subscribeUser();
      }
    });

  // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Push Messaging Blocked.';
      pushButton.disabled = true;
      updateSubscriptionOnServer(null);
      return;
    }
    if (isSubscribed) {
      pushButton.textContent = 'Disable Notifications';
      pushButton.classList.remove('mdl-color--blue');
      pushButton.classList.add('mdl-color--red-700');
      document.querySelector('#busSelection').setAttribute('disabled', 'true');
    } else {
      pushButton.textContent = 'Enable Notifications';
    }

    pushButton.disabled = false;
  }
  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationRootPubKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
  }
  function updateSubscriptionOnServer(subscription) {
  // Send subscription to application server

    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails =
    document.querySelector('.js-subscription-details');

    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      subscriptionDetails.classList.remove('is-invisible');
    } else {
      subscriptionDetails.classList.add('is-invisible');
    }
  }
})();
