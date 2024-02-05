const START_INDEX = 2;
const OFFSET = 2;

const parseArgs = () => {
  const argsPairs = [];

  for (let i = START_INDEX; i < process.argv.length; i += OFFSET) {
    argsPairs.push(
      `${process.argv[i].slice(START_INDEX)} is ${process.argv[i + 1]}`
    );
  }

  const output = argsPairs.join(', ');
  console.log(output);
};

parseArgs();
