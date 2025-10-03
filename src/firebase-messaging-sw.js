// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBW0UzWN1yYidUi8j2_pMCRBsipCQkvxHQ",
    authDomain: "travel-mate-8412e.firebaseapp.com",
    projectId: "travel-mate-8412e",
    storageBucket: "travel-mate-8412e.firebasestorage.app",
    messagingSenderId: "727502703548",
    appId: "1:727502703548:web:a8e73173c2d33b21b0f9b9",
    measurementId: "G-KPESFVKP9C",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message: ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/assets/icons/icon-72x72.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
