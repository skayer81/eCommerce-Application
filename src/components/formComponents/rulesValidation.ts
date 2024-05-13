const RulesValidation = {
  /**
   * mail - валидация почты по паттерну,
   * onlyLetters - минимум 1 латинская буква без спецсимволов и цифр
   */
  required: {
    required: 'Required field',
  },

  mail: {
    pattern: {
      message: 'Please enter a valid address',
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    required: 'Email is required',
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
      message: 'The field must contain only Latin letters and special character',
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
      const whitespace = new RegExp(/^s+|s+$/g);
      let result = digit.test(value);
      if (!result) {
        return 'Password must contain at least 1 number';
      }
      result = lowercase.test(value);
      if (!result) {
        return 'Password must contain at least 1 lowercase letter';
      }
      result = uppercase.test(value);
      if (!result) {
        return 'Password must contain at least 1 uppercase letter';
      }
      result = whitespace.test(value);
      if (result) {
        return 'Password must not contain leading or trailing whitespace';
      }
      if (value.length < minLength) {
        return 'Password must be at least 8 characters long';
      }
      return true;
    },
  },
};

export default RulesValidation;
