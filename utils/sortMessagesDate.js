import getDate from "./getDate";

const sortMessagesDate = (messages) => {
  // get dates
  const dateArr = messages?.map((item) => {
    const date = getDate(item.createdAt);
    const justTheDay = date?.slice(0, date.indexOf("at") - 1);
    // console.log(date);
    return justTheDay;
  });

  // unique dates
  const uniqueDates = [...new Set(dateArr)];

  // sort messages by date
  const sortedMessages = uniqueDates?.map((date) => {
    const messagesOnThisDay = messages?.filter((message) =>
      getDate(message.createdAt)?.includes(date)
    );

    const obj = {
      date,
      messagesOnThisDay,
    };

    return obj;
  });

  if (sortedMessages.length > 0 && sortedMessages) return sortedMessages;
  else return [];
};

export default sortMessagesDate;
