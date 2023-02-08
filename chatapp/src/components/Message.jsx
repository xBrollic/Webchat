import React from "react";
import useAuth from "../hooks/useAuth";

const Message = ({ content, user, time }) => {
  const { auth } = useAuth();
  const style =
    "w-fit p-1 rounded-xl ml-2 flex flex-col drop-shadow-xl mb-3";

  return (
    <main className="relative h-20">
      {user === auth.user ? (
        ""
      ) : (
        <p className="text-white text-opacity-70 ml-2">{user}</p>
      )}
      <div
        className={
          user === auth.user
            ? `${style} rounded-tr-sm absolute right-3 bg-[#d781ff]`
            : `${style} rounded-tl-sm absolute bg-[#deacf5]`
        }
      >
        <h3>{content}</h3>
        <p className="text-xs w-fit text-black text-opacity-60">{time}</p>
      </div>
    </main>
  );
};

export default Message;

/*className={user === auth.user ? `${style} right bg-[mörk]` : `${style} left bg-[ljus]`}*/
