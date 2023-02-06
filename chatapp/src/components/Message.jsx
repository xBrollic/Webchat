import React from "react";

const Message = ({ content, user, time }) => {
  return (
    <>
      <p className="text-white text-opacity-70 ml-2">{user}</p>
      <div className="bg-[#deacf5] w-fit p-1 rounded-xl ml-2 flex flex-col rounded-tl-sm drop-shadow-xl mb-3">
        <h3>{content}</h3>
        <p className="text-xs w-fit text-black text-opacity-60">{time}</p>
      </div>
    </>
  );
};

export default Message;

/* const [data, setData] = useState();

const fetchMessages = () => {
    try {
      const response = axios.get(http//:localhost:3500/get-messages)
      setData(response.body)
    } catch (err) {
      console.log(err)
    }

    ...

    return(
        <>
            data.map(e => {
                return <Message content={e.content} user={e.user} time={e.time} />
            })
        </>
    )
} */
