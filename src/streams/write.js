import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToWrite.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);
  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream);
};

await write();
