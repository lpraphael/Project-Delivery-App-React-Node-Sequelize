export const validateName = (nameRegistered) => {
  const MIN_LENGTH = 12;
  return nameRegistered.length > MIN_LENGTH;
};
export const validateEmail = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
};

export const validatePassword = (password) => {
  const MIN_LENGTH = 6;
  return password.length >= MIN_LENGTH;
};
