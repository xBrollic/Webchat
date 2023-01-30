import React from "react";

const Message = ({ content, user, time }) => {
  return (
    <>
      <p>{user}</p>
      <div>
        <h3>{content}</h3>
        <p>{time}</p>
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
