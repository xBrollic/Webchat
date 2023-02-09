import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FiSend } from "react-icons/fi";
import axios from "../api/index";
import Message from "../components/Message";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";

const Chat = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [txt, setTxt] = useState("");
  const lastMessageRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    loadMessages();
    socket.current = io("http://192.168.56.1:5173");
    socket.current.emit("addUser", "");
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(msg);
        setNewMessage(msg);
      });
    }
  }, []);

  useEffect(() => {
    newMessage && setMessages((pre) => [...pre, newMessage]);
  }, [newMessage]);

  const loadMessages = async () => {
    try {
      const response = await axios.get("/get-messages");

      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    socket.current.emit("send-msg", {
      to: "",
      from: auth.user,
      message: txt,
    });
    setTxt("");

    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post("/send-message", {
        user: auth.user,
        content: txt,
        signal: controller.signal,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    txt.length > 0 ? sendMessage() : alert("Message Content needed!");
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <main className='w-screen h-screen bg-[#28104E] flex justify-center items-center font-unbounded overflow-y-hidden'>
      <div className='bg-[#1a0b31] absolute w-screen h-[80px] top-0 z-10'></div>
      <section className='absolute right-32 top-2 flex justify-center items-center gap-2'>
        <img
          src={""}
          className='h-16 w-16 rounded-full border-2 border-[#e6caf3] z-20'
        />
        <h3 className='text-[#e6caf3] z-20'>{auth.user}</h3>
      </section>
      <button
        className='absolute bg-[#fff692] w-fit h-fit p-3 rounded-full font-bold hover:bg-[#fffac8] transition-all duration-200 hover:scale-[1.1] hover:shadow-md hover:shadow-[#fffccb3d] hover:text-[#7d761e] m-4 right-0 top-0 z-20'
        onClick={() => signOut()}
      >
        Log out
      </button>
      <section className='bg-[#6237A0] h-screen w-9/12 max-w-[700px] min-w-[500px] overflow-y-scroll pb-[160px] pt-20 mt-[160px]'>
        {messages.length > 0 &&
          messages.map((e) => {
            return (
              <Message
                key={e.id}
                content={e.content}
                user={e.user}
                time={e.time}
              />
            );
          })}
        <div ref={lastMessageRef}></div>
        <div className='flex flex-row absolute bottom-5 min-w[500px] max-w-screen-lg  rounded-full h-fit text-[#613682] left-1/2 translate-x-[-50%] w-11/12 bg-[#e6caf3] p-2 pl-4 pr-4'>
          <input
            type='text'
            placeholder='Send'
            className='h-10 text-xl bg-transparent grow placeholder:text-[#ae6be1] focus:outline-none'
            onChange={(e) => setTxt(e.target.value)}
            value={txt}
          />
          <button className='border-l-[3px]  border-[#9754cb] w-[40px] pl-1'>
            <FiSend
              className=' text-black text-3xl hover:text-[#613682] transition-all hover:scale-[1.25]'
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
