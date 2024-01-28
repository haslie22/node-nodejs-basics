import { dirname, join } from 'path';
import { mkdir, readdir, copyFile } from 'fs/promises';
import { fileURLToPath } from 'url';

import doesFileExist from '../utils/doesFileExist.mjs';

const FOLDER_NAME = 'files';
const COPY_FOLDER_NAME = 'files_copy';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const folderPath = join(__dirname, FOLDER_NAME);
  const copyFolderPath = join(__dirname, COPY_FOLDER_NAME);

  const doesFolderExist = await doesFileExist(folderPath);
  const doesCopyFolderExist = await doesFileExist(copyFolderPath);

  if (!doesFolderExist || doesCopyFolderExist) {
    throw new Error(ERROR_MESSAGE);
  }

  await mkdir(copyFolderPath);

  const files = await readdir(folderPath);
  for (const file of files) {
    const filePath = join(folderPath, file);
    const copyFilePath = join(copyFolderPath, file);
    await copyFile(filePath, copyFilePath);
  }
};

await copy();
