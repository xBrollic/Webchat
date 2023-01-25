import React, { useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const inpC =
    "rounded-md transition-shadow shadow-lg hover:shadow-[#6237a0] w-3/5 h-9 text-sm p-2 min-w-[300px] focus:shadow-[#8025ff] bg-[#e6caf3]";
  return (
    <Container>
      <div className="w-screen h-screen bg-[#28104E]">
        <form className="grid justify-center font-unbounded w-2/6 h-2/5 min-w-min min-h-[400px] flex-col rounded-[2.5rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-[#9754cb] shadow-2xl hover:shadow-[#9754cb79] transition-shadow duration-500 place-items-center">
          <h1 className="text-3xl font-bold text-[#deacf5]">SIGN UP</h1>
          <label className="text-[#eed4fa] text-xl mt-5" htmlFor="username">
            Username
          </label>
          <input
            className={inpC}
            name="email"
            type="text"
            autoComplete="false"
          />
          <label className="text-[#eed4fa] text-xl mt-5" htmlFor="password">
            Password
          </label>
          <input className={inpC} name="password" type="text" />
          <button className="mt-3 p-1 rounded-lg bg-[#6237a0] text-[#deacf5] w-3/6 relative hover:bg-[#deacf5] hover:text-[#6237a0] transition-colors duration-200">
            Sign up
          </button>
          <p>Already have an account?</p>
          <a className="text-blue-100 hover:underline" href="">
            Sign in
          </a>
        </form>
      </div>
    </Container>
  );
};

export default Signup;

const Container = styled.div``;
