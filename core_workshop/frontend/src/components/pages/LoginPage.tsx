import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  let account = { username: "", password: "" };
  return (
    <>
      <form>
        <Stack direction="column" spacing={1}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => (account.username = e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => (account.password = e.target.value)}
          />

          <Box style={{ height: 20 }} />
          <Button
            variant="contained"
            onClick={() => alert(JSON.stringify(account))}
          >
            Login
          </Button>
          <Button variant="outlined">Clear</Button>
        </Stack>
      </form>
    </>
  );
}
