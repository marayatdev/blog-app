import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * แปลงวันที่เป็น "DD/MM/YYYY HH:mm" (เวลาไทย UTC+7)
 * ตัวอย่าง: 14/09/2025 15:18
 */
export const formatDateTH = (date: string | Date) => {
  return dayjs(date)
    .tz("Asia/Bangkok") // ตั้ง timezone เป็นไทย
    .format("DD/MM/YYYY HH:mm"); // 24 ชั่วโมง
};
