import moment from "moment-timezone";

const checkIfToday = (dateMessage, dateNow, day, month, year) => {
  const today = new Date();
  const userTimezone = moment.tz.guess();
  const nowDay = moment(today).tz(userTimezone).format("D");
  const nowMonth = moment(today).tz(userTimezone).format("MMMM");
  const nowYear = moment(today).tz(userTimezone).format("YYYY");

  if (dateMessage === dateNow) return "today";
  else if (day === nowDay + 1 && year === nowYear && month === nowMonth)
    return "yesterday";
  else return `${month} ${day}`;
};

const getDate = (date) => {
  let finalString;

  const today = new Date();
  const userTimezone = moment.tz.guess();
  const timeMessage = moment(date).tz(userTimezone).format("h:mm a");

  const dateMessage = moment(date).tz(userTimezone).format("MMM D YYYY");
  const dateNow = moment(today).tz(userTimezone).format("MMM D YYYY");

  const yearNow = moment(today).tz(userTimezone).format("YYYY");
  const day = moment(date).tz(userTimezone).format("D");
  const month = moment(date).tz(userTimezone).format("MMM");
  const year = moment(date).tz(userTimezone).format("YYYY");

  const messageDay = checkIfToday(dateMessage, dateNow, day, month, year);

  // check if it is yesterday
  if (messageDay === "today" || messageDay === "yesterday") {
    finalString = `${messageDay} at ${timeMessage}`;
  } else {
    finalString = `${month} ${day}${
      year !== yearNow ? ", " + year : ""
    } at ${timeMessage}`;
  }

  // console.log(finalString);
  return finalString;
};

export default getDate;
