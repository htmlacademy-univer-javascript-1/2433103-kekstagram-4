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

const correctTime = (time) => time.map(t => parseFloat((parseFloat(t.replace(':', '.'))).toFixed(2)));

const correctHours = (endTime) => {
  const hours = Math.floor(endTime / 60);
  const minutes = Math.round((endTime / 60 - hours) * 60);
  return parseFloat(`${hours}.${minutes}`).toFixed(2);
};
const formatTime = (timeNoFormat, minutes) => {
  const hoursCount = Math.round(minutes / 6);
  timeNoFormat += Math.round(minutes / 6);
  return (timeNoFormat - (hoursCount * 0.6)).toFixed(2);
};
const getMeetingEndTime = (meetingStart, meetingDuration) => {
  if (meetingDuration >= 60) {
    meetingDuration = correctHours(meetingDuration);
  }

  const meetingEndTimeNoFormat = parseFloat(meetingStart + parseFloat(meetingDuration));
  const minutes = (meetingEndTimeNoFormat - Math.floor(meetingEndTimeNoFormat)).toFixed(1) * 10;

  if (minutes > 6) {
    return formatTime(meetingEndTimeNoFormat, minutes);
  }
  return meetingEndTimeNoFormat;
};
const isMeetingInWorkingHours = (startTime, endTime, meetingStart, meetingDuration) => {
  const time = correctTime([startTime,endTime,meetingStart]);
  const meetingEnd = getMeetingEndTime(time[2], meetingDuration);
  const startTimeIndex = 0;
  const endTimeIndex = 1;
  const meetingStartIndex = 2;

  if (time[startTimeIndex] > time[meetingStartIndex]) {
    return false;
  }
  return time[endTimeIndex] >= meetingEnd;

};

//console.log(isMeetingInWorkingHours('08:10', '17:30', '14:50', 140)); // true

