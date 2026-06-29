# Veyr Runner Windows app build

This wraps the current HTML, CSS, and JavaScript game in Electron so it can run as a Windows desktop app without a browser.

## Quick test on Windows

Install Node.js LTS first, then open PowerShell in this folder:

```powershell
npm install
npm run app:win
```

You can also double click:

```text
RUN_WINDOWS_APP.bat
```

## Build an installer for friends

On a Windows machine:

```powershell
npm install
npm run dist:win
```

You can also double click:

```text
BUILD_WINDOWS_APP.bat
```

The build goes into the `dist` folder.

Send friends one of these:

```text
Veyr Runner Setup 0.1.0.exe
Veyr Runner Portable 0.1.0.exe
```

The setup EXE installs shortcuts. The portable EXE runs without installing.

## Notes

The app runs offline after it is built. The first build needs internet because npm downloads Electron and electron-builder.

The Windows build is unsigned. Windows SmartScreen may warn friends the first time they open it. That is normal for unsigned indie builds. For a normal public release, code sign the installer with a Windows code signing certificate.

Build on Windows for the lowest friction. Cross building Windows installers from macOS can be annoying because signing and installer tools are more fragile there.
