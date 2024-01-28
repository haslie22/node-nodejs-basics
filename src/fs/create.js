import { dirname, join } from 'path';
import { access, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fresh.txt';
const FILE_CONTENT = 'I am fresh and young';
const ERROR_MESSAGE = 'FS operation failed';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const newFilePath = join(__dirname, FOLDER_NAME, FILE_NAME);

  try {
    await access(newFilePath);
    throw new Error(ERROR_MESSAGE);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(newFilePath, FILE_CONTENT);
    } else {
      throw error;
    }
  }
};

await create();
