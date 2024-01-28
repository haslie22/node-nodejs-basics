import { dirname, join } from 'path';
import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';

import doesFileExist from '../utils/doesFileExist.mjs';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRemove.txt';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);
  const isFilePresent = await doesFileExist(filePath);

  if (!isFilePresent) {
    throw new Error(ERROR_MESSAGE);
  }

  await rm(filePath);
};

await remove();
