import React, { FC, useEffect, useState } from "react";
import { useUserStore } from "../store/UserStore";

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
    <div>
      <input
      onChange={emailHandler}
      value={email}
      type="email"
      placeholder="Email" />

      <input
       onChange={passwordHandler}
       value={password}
      type="password"
      placeholder="password" />

      <button type="submit"
      onClick={() => userStore.login(email, password)}>Login</button>
      <button
      onClick={() => userStore.registration(email, password)}>Registration</button>
    </div>
  );
};
