import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  let username = "";

  return (
    <div>
      LoginPage
      <input
        type="text"
        name="username"
        onChange={(e) => {
          username = e.target.value;
        }}
      />{" "}
      <br />
      <button onClick={() => alert(username)}>Run</button>
    </div>
  );
}
