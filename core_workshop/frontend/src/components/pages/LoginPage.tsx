import { Stack, TextField } from "@mui/material";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  // https://docs.google.com/document/d/1Jd-sGeZMvMm0H1QY395Z8Fz5VzPzS9jdktkjbUQLuBA/edit?usp=sharing
  return (
    <>
      <form>
        <Stack direction="column" spacing={3}>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Username" variant="outlined" />
        </Stack>
      </form>
    </>
  );
}
