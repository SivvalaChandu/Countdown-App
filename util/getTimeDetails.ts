export const getTimeDetails = (currentTime: number | Date) => {
  const date =
    currentTime instanceof Date ? currentTime : new Date(currentTime);

  const currentYear = date.getFullYear();
  const isLeapYear = (year: number): boolean =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDaysInYear = isLeapYear(currentYear) ? 366 : 365;

  const startOfYear = new Date(currentYear, 0, 1);
  const daysPassed = Math.ceil(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysLeftInYear = totalDaysInYear - daysPassed;
  const yearProgress = (daysPassed / totalDaysInYear) * 100 - 100;

  const currentMonth = date.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysLeftInMonth = daysInMonth - date.getDate();

  return {
    currentYear,
    daysLeftInYear,
    yearProgress,
    daysLeftInMonth,
  };
};
