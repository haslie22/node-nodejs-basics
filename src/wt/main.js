import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { cpus } from 'os';
import { Worker } from 'worker_threads';

const statuses = {
  RESOLVED: 'resolved',
  ERROR: 'error',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const START_NUM = 10;
const FILE_NAME = 'worker.js';
const ERROR_MESSAGE = 'Worker error';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const coresNum = cpus().length;
  const results = [];

  const workerPath = join(__dirname, FILE_NAME);

  for (let i = 0; i < coresNum; i++) {
    const workerRes = await new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: START_NUM + i,
      });

      worker.on('message', (message) => {
        resolve({ status: statuses.RESOLVED, message });
      });

      worker.on('error', (error) => {
        console.error(`${ERROR_MESSAGE}: ${error}`);
        reject({ status: statuses.ERROR, data: null });
      });
    });

    results.push(workerRes);
  }

  Promise.allSettled(results)
    .then((results) => {
      const formattedResults = results.map((result) =>
        result.status === statuses.FULFILLED
          ? { status: statuses.RESOLVED, data: result.value.message }
          : { status: statuses.ERROR, data: null }
      );

      console.log(formattedResults);
    })
    .catch((err) => {
      throw err;
    });
};

await performCalculations();
