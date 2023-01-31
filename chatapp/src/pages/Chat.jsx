import useAxiosPrivate from "../hooks/useAxiosPrivate";
import React from "react";
import { FiSend } from "react-icons/fi";
import Message from "../components/Message";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate.get("/logout", {
        withCredentials: true,
      });
      console.log(response);
      setAuth({ user: "", pwd: "", accessToken: "" });
    } catch (err) {
      console.log(err);
    }

    navigate("/");
  };

  return (
    <main className='w-screen h-screen bg-[#28104E] flex justify-center items-center font-unbounded'>
      <section className='bg-[#6237A0] h-screen w-9/12 max-w-[700px] min-w-[500px] '>
        <button className='bg-[yellow]' onClick={() => handleLogout()}>
          Log out
        </button>

        <div className='flex flex-row absolute bottom-5 min-w[500px] max-w-screen-lg  rounded-full h-fit text-[#613682] left-1/2 translate-x-[-50%] w-11/12 bg-[#e6caf3] p-2 pl-4 pr-4'>
          <input
            type='text'
            placeholder='Send'
            className='h-10 text-xl bg-transparent grow placeholder:text-[#ae6be1] focus:outline-none'
          />
          <button className='border-l-[3px]  border-[#9754cb] w-[40px] pl-1'>
            <FiSend className=' text-black text-3xl hover:text-[#613682] transition-all' />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
