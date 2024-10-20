export const isValidDate = (dateStr: string): boolean => {
    // соответствует ли строка шаблону даты ДД.ММ.ГГГГ
    const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!datePattern.test(dateStr)) {
      return false;
    }
  
    const [dayStr, monthStr, yearStr] = dateStr.split(".");
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
  
    // месяц находится в диапазоне от 1 до 12
    if (month < 1 || month > 12) {
      return false;
    }
  
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    //високосный год для февраля
    if (month === 2) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (isLeapYear) {
        daysInMonth[1] = 29; 
      }
    }

    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }

    return true;
  };
  

export const isValidDistance = (distanceStr: string): boolean => {
  const distancePattern = /^\d*\.?\d*?$/;
  return distancePattern.test(distanceStr);
};
