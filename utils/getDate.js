const checkIfToday = (
  todayDay,
  messageDay,
  todayMonth,
  messageMonth,
  todayYear,
  messageYear
) => {
  if (
    todayDay === messageDay &&
    todayYear === messageYear &&
    todayMonth === messageMonth
  )
    return "today";
  else if (
    todayDay === messageDay + 1 &&
    todayYear === messageYear &&
    todayMonth === messageMonth
  )
    return "yesterday";
  else return messageDay;
};

const getDate = (date) => {
  let finalString;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = months[today.getMonth()];
  const todayYear = today.getFullYear();

  const messageYear = parseInt(date?.slice(0, 4));
  const messageMonth = months[parseInt(date?.slice(5, 7)) - 1];
  const messageDay = checkIfToday(
    todayDay,
    parseInt(date?.slice(8, 10)),
    todayMonth,
    messageMonth,
    todayYear,
    messageYear
  );
  const messageTime = date?.slice(14, 19);

  // check if it is yesterday
  if (messageDay === "today" || messageDay === "yesterday") {
    finalString = `${messageDay} at ${messageTime}`;
  } else {
    finalString = `${messageMonth} ${messageDay}${
      messageYear !== todayYear ? ", " + messageYear : ""
    } at ${messageTime}`;
  }

  // console.log(finalString);
  return finalString;
};

export default getDate;
