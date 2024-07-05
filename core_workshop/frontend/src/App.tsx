import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Container, createTheme } from "@mui/material";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import StockPage from "./components/pages/StockPage";
import { useSelector } from "react-redux";
import { authSelector, relogin } from "./store/slices/authSlice";
import { useAppDispatch } from "./store/store";
import PublicRoutes from "./router/public.routes";
import ProtectedRoutes from "./router/protected.routes";
import ReportPage from "./components/pages/ReportPage";
import ShopPage from "./components/pages/ShopPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage";
import TransactionPage from "./components/pages/TransactionPage";
import { ThemeProvider } from "@emotion/react";
import backgroundMenuImage from "@/assets/images/background_menu.jpg";
import { Dashboard } from "@mui/icons-material";
import DashboardPage from "./components/pages/DashboardPage";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
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

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: `url(${backgroundMenuImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f2fcff",
            backgroundPosition: "bottom",
            width: drawerWidth,
          },
        },
      },
    },

    typography: {
      fontFamily: "Chakra Petch",
      // fontFamily: "Noto Sans Thai",
      fontWeightLight: 100,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
    },
    spacing: 8,
  });

  return (
    <ThemeProvider theme={theme}>
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
            <DrawerHeader />
            <Routes>
              {/* public zone */}
              <Route
                path="/"
                element={<PublicRoutes isAuthented={authReducer.isAuthented} />}
              >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Route>

              {/* protected zone */}
              <Route
                path="/"
                element={
                  <ProtectedRoutes isAuthented={authReducer.isAuthented} />
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/stock" element={<StockPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/stock/create" element={<StockCreatePage />} />
                <Route path="/stock/edit/:id" element={<StockEditPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/transaction" element={<TransactionPage />} />
              </Route>
            </Routes>
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
