# Veyr Runner macOS app build

This wraps the current HTML, CSS, and JavaScript game in Electron so it can run as a macOS desktop app without a browser.

## Quick test

```bash
npm install
npm run app:mac
```

You can also double click:

```text
RUN_MAC_APP.command
```

## Build installer for friends

```bash
npm run dist:mac
```

You can also double click:

```text
BUILD_MAC_APP.command
```

Send the `.dmg` from the `dist` folder.

The built app runs offline. The first build needs internet because npm downloads Electron and electron-builder.

The app is unsigned. On another Mac, Gatekeeper may block it the first time. Right click the app and choose Open. For a normal public release, sign and notarize it with an Apple Developer account.

Architecture note: `npm run dist:mac` builds for the Mac you run it on. Use `npm run dist:mac:arm64` for Apple Silicon or `npm run dist:mac:x64` for Intel.
