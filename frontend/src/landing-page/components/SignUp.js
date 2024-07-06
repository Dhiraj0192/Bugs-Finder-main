import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "./Footer";
import Stack from "@mui/material/Stack";
import AppAppBar from "./AppAppBar";

import getLPTheme from "../getLPTheme";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../services/localStorageService";
import { useRegisterMutation } from "../../services/userAuthApi";
import { toast } from "react-toastify";
import { getToken } from "../../services/localStorageService";
import { setUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  const { access_token } = getToken();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      ></ToggleButtonGroup>
    </Box>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [server_error, setServerError] = React.useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = await registerUser(actualData);
    console.log(res);
    if (res.error) {
      console.log(res.error.data);
      setServerError(res.error.data);
    }
    if (res.data) {
      console.log(res.data);
      // storeToken(res.data.token2);
      navigate("/");
      toast.success(
        "Successfully Register, Please Activate Your Account with " +
          actualData.email +
          " !",
        {}
      );
    }
  };

  const [mode, setMode] = React.useState("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "dark" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const navigate = useNavigate();

  const gotoSignUp = () => {
    navigate("/signup");
  };

  const gotoSignIn = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Container
        sx={{
          display: "flex",
          alignItems: "center",

          width: "100%",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 23 },
            pb: { xs: 8, sm: 10 },
            marginRight: "40px",
            width: "100%",
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{ width: { xs: "100%", sm: "100%" } }}
          >
            <Typography
              component="h1"
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Our Bug&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Finder
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Our website is a bug finder tool designed specifically for Python
              programmers <br />
              Not only does it identify bugs, but it also provides suggestions
              and solutions to resolve them. Whether you're a beginner or an
              experienced programmer, our bug finder tool is here to help
              streamline your coding process and improve the quality of your
              Python projects..
            </Typography>

            <Typography
              variant="caption"
              textAlign="center"
              sx={{ opacity: 0.8 }}
            >
              By clicking &quot;Sign Up&quot; you agree to our&nbsp;
              <Link href="#" color="primary">
                Terms & Conditions
              </Link>
              .
            </Typography>
          </Stack>
        </Container>
        <Container
          component="main"
          maxWidth="xl"
          sx={{
            marginTop: "140px",
            marginBottom: "30px",
            border: "#0A66C2 solid 2px",
            paddingBottom: 5,
            // paddingRight: 5,
            paddingLeft: 5,
            borderRadius: 10,
            width: "126%",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    sx={{
                      height: 48,
                    }}
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                  />
                  {server_error.name ? (
                    <Typography
                      style={{
                        fontSize: 12,
                        color: "red",
                        paddingLeft: 10,
                        paddingTop: 5,
                      }}
                    >
                      {server_error.name[0]}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    sx={{
                      height: 48,
                    }}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                  {server_error.email ? (
                    <Typography
                      style={{
                        fontSize: 12,
                        color: "red",
                        paddingLeft: 10,
                        paddingTop: 5,
                      }}
                    >
                      {server_error.email[0]}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      height: 48,
                    }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                  {server_error.password ? (
                    <Typography
                      style={{
                        fontSize: 12,
                        color: "red",
                        paddingLeft: 10,
                        paddingTop: 5,
                      }}
                    >
                      {server_error.password[0]}
                    </Typography>
                  ) : (
                    ""
                  )}
                  {server_error.non_field_errors ? (
                    <Typography
                      style={{
                        fontSize: 12,
                        color: "red",
                        paddingLeft: 10,
                        paddingTop: 5,
                      }}
                    >
                      {server_error.non_field_errors[0]}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="primary" name="tc" id="tc" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? "Please Wait...." : "Sign Up"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={gotoSignIn} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>

      <Footer />
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
