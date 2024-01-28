import { access } from 'fs/promises';

const doesFileExist = async (path) => {
  let fileExists = true;

  try {
    await access(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fileExists = false;
    } else {
      throw error;
    }
  }
  return fileExists;
};

export default doesFileExist;
