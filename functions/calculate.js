const { spawn } = require('child_process');

const pretext = 'You are a kind person, but I still think of you as a friend.';

const process = spawn('python', ['functions/aiModel.py', pretext]);

process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});