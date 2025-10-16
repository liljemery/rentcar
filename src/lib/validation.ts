export const validationCedula: (cedula: string) => boolean = (cedula) => {
  const cleanCedula = cedula.replace(/[-\s]/g, "");

  if (!/^\d{11}$/.test(cleanCedula)) {
    return false;
  }

  const digits = cleanCedula.substring(0, 10).split("").map(Number);
  const lastDigit = Number(cleanCedula.charAt(10));

  const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

  const sum = digits.reduce((acc, digit, index) => {
    let product = digit * weights[index];
    if (product >= 10) {
      product = Math.floor(product / 10) + (product % 10);
    }
    return acc + product;
  }, 0);

  const remainder = sum % 10;
  const checkDigit = remainder === 0 ? 0 : 10 - remainder;

  return checkDigit === lastDigit;
};

