// const getLineLength = (line, maxLength) => line.length <= maxLength;
//
// const isPalindrome = (line)  => {
//   line = line.toLowerCase().replaceAll(' ', '');
//   for (let i = 0; i < line.length; i++) {
//     if (line[line.length - 1 - i] !== line[i]) {
//       return false;
//     }
//   }
//   return true;
// };
// function getNumber(data) {
//   data = data.toString().replaceAll(' ','');
//   let result ='';
//   for (let i = 0; i < data.length; i++) {
//     if (!isNaN(Number(data[i]))) {
//       result += data[i];
//     }
//   }
//   return parseInt(result, 10);
// }

// ============ 5.16. Функции возвращаются

const correctTime = (time) => time.map(t => parseFloat((parseFloat(t.replace(/(\d*):(\d*)/, `$1.$2`))).toFixed(2)));

const correctHours = (endTime, minutesInHour) => {
  const hours = Math.floor(endTime / minutesInHour);
  const minutes = Math.round((endTime / minutesInHour - hours) * minutesInHour);
  return parseFloat(`${hours}.${minutes}`).toFixed(2);
};
const formatTime = (timeNoFormat, minutes, minutesInHour) => {
  const hoursCount = Math.round(minutes / minutesInHour / 10);
  timeNoFormat += Math.round(minutes / minutesInHour / 10);
  return (timeNoFormat - (hoursCount * minutesInHour / 100)).toFixed(2);
};
const getMeetingEndTime = (meetingStart, meetingDuration) => {
  const minutesInHour = 60;
  if (meetingDuration >= minutesInHour) {
    meetingDuration = correctHours(meetingDuration, minutesInHour);
  }

  const meetingEndTimeNoFormat = parseFloat(meetingStart + parseFloat(meetingDuration));
  const minutes = (meetingEndTimeNoFormat - Math.floor(meetingEndTimeNoFormat)).toFixed(1) * 10;

  if (minutes > 6) {
    return formatTime(meetingEndTimeNoFormat, minutes, minutesInHour);
  }
  return meetingEndTimeNoFormat;
};
const isMeetingInWorkingHours = (startTime, endTime, meetingStart, meetingDuration) => {
  const time = correctTime([startTime,endTime,meetingStart]);
  const startTimeIndex = 0;
  const endTimeIndex = 1;
  const meetingStartIndex = 2;
  const meetingEnd = getMeetingEndTime(time[2], meetingDuration);

  if (time[startTimeIndex] > time[meetingStartIndex]) {
    return false;
  }
  return time[endTimeIndex] >= meetingEnd;

};

console.log(isMeetingInWorkingHours('08:10', '17:30', '14:50', 140)); // true

