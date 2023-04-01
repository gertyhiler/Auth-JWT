import React, { FC, useEffect, useState } from "react";
import { useUserStore } from "../store/UserStore";
import './loginForm.css'

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userStore = useUserStore(state => state);

  function emailHandler(event:React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function passwordHandler(event:React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="login-wrapper">
      <input
      className="input"
      onChange={emailHandler}
      value={email}
      type="email"
      placeholder="Email" />

      <input
      className="input"
       onChange={passwordHandler}
       value={password}
      type="password"
      placeholder="Password" />

      <button type="submit"
      onClick={() => userStore.login(email, password)}>Login</button>
      <button
      onClick={() => userStore.registration(email, password)}>Registration</button>
    </div>
  );
};
