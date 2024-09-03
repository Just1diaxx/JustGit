const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const simpleGit = require('simple-git');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: "justgit-rounded.png"
  });

  mainWindow.loadFile('index.html');
});

ipcMain.handle('fetch-repos', async (event, username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error(`Error while fetching repositories of ${username}:`, error);
    return [];
  }
});

ipcMain.handle('fetch-repo-contents', async (event, repoFullName, folderPath) => {
  try {
    const url = `https://api.github.com/repos/${repoFullName}/contents/${folderPath}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error while fetching repository contents:', error);
    return [];
  }
});

ipcMain.handle('view-file-content', async (event, repoFullName, filePath) => {
  try {
    const url = `https://api.github.com/repos/${repoFullName}/contents/${filePath}`;
    const response = await axios.get(url);

    const content = Buffer.from(response.data.content, 'base64').toString();
    return content;
  } catch (error) {
    console.error('Error while loading file content:', error);
    return 'Error loading file content';
  }
});
