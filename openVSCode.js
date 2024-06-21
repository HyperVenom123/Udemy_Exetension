const { exec } = require('child_process');

// Specify the folder path you want to open
const folderPath = 'C:/Users/LP-T405/Desktop/WEB_DEV/WEB_DEV';

// Command to open Visual Studio Code with the specified folder
const command = `code "${folderPath}"`;

// Execute the command
exec(command, async (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Visual Studio Code opened with ${folderPath}`);

  // Wait a short while before focusing on the VS Code window
  setTimeout(async () => {
    try {
      const activeWin = require('active-win');

      const window = await activeWin();
      if (window && window.title.includes('Visual Studio Code')) {
        const focusWindowCommand = `
          powershell -Command "$codeWindow = Get-Process -Name Code | Select-Object -First 1; 
          if ($codeWindow) { 
            $hwnd = $codeWindow.MainWindowHandle; 
            [void] [System.Runtime.InteropServices.Marshal]::PtrToStructure($hwnd, [Type][System.IntPtr]); 
            [void] [System.Runtime.InteropServices.Marshal]::PtrToStructure($hwnd, [Type][System.IntPtr]);
            [System.Windows.Forms.SendKeys]::SendWait('%{TAB}'); 
          }"`;
        exec(focusWindowCommand, (focusError, focusStdout, focusStderr) => {
          if (focusError) {
            console.error(`Focus error: ${focusError.message}`);
            return;
          }
          if (focusStderr) {
            console.error(`Focus stderr: ${focusStderr}`);
            return;
          }
          console.log('Visual Studio Code window is now in focus.');
        });
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }, 100); // Adjust the timeout as necessary to ensure the window has opened
});
