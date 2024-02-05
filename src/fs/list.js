import { dirname, join } from 'path';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';

import doesPathExist from '../utils/doesPathExist.mjs';

const FOLDER_NAME = 'files';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = join(__dirname, FOLDER_NAME);
  const doesFolderExist = await doesPathExist(folderPath);

  if (!doesFolderExist) {
    throw new Error(ERROR_MESSAGE);
  }

  const fileNames = await readdir(folderPath);
  console.log(fileNames);
};

await list();
