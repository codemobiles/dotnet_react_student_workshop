import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const formValidateSchema = Yup.object().shape({
  username: Yup.string()
    .email("Username must be email format")
    .required("Username is required")
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

type Props = {};

export default function LoginPage({}: Props) {
  const defaultAccount = { username: "", password: "" };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultAccount,
    resolver: yupResolver(formValidateSchema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((value) => {
          alert(JSON.stringify(value));
        })}
      >
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
                error
                helperText="Username is required"
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
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button variant="outlined" onClick={() => reset(defaultAccount)}>
            Clear
          </Button>
        </Stack>
      </form>
    </>
  );
}
