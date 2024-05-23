type PostalCodeOptions = {
  code: string;
  format: string;
  name: string;
  pattern: RegExp;
};

const postalCodesMap: Array<PostalCodeOptions> = [
  { code: 'RU', pattern: /^[0-9]{6}$/, format: 'NNNNNN', name: 'Russia' },
  { code: 'JP', pattern: /^\d{3}-\d{4}$/, format: 'NNN-NNNN', name: 'Japan' },
  { code: 'SE', pattern: /^\d{3}[ ]?\d{2}$/, format: 'NNN NN', name: 'Sweden' },
];

export default postalCodesMap;
