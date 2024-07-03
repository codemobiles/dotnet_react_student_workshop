import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Container } from "@mui/material";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import StockPage from "./components/pages/StockPage";
import { useSelector } from "react-redux";
import { authSelector, relogin } from "./store/slices/authSlice";
import { useAppDispatch } from "./store/store";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function App() {
  const [open, setOpen] = React.useState(true);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // Called during creation
    dispatch(relogin());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {authReducer.isAuthented && (
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      )}
      {authReducer.isAuthented && (
        <Menu open={open} handleDrawerClose={handleDrawerClose} />
      )}
      <Main open={open}>
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
      </Main>
    </Box>
  );
}
