import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  const defaultAccount = { username: "***", password: "----" };
  let account = defaultAccount;
  return (
    <>
      <form>
        <Stack direction="column" spacing={1}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={account.username}
            onChange={(e) => (account.username = e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={account.password}
            onChange={(e) => (account.password = e.target.value)}
          />

          <Box style={{ height: 20 }} />
          <Button
            variant="contained"
            onClick={() => alert(JSON.stringify(account))}
          >
            Login
          </Button>
          <Button variant="outlined" onClick={() => (account = defaultAccount)}>
            Clear
          </Button>
        </Stack>
      </form>
    </>
  );
}
