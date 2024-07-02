import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {};

export default function LoginPage({}: Props) {
  const defaultAccount = { username: "", password: "" };
  // let account = defaultAccount;
  const [account, setAccount] = useState(defaultAccount);
  return (
    <>
      <form>
        <Stack direction="column" spacing={1}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={account.username}
            onChange={(e) => {
              setAccount({
                username: e.target.value,
                password: account.password,
              });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={account.password}
            onChange={(e) => {
              setAccount({
                username: account.username,
                password: e.target.value,
              });
            }}
          />

          <Box style={{ height: 20 }} />
          <Button
            variant="contained"
            onClick={() => alert(JSON.stringify(account))}
          >
            Login
          </Button>
          <Button variant="outlined" onClick={() => setAccount(defaultAccount)}>
            Clear
          </Button>
        </Stack>
      </form>
    </>
  );
}
