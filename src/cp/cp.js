import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { fork, spawn } from 'child_process';

const FOLDER_NAME = 'files';
const FILE_NAME = 'script.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const childPath = join(__dirname, FOLDER_NAME, FILE_NAME);

  const childPr = fork(childPath, args, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  childPr.stdout.pipe(process.stdout);
  process.stdin.pipe(childPr.stdin);
};

spawnChildProcess(['avocado', 'corn', 'tomato', 'carrot', 'eggplant']);
