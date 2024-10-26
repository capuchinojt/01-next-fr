export const getUsernameFromEmail = (email: string) => {
  if (typeof email !== 'string') {
    throw new Error('Input must be a string');
  }

  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    throw new Error('Invalid email address');
  }

  return email.substring(0, atIndex);
}