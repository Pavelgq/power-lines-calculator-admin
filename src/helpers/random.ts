export const getRandomFrom = (values: string[]): string => {
  const l = values.length;
  const index = Math.floor(Math.random() * l);

  return values[index];
};
