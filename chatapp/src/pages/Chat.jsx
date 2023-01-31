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
    <button className='absolute bg-[#fff692] w-fit h-fit p-3 rounded-full font-bold hover:bg-[#fffac8] transition-all duration-200 hover:scale-[1.1] hover:shadow-md hover:shadow-[#fffccb3d] hover:text-[#7d761e] m-4 right-0 top-0' onClick={() => handleLogout()}>
          Log out
        </button>
      <section className='bg-[#6237A0] h-screen w-9/12 max-w-[700px] min-w-[500px] '>
        

        <div className='flex flex-row absolute bottom-5 min-w[500px] max-w-screen-lg  rounded-full h-fit text-[#613682] left-1/2 translate-x-[-50%] w-11/12 bg-[#e6caf3] p-2 pl-4 pr-4'>
          <input
            type='text'
            placeholder='Send'
            className='h-10 text-xl bg-transparent grow placeholder:text-[#ae6be1] focus:outline-none'
          />
          <button className='border-l-[3px]  border-[#9754cb] w-[40px] pl-1'>
            <FiSend className=' text-black text-3xl hover:text-[#613682] transition-all hover:scale-[1.25]' />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
