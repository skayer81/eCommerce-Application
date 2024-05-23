import postalCodesMap from './postalCodes';

type PatternMessage = {
  pattern: {
    message: string;
    value: RegExp;
  };
  required: boolean;
};

export default function getPostalCodePattern(countryCode: string): PatternMessage {
  const postalCodeOptions = postalCodesMap.get(countryCode);

  if (!postalCodeOptions) {
    throw new Error(`postalCodeOptions is undefined`);
  }
  const formattedPatternMessage = {
    pattern: {
      message: `The postal code value must be in the format: ${postalCodeOptions.format}`,
      value: postalCodeOptions.pattern,
    },
    required: true,
  };
  return formattedPatternMessage;
}
