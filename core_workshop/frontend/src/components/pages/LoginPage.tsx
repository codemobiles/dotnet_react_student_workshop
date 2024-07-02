import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

export default function LoginPage({}: Props) {
  const defaultAccount = { username: "", password: "" };
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultAccount,
  });

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
