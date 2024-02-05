import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { rm } from 'fs/promises';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

import doesPathExist from '../utils/doesPathExist.mjs';

const FOLDER_NAME = 'files';
const INPUT_FILE_NAME = 'fileToCompress.txt';
const OUTPUT_FILE_NAME = 'archive.gz';

const ERROR_MESSAGE = 'Compressed file already exists';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputFilePath = join(__dirname, FOLDER_NAME, INPUT_FILE_NAME);
  const outputFilePath = join(__dirname, FOLDER_NAME, OUTPUT_FILE_NAME);

  const doesOutputFileExist = await doesPathExist(outputFilePath);

  if (doesOutputFileExist) {
    throw new Error(ERROR_MESSAGE);
  }

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gzipStream = createGzip();

  await pipeline(readStream, gzipStream, writeStream);
  await rm(inputFilePath);
};

await compress();
