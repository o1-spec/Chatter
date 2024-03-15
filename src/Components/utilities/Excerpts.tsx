export const Excerpts = (str: string, count: number) => {
  if (str.length > count) {
    str = str.substring(0, count) + " ... ";
  }
  return str;
};
