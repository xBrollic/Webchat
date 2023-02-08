import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { default as axios } from "../api/index";

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setpwd] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      setAuth({ user, pwd, accessToken });
      console.log(refreshToken);
      localStorage.setItem("rT", refreshToken);

      console.log(response);
      setLoading(false);
      navigate("/chat");
    } catch (err) {
      console.log(err);

      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const nav = () => {
    navigate("/signup");
  };

  const inpC =
    "focus:outline-none rounded-full transition-shadow shadow-lg hover:shadow-[#6237a0] w-3/5 h-9 text-sm p-2 min-w-[300px] focus:shadow-[#8025ff] bg-[#e6caf3]";

  return (
    <Container>
      <div className='w-screen h-screen bg-[#28104E]'>
        <form className='grid justify-center font-unbounded w-2/6 h-2/5 min-w-min min-h-[400px] flex-col rounded-[2.5rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-[#9754cb] shadow-2xl hover:shadow-[#9754cb79] transition-shadow duration-500 place-items-center'>
          <h1 className='text-3xl font-bold text-[#deacf5]'>LOG IN</h1>
          <label htmlFor='username' className='text-[#eed4fa] text-xl mt-5'>
            Username
          </label>
          <input
            ref={userRef}
            name='username'
            type='text'
            className={inpC}
            onChange={(e) => setUser(e.target.value)}
          />

          <label htmlFor='password' className='text-[#eed4fa] text-xl mt-5'>
            Password
          </label>
          <input
            name='password'
            type='password'
            className={inpC}
            onChange={(e) => setpwd(e.target.value)}
          />

          {errMsg.length > 0 && (
            <p
              className='bg-[#faa0a0] pr-5 pl-5
             pt-2 pb-2 rounded-md text-[#800000] mt-4'
            >
              {errMsg}
            </p>
          )}
          {loading && <ClipLoader className='mt-2' />}

          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            className='mt-3 p-1 rounded-lg bg-[#6237a0] text-[#deacf5] w-3/6 relative hover:bg-[#deacf5] hover:text-[#6237a0] transition-colors,transform duration-200 hover:scale-105 hover:drop-shadow-xl'
          >
            Log in
          </button>
          <p className='text-[#481f68]'>Need an account?</p>
          <a
            onClick={() => {
              nav();
            }}
            href=''
            className='text-blue-100 hover:underline'
          >
            Sign up
          </a>
        </form>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div``;
