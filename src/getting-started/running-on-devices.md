---
title: Running on Devices
---

# {{ $frontmatter.title }}

## Running on desktop

You can run your app on desktop by starting the development server with the following command:

```bash
npm run dev
```

Also, you should enable mouse interactions based on the instructions provided in the [Interactivity](/getting-started/interactivity) section of our documentation. This will allow you to test your app's interactivity using a mouse.

You should use a Chromium-based browser, such as Google Chrome or Microsoft Edge, to run your app on desktop. These browsers provide the best support for WebXR and related technologies, ensuring that you can fully experience the features of your AR/VR application.

Use browser extension [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) to debug using DevTools.

## Running your app on XR devices

In order to test your app on XR devices, like Meta Quest, iPhone Pro or Microsoft HoloLens, you need to 
run your app on HTTPS. This is required because XR devices require a secure context to access device features such as camera, sensors, and other hardware capabilities.

You can use [ngrok](https://ngrok.com/) to create a secure tunnel to your local development server. This allows you to access your app from your XR device using a public URL.

To be able to use your Vite app with _ngrok_, add `vite.config.js` file to the root of your project with the following content:

```js
import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        allowedHosts: ['.ngrok-free.app']
    },
})
```

Then, start your development server with the following command:

```bash
npm run dev
```

Then, start _ngrok_ based on the instructions provided on their website. You will receive a public URL that you can use to access your app from your XR device.

Use these web browsers to open the URL on your XR device:
- Meta Quest: the default "Browser" app
- iPhone Pro, iPad Pro: [Mozilla WebXR Viewer](https://apps.apple.com/cz/app/webxr-viewer/id1295998056)
- Android device: the default Chrome browser or Samsung Internet browser
