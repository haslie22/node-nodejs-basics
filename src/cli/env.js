import getEnvVarsByPrefix from '../utils/getEnvVarsByPrefix.mjs';

const PREFIX = 'RSS_';

const parseEnv = () => {
  const templateVars = getEnvVarsByPrefix(PREFIX);

  const output = Object.entries(templateVars)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');

  console.log(output);
};

parseEnv();
