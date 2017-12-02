/* eslint-env browser */
/* eslint linebreak-style: 0*/
/* eslint no-unused-vars: 0*/
/* eslint max-len: 0*/
/* eslint require-jsdoc: 0*/
(function() {
  'use strict';

  var isSubscribed = false;
  var swRegistration;
  var alert = document.querySelector('#alerts');
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
        unsubscribeUser();
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
      pushButton.setAttribute('disabled', 'true');
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
      pushButton.classList.remove('mdl-color--red-700');
      pushButton.classList.add('mdl-color--blue');
      document.querySelector('#busSelection').removeAttribute('disabled');
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

  function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      updateSubscriptionOnServer(null);
      console.log('User is unsubscribed.');
      isSubscribed = false;
      updateBtn();
    });
  }

  function updateSubscriptionOnServer(subscription) {
    // Send subscription to application server
    if (subscription) {
      console.log(JSON.stringify(subscription));
    } else {
      console.log(JSON.stringify('{noSubscription}'));
    }
  }
})();
