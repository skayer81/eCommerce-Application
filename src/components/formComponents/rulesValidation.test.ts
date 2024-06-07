import { FieldValues } from 'react-hook-form';

import { describe, expect, it } from 'vitest';

import RulesValidation from './rulesValidation';

const dataValid = RulesValidation.dateOfbirth.validate;
const passwordValidation = RulesValidation.password?.validate;

describe('RulesValidation', () => {
  it('should return error for empty password', () => {
    const testPassword = '';
    if (typeof passwordValidation !== 'function') {
      return;
    }
    const test: FieldValues = {
      test: '',
    };
    const isTestDataValid = passwordValidation(testPassword, test);
    expect(isTestDataValid).toBe('Required field');
  });
  it('should return error for password contain spaces', () => {
    const testPassword = ' 1111 ';
    if (typeof passwordValidation !== 'function') {
      return;
    }
    const test: FieldValues = {
      test: '',
    };
    const isTestDataValid = passwordValidation(testPassword, test);
    expect(isTestDataValid).toBe('Password must not contain spaces at the beginning');
  });
  it('should return error for date', () => {
    const date = new Date();
    if (typeof dataValid !== 'function') {
      return;
    }
    const test: FieldValues = {
      test: '',
    };
    const isTestDataValid = dataValid(date, test);
    expect(isTestDataValid).toBe(
      `It's too early for you to come here, come back when you're 13 years old`,
    );
  });
});
