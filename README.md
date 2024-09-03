![](https://github.com/user-attachments/assets/3b5b324e-a1d5-46ee-af19-aa1c1d5bd173)


**What JustGit is**

JustGit is born as a simple program in node.js and electron to view and clone github repositories.

**How to compile**

1) Download node.js

2) Execute `npm install` on project folder to install necessary dependencies

3) Execute `npm run build` to build the project and get an executable for your machine

To select operating system during the build, execute `npx electron-builder` `-w` (Windows EXE) `-m` (MacOS DMG) `-l` (Linux Appimage)

Attention: MacOS building is allowed only in MacOS machines due to file signing.
