import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {};

export default function LoginPage({}: Props) {
  const defaultAccount = { username: "", password: "" };

  return (
    <>
      <form>
        <Stack direction="column" spacing={1}>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />

          <Box style={{ height: 20 }} />
          <Button variant="contained">Login</Button>
          <Button variant="outlined">Clear</Button>
        </Stack>
      </form>
    </>
  );
}
