import Image from "next/image";
import { useEffect, useContext } from "react";
import getDate from "../utils/getDate";
import sortMessagesDate from "../utils/sortMessagesDate";
import { AppContext } from "./Layout";

const Message = ({ name, date, message }) => {
  const { dateBlockShow, setDateBlockShow, dateBlock, setDateBlock } =
    useContext(AppContext);
  const newdate = getDate(date);
  const newDateBlock = newdate.slice(0, newdate.indexOf("at"));
  useEffect(() => {
    // if (dateBlock !== newDateBlock) {
    //   setDateBlockShow(true);
    //   setDateBlock(newDateBlock);
    //   console.log(dateBlock);
    //   console.log(newDateBlock);
    // } else {
    //   setDateBlockShow(false);
    // }
    // console.log(newDateBlock);
  }, []);

  return (
    <>
      <div className="py-4 grid grid-cols-[min-content_repeat(7,_1fr)] gap-2 max-h-fit">
        {/* image */}
        <div className="relative bg-white grid row-span-2 h-9 w-9 rounded-md overflow-hidden place-content-center">
          <Image
            src="https://i.pinimg.com/564x/a0/81/55/a08155427a44e000276681a166c65337.jpg"
            alt="profile"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* details */}
        <div className="pl-2 flex col-start-2 col-end-9 row-span-1">
          <h3 className="text-gray-400 pr-3 font-semibold">{name}</h3>
          <h4 className="text-gray-500 text-sm pt-0.5">{newdate}</h4>
        </div>

        <p className="pl-2 text-gray-50 col-start-2 col-end-9 row-end-auto">
          {message}
        </p>
      </div>
    </>
  );
};

export default Message;
