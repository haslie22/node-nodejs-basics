import { dirname, join } from 'path';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

import doesFileExist from '../utils/doesFileExist.mjs';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const newFilePath = join(__dirname, FOLDER_NAME, FILE_NAME);
  const fileExists = await doesFileExist(newFilePath);

  if (fileExists) {
    throw new Error(ERROR_MESSAGE);
  }

  await writeFile(newFilePath, FILE_CONTENT);
};

await create();
