import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';

//格式化播放数据
export function formatCount(count) {
  if(!count) return ''
  if (count > 100000000) {
    return `${Math.floor((count / 100000000) * 100) / 100}亿`;
  }
  if (count > 100000) {
    return `${Math.floor((count / 10000) * 10) / 10}万`; // 232.1 万
  }
  if (count > 10000) {
    return `${Math.floor((count / 10000) * 100) / 100}万`; // 2.3 万
  }
  return count;
}

export function formatDate(timestamp, format = 'YYYY-MM-DD') {
  if (!timestamp) return '';
  return dayjs(timestamp).format(format);
}

//格式化时间
export function formatTime(Milliseconds, format = 'HH:MM:SS') {
  if (!Milliseconds) return '';
  dayjs.extend(duration);

  let time = dayjs.duration(Milliseconds);
  let hours = time.hours().toString();
  let mins = time.minutes().toString();
  let seconds = time.seconds().toString().padStart(2, '0');

  if (format === 'HH:MM:SS') {
    return hours !== '0'
      ? `${hours}:${mins.padStart(2, '0')}:${seconds}`
      : `${mins}:${seconds}`;
  } else if (format === 'Human') {
    
    let  hoursUnit = '小时';
    let  minitesUnit = '分钟';

    return hours !== '0'
      ? `${hours} ${hoursUnit} ${mins} ${minitesUnit}`
      : `${mins} ${minitesUnit}`;
  }
};