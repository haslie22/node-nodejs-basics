import fsPromises from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import doesPathExist from '../utils/doesPathExist.mjs';

const FOLDER_NAME = 'files';
const PREV_FILE_NAME = 'wrongFilename.txt';
const NEW_FILE_NAME = 'properFilename.md';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const prevFilePath = join(__dirname, FOLDER_NAME, PREV_FILE_NAME);
  const newFilePath = join(__dirname, FOLDER_NAME, NEW_FILE_NAME);

  const doesPrevFileExist = await doesPathExist(prevFilePath);
  const doesNewFileExist = await doesPathExist(newFilePath);

  if (!doesPrevFileExist || doesNewFileExist) {
    throw new Error(ERROR_MESSAGE);
  }

  await fsPromises.rename(prevFilePath, newFilePath);
};

await rename();
