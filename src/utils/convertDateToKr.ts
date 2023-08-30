export const converDateToKr = (date: string) => {
  const createdDate = new Date(date);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth();
  const day = createdDate.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
