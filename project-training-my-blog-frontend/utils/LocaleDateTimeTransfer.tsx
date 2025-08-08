import { formatInTimeZone } from 'date-fns-tz';

export default function LocaleDateTimeTransferUtility(dateInput?: string) {
  if (!dateInput) return '';

  const date = new Date(dateInput);
  return formatInTimeZone(date, 'Asia/Taipei', 'yyyy-MM-dd HH:mm:ss');
}