import * as bcrypt from 'bcrypt';

export const getHash = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
};

export const compare = async (
  plainText: string,
  hashedText: string,
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashedText);
};
