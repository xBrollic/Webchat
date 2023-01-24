import React from "react";
import styled from "styled-components";

const Signup = () => {
  return (
    <Container>
      <form>
      <h1>SIGN UP</h1>
        <label htmlFor="username">Username</label>
        <input name="email" type="text" />
        <label htmlFor="password">Password</label>
        <input name="password" type="text" />
        <button>Sign up</button>
        <p>Already have an account?</p>
        <a href="">Sign in</a>
      </form>
    </Container>
  );
};

export default Signup;

const Container = styled.div``;
