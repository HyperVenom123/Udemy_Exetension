const chokidar = require('chokidar');
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const sourceFolder = 'C:/Users/LP-T405/Desktop/WEB_DEV/ZIP'; // Replace with your source folder path
const destinationFolder = 'C:/Users/LP-T405/Desktop/WEB_DEV/WEB_DEV'; // Replace with your destination folder path

// Ensure the destination folder exists
if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
}

// Initialize the watcher
const watcher = chokidar.watch(sourceFolder, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    }
});

// Event listener for added files
watcher.on('add', filePath => {
    if (path.extname(filePath) === '.zip') {
        console.log(`New zip file detected: ${filePath}`);
        extractZip(filePath, destinationFolder);
    }
});

// Function to extract the zip file
function extractZip(zipPath, destination) {
    try {
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(destination, true);
        console.log(`Extracted: ${zipPath} to ${destination}`);
    } catch (err) {
        console.error(`Error extracting ${zipPath}:`, err);
    }
}

console.log(`Watching for zip files in ${sourceFolder}...`);
