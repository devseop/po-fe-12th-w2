export const converDate = (date: string) => {
  const createdDate = new Date(date);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth();
  const day = createdDate.getDate();

  return `${year}. ${month}. ${day}`;
};
