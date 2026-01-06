const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const kebabCaseToPascal = (input: string) => {
  return input.split('-').map(capitalizeFirstLetter).join('');
};

export const toKebabCase = (input: string) => {
  return input.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};
