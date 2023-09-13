import * as bcrypt from 'bcrypt';

function getHash(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

function getCompare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(hash, password);
}

export default { getHash, getCompare };
