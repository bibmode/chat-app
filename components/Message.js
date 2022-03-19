const Message = ({ name, date, message }) => {
  return (
    <div className="py-4 grid grid-cols-[min-content_repeat(7,_1fr)] gap-2 max-h-fit">
      {/* image */}
      <div className="bg-white grid row-span-2 h-9 w-9 rounded-md place-content-center">
        {name[0].toUpperCase()}
      </div>

      {/* details */}
      <div className="pl-2 flex col-start-2 col-end-9 row-span-1">
        <h3 className="text-gray-400 pr-3 font-semibold">{name}</h3>
        <h4 className="text-gray-500 text-sm pt-0.5">{date}</h4>
      </div>

      <p className="pl-2 text-gray-50 col-start-2 col-end-9 row-end-auto">
        {message}
      </p>
    </div>
  );
};

export default Message;
