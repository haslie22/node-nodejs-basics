import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToRead.txt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);
  const readStream = createReadStream(filePath, 'utf-8');

  readStream.pipe(process.stdout);
};

await read();
