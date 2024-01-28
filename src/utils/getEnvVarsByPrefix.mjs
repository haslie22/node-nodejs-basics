function getEnvVarsByPrefix(template) {
  const envVars = process.env;

  const matchingVars = Object.keys(envVars)
    .filter((key) => key.includes(template))
    .reduce((obj, key) => {
      obj[key] = envVars[key];
      return obj;
    }, {});

  return matchingVars;
}

export default getEnvVarsByPrefix;
