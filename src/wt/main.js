import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'os';
import { Worker } from 'worker_threads';

import modifyWorkerOutput from '../utils/modifyWorkerOutput.mjs';

const FILE_NAME = 'worker.js';
const ERROR_MESSAGE = 'Worker error';
let START_NUM = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const cores = cpus();

  const workerPath = join(__dirname, FILE_NAME);

  const workerMessages = await Promise.allSettled(
    cores.map(() => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, {
          workerData: START_NUM++,
        });

        worker.on('message', (message) => {
          resolve(message);
        });

        worker.on('error', (error) => {
          console.error(`${ERROR_MESSAGE}: ${error}`);
          reject(error);
        });
      });
    })
  );

  const res = modifyWorkerOutput(workerMessages);
  console.log(res);
};

await performCalculations();
