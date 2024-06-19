const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.post('/run-batch', (req, res) => {
    const batFile = 'C:\\Users\\LP-T405\\Desktop\\WEB_DEV\\TOOLS\\Unzip.bat';
    exec(batFile, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing batch file: ${error}`);
            return res.status(500).send('Error executing batch file');
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Batch file executed successfully');
    });
});

app.listen(port, () => {
    console.log(`Local helper app listening at http://localhost:${port}`);
});
