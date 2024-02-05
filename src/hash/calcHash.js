import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';

const FOLDER_NAME = 'files';
const FILE_NAME = 'fileToCalculateHashFor.txt';
const ALGO = 'sha256';
const ENCODING = 'hex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, FOLDER_NAME, FILE_NAME);

  const hash = createHash(ALGO);
  const input = createReadStream(filePath, 'utf-8');

  input.on('readable', () => {
    const data = input.read();
    if (data) {
      hash.update(data);
    } else {
      const hashSum = hash.digest(ENCODING);
      console.log(hashSum);
    }
  });
};

await calculateHash();
