// 오늘 날짜 구하기
export function isToday(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

// 이번주(월~일) 구하기
export function isThisWeek(date: Date) {
  const now = new Date();
  const first = now.getDate() - now.getDay() + 1; // 월요일
  const last = first + 6; // 일요일
  const monday = new Date(now.setDate(first));
  const sunday = new Date(now.setDate(last));
  return date >= monday && date <= sunday;
}
