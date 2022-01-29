import { ValidationError } from 'src/interface/Error';
import validator from 'validator';

const VALID_FIELD: ValidationError = {
  isValid: true,
  message: ''
};

export const isValidEmail = (email: string): ValidationError => {
  if (validator.isEmail(email)) {
    return VALID_FIELD;
  }

  return {
    isValid: false,
    message: 'You need to type correct email'
  };
};

export const isNotEmpty = (field: string): ValidationError => {
  if (field.length > 0) {
    return VALID_FIELD;
  }

  return {
    isValid: false,
    message: 'This field could not be empty'
  };
};

export const comparePassword = (
  password: string,
  confirmPassword: string
): ValidationError => {
  if (password === confirmPassword) {
    return VALID_FIELD;
  } else {
    return {
      isValid: false,
      message: 'Password does not match'
    };
  }
};

export const moreThenEight = (password: string): ValidationError => {
  if (password.length >= 8) {
    return VALID_FIELD;
  } else {
    return {
      isValid: false,
      message: 'Password should have more  than eight character'
    };
  }
};

export const isLibraryPresent = (libraryId: string, shelfId: string) => {
  if (libraryId && !shelfId) {
    return {
      isValid: false,
      message: 'Please put shelf where you want to insert your book'
    };
  }

  return VALID_FIELD;
};
