export const formatePhone = (phone: string) => {
  const cleaned = (`${  phone}`).replace(/\D/g, '');
  const match = cleaned.match(/^(8|\+7|)?(\d{3})(\d{3})(\d{4})$/);
  let number;
  if (match) {
    const intlCode = ('+7 ');
    number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return number;
} 