import { RegisterOptions } from 'react-hook-form';

import { Dayjs } from 'dayjs';

type RulesValidationType = {
  [key in string]: RegisterOptions;
};

const RulesValidation: RulesValidationType = {
  /**
   * mail - валидация почты по паттерну,
   * onlyLetters - минимум 1 латинская буква без спецсимволов и цифр
   */
  required: {
    required: 'Required field',
  },

  mail: {
    pattern: {
      message: 'Please enter a valid email address',
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    required: 'Required field',
  },

  onlyLetters: {
    minLength: {
      message: 'The field must have at least 1 character',
      value: 1,
    },
    pattern: {
      message: 'The field must contain only Latin letters',
      value: /^[A-Za-z]+$/,
    },
    required: 'Required field',
  },

  lettersNumbersAndSpecialCharacter: {
    minLength: {
      message: 'The field must have at least 1 character',
      value: 1,
    },
    pattern: {
      message: 'The field must contain only Latin letters, numbers and special character',
      value: /^[A-Za-z0-9 !"#$%&'()*+,-./:_`]+$/,
    },
    required: 'Required field',
  },

  password: {
    validate: (value: string) => {
      const minLength = 8;
      const digit = /(?=.*[0-9])/;
      const lowercase = /(?=.*[a-z])/;
      const uppercase = /(?=.*[A-Z])/;

      if (value.trimStart().length != value.length) {
        return 'Password must not contain spaces at the beginning';
      }
      if (value.trimEnd().length != value.length) {
        return 'Password must not contain spaces at the end';
      }

      if (!value) {
        return 'Required field';
      }
      let result = digit.test(value);
      if (!result) {
        return 'Password must contain at least 1 number';
      }
      result = lowercase.test(value);
      if (!result) {
        return 'Password must contain at least 1 lowercase  Latin letter';
      }
      result = uppercase.test(value);
      if (!result) {
        return 'Password must contain at least 1 uppercase Latin letter';
      }
      if (value.length < minLength) {
        return 'Password must be at least 8 characters long';
      }
      return true;
    },
  },

  dateOfbirth: {
    validate: (value: Dayjs) => {
      const ENTRY_AGE = 13;
      const date = new Date(value.toString());
      const entryDate = date.setFullYear(date.getFullYear() + ENTRY_AGE);
      if (entryDate > new Date().getTime()) {
        return `It's too early for you to come here, come back when you're ${ENTRY_AGE} years old`;
      }
      return true;
    },
    required: 'Required field',
  },
  postCodeRU: {
    pattern: {
      message: 'The postal code value must be in the format: NNNNNN',
      value: /^[0-9]{6}$/,
    },
    required: 'Required field',
  },

  postCodeZA: {
    pattern: {
      message: 'The postal code value must be in the format: XXXXX',
      value: /^[0-9]{5}$/,
    },
    required: 'Required field',
  },

  postCodeCN: {
    pattern: {
      message: 'The postal code value must be in the format: XXX-XXX',
      value: /^[0-9]{3}-[0-9]{3}$/,
    },
    required: 'Required field',
  },

  postCodeJP: {
    pattern: {
      message: 'The postal code value must be in the format: NNN-NNNN',
      value: /^\d{3}-\d{4}$/,
    },
    required: 'Required field',
  },

  postCodeSE: {
    pattern: {
      message: 'The postal code value must be in the format: NNN NN',
      value: /^\d{3}[ ]?\d{2}$/,
    },
    required: 'Required field',
  },
};

export default RulesValidation;
