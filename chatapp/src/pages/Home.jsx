import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {

    const navigate = useNavigate()

  return (
    <main className="font-unbounded absolute flex flex-col bg-gradient-to-tr from-[#28104E] to-[#a14eff] w-screen h-screen text-center justify-center items-center">
    <header className="bg-[#28104E] w-screen absolute h-20 top-0">

    </header>  
      <h1 className="text-7xl text-white font-bold">Start chatting</h1>
      <button onClick={() => navigate("/signup")} className=" bg-[#fff692] w-fit h-fit p-5 rounded-full mt-4 font-bold hover:bg-[#fffac8] transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-[#fffccb3d] hover:text-[#7d761e]" >GET STARTED FOR FREE</button>
    
    </main>
    
  );
}

export default Home;
