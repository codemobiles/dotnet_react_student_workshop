import { User } from "@/types/user.type";

import * as Icons from "@mui/icons-material/";
import { Box, InputAdornment, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LogoImage from "@/assets/react.svg";
import loginBg from "@/assets/images/bg4.jpg";

import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/store";
import { add, addAsync, commonSelector, del } from "@/store/slices/commonSlice";
import { authSelector, login } from "@/store/slices/authSlice";

const formValidateSchema = Yup.object().shape({
  username: Yup.string()
    .min(4)
    .required("Username must be more than 3 letters")
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

const Login = () => {
  const navigate = useNavigate();

  const commonReducer = useSelector(commonSelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const classes = {
    root: { display: "flex", justifyContent: "center", alignItems: "center" },
    submitBtn: { marginTop: 4 },
    canelBtn: { marginTop: 2 },
  };

  const initialValue: User = {
    username: "admin",
    password: "12341234",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema),
  });

  const onSubmit = async (values: User) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      navigate("/stock");
    }
  };

  const showForm = () => {
    return (
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <img src={LogoImage} alt="Logo" />

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message}
              {...field}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.Email />
                  </InputAdornment>
                ),
              }}
              autoComplete="email"
              autoFocus
            />
          )}
        ></Controller>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              helperText={errors.password?.message}
              error={Boolean(errors.password?.message)}
              {...field}
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icons.Password />
                  </InputAdornment>
                ),
              }}
              label="Password"
              type="password"
            />
          )}
        ></Controller>

        {authReducer.isError && <Alert severity="error">Login failed</Alert>}

        <Box sx={{ height: 10 }} />

        <Button
          sx={classes.submitBtn}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={authReducer.isAuthenticating}
        >
          Login
        </Button>

        <Button
          onClick={() => {
            navigate("/register");
          }}
          type="button"
          fullWidth
          variant="outlined"
          className="border-dashed border-1 border-gray-300 mt-4"
          color="primary"
        >
          Register
        </Button>

        {/* Counter Redux Demo */}
        <Stack direction={"row"} justifyContent={"center"}>
          <Button onClick={() => dispatch(del())}>
            <Icons.RemoveCircle />
          </Button>
          <Typography variant="h4">{commonReducer.count}</Typography>
          <Button onClick={() => dispatch(add())}>
            <Icons.AddCircle />
          </Button>
          <Button onClick={() => dispatch(addAsync(commonReducer.count))}>
            <Icons.ArrowForward />
          </Button>
        </Stack>
      </form>
    );
  };

  return (
    <Box className="flex justify-center items-center">
      <Card className="max-w-[345px]">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            className="text-red-400 bg-yellow-500 rounded-tl-md rounded-tr-md mt-[10px]"
          >
            Login
          </Typography>
          {showForm()}
        </CardContent>
      </Card>
      <style>
        {`
          body {
            min-height: 100vh;
            position: relative;
            margin: 0;
            background-size: cover;
            background-image: url(${loginBg});
            text-align: center;
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
