import * as argon2 from 'argon2';

function getHash(password: string): Promise<string> {
  return argon2.hash(password);
}

function getCompare(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

export default { getHash, getCompare };
