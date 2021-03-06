import React, { useState } from "react";
import { useHistory } from "react-router-dom";


import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

import { Title } from "../stocks/Stocks.styles";
import { Input } from "../search/Search.styles";
import { Label, SubmitButton, AccountLink } from "../profile/Profile.styles";

const SignUp = () => {
  let history = useHistory();
  const [input, setInput] = useState({});

  const handleChange = (event) =>
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName } = input;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        input.email,
        input.password
      );
      await createUserProfileDocument(user, { displayName });
      setInput({});
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Title>Sign Up</Title>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <Label htmlFor="name">Name</Label>
        <Input
          style={{ width: "100%" }}
          id="name"
          type="name"
          name="displayName"
          placeholder="Name"
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <div style={{ marginTop: "30px" }}>
          <Label htmlFor="signUp-email">Email</Label>
          <Input
            style={{ width: "100%" }}
            id="signUp-email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            autoComplete="on"
            required
          />
        </div>

        <div style={{ marginTop: "30px" }}>
          <Label htmlFor="signUp-password">Password</Label>
          <Input
            style={{ width: "100%" }}
            id="signUp-password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="on"
            required
          />
        </div>
        <SubmitButton type="submit"> Sign Up </SubmitButton>
      </form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <AccountLink to="/profile/signin">Already have an account?</AccountLink>
      </div>
    </>
  );
};

export default SignUp;
