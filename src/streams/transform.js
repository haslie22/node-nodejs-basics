import { Transform, pipeline } from 'stream';
import { EOL } from 'os';

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const transformedData = chunk
        .toString()
        .replace(EOL, '')
        .split('')
        .reverse()
        .join('');

      this.push(transformedData + EOL);
      callback();
    },
  });
  pipeline(process.stdin, transformStream, process.stdout, (err) => {
    throw err;
  });
};

await transform();
