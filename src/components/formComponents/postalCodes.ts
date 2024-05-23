type PostalCodeOptions = {
  format: string;
  pattern: RegExp;
};

const postalCodesMap = new Map<string, PostalCodeOptions>([
  ['JP', { pattern: /^\d{3}-\d{4}$/, format: 'NNN-NNNN' }],
  ['RU', { pattern: /^[0-9]{6}$/, format: 'NNNNNN' }],
  ['SE', { pattern: /^\d{3}[ ]?\d{2}$/, format: 'NNN NN' }],
]);

export default postalCodesMap;
