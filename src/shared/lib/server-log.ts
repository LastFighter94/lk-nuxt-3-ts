export function serverLog(data: any, isError = false) {
  let message = data;

  if (data && typeof data === 'object') {
    message = JSON.stringify(data);
  }

  const logData = {
    Level: isError ? 'Error' : 'Info',
    Date: formDate(),
    message,
  };

  if (process.server) {
    // eslint-disable-next-line
    console.log(JSON.stringify(logData));
  } else if (isError) {
    // eslint-disable-next-line
    console.error(logData);
  } else {
    // eslint-disable-next-line
    console.log(logData);
  }
}

function formDate() {
  // @ts-ignore
  const formNumber = (number) => (number >= 10 ? number : `0${number}`);

  const d = new Date();
  const miliseconds = `.${d.getMilliseconds()}+03:00`;
  let date = [];
  let time = [];

  date.push(formNumber(d.getFullYear()));
  date.push(formNumber(d.getMonth() + 1));
  date.push(formNumber(d.getDate()));

  time.push(formNumber(d.getHours()));
  time.push(formNumber(d.getMinutes()));
  time.push(formNumber(d.getSeconds()));

  // @ts-ignore
  date = date.join('-');
  // @ts-ignore
  time = time.join(':') + miliseconds;

  return `${date}T${time}`;
}
