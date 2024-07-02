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
          {/* Username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                {...field}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Box style={{ height: 20 }} />
          <Button variant="contained">Login</Button>
          <Button variant="outlined">Clear</Button>
        </Stack>
      </form>
    </>
  );
}
