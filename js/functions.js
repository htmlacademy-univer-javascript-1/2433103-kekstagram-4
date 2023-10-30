const getLineLength = (line, maxLength) => line.length <= maxLength;

const isPalindrome = (line)  => {
  line = line.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < line.length; i++) {
    if (line[line.length - 1 - i] !== line[i]) {
      return false;
    }
  }
  return true;
};
function getNumber(data) {
  data = data.toString().replaceAll(' ','');
  let result ='';
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(Number(data[i]))) {
      result += data[i];
    }
  }
  return parseInt(result, 10);
}

