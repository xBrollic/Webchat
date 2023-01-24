import React from "react";
import styled from "styled-components";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <h1>LOG IN</h1>
      <form>
        <label htmlFor='username'>Username</label>
        <input name='username' type='text' />

        <label htmlFor='password'>Password</label>
        <input name='password' type='text' />
        <button onClick={(e) => handleSubmit(e)}>Log in</button>
      </form>
      <p>Need an account?</p>
      <a href=''>Sign up</a>
    </Container>
  );
};

export default Login;

const Container = styled.div``;
