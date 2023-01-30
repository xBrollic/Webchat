import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const userRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);

    console.log(result, "user");
    console.log(user);

    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);

    console.log(result, "pwd");
    console.log(pwd);

    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const inpC =
    "focus:outline-none rounded-full transition-shadow shadow-lg hover:shadow-[#6237a0] w-3/5 h-9 text-sm p-2 min-w-[300px] focus:shadow-[#8025ff] bg-[#e6caf3]";
  const errMsgStyle =
    "bg-[#28104E] rounded-md text-[#9754cb] p-3 mt-2 w-3/5 min-w-[300px]";

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <main className="w-screen h-screen bg-[#28104E]">
        <form className="grid justify-center font-unbounded w-2/6 h-fit pt-8 min-w-min min-h-[400px] flex-col rounded-[2.5rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-[#9754cb] shadow-2xl hover:shadow-[#9754cb79] transition-shadow duration-500 place-items-center">
          <h1 className="text-3xl font-bold text-[#deacf5]">SIGN UP</h1>
          <label className="text-[#eed4fa] text-xl mt-5" htmlFor="username">
            Username
          </label>
          <input
            className={inpC}
            name="username"
            type="text"
            autoComplete="off"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            className={userFocus && user && !validName ? errMsgStyle : "hidden"}
          >
            4-24 characters <br />
            must start with a letter <br />
            characters, numbers, underscores and hyphens are allowed
          </p>
          <label className="text-[#eed4fa] text-xl mt-5" htmlFor="password">
            Password
          </label>
          <input
            className={inpC}
            name="password"
            autoComplete="off"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p className={pwdFocus && pwd && !validPwd ? errMsgStyle : "hidden"}>
            8-24 characters <br />
            must include a number, uppercase and lowercase letter <br />
            Allowed special characters: !@#$%
          </p>
          <button
            className="mt-3 p-1 rounded-lg bg-[#6237a0] text-[#deacf5] w-3/6 relative enabled:hover:bg-[#deacf5] enabled:hover:text-[#6237a0] transition-colors duration-200 disabled:cursor-default disabled:bg-opacity-80"
            disabled={!validName || !validPwd ? true : false}
            onClick={(e) => handleSubmit(e)}
          >
            Sign up
          </button>
          <p>Already have an account?</p>
          <a
            className="text-blue-100 hover:underline"
            onClick={() => navigate("/login")}
          >
            Sign in
          </a>
        </form>
      </main>
    </Container>
  );
};

export default Signup;

const Container = styled.div``;
