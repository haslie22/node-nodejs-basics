import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { rm } from 'fs/promises';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';

import doesPathExist from '../utils/doesPathExist.mjs';

const FOLDER_NAME = 'files';
const INPUT_FILE_NAME = 'archive.gz';
const OUTPUT_FILE_NAME = 'fileToCompress.txt';

const ERROR_MESSAGE = 'File to decompress does not exist';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFilePath = join(__dirname, FOLDER_NAME, INPUT_FILE_NAME);
  const outputFilePath = join(__dirname, FOLDER_NAME, OUTPUT_FILE_NAME);

  const doesInputFileExist = await doesPathExist(inputFilePath);

  if (!doesInputFileExist) {
    throw new Error(ERROR_MESSAGE);
  }

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gunzipStream = createGunzip();

  await pipeline(readStream, gunzipStream, writeStream);
  await rm(inputFilePath);
};

await decompress();
